import { describe, it, expect } from 'vitest';
import { SITE_ORIGIN, canonicalUrl, buildDirectoryJsonLd } from './seo';
import type { Profile } from '../types';

describe('canonicalUrl', () => {
  it('returns origin with trailing slash for root', () => {
    expect(canonicalUrl('/')).toBe(`${SITE_ORIGIN}/`);
  });

  it('prefixes a leading slash when missing', () => {
    expect(canonicalUrl('about')).toBe(`${SITE_ORIGIN}/about`);
  });

  it('preserves an existing leading slash', () => {
    expect(canonicalUrl('/about')).toBe(`${SITE_ORIGIN}/about`);
  });

  it('strips trailing slashes from non-root paths', () => {
    expect(canonicalUrl('/ai-ready/')).toBe(`${SITE_ORIGIN}/ai-ready`);
    expect(canonicalUrl('/ai-ready///')).toBe(`${SITE_ORIGIN}/ai-ready`);
  });

  it('handles nested paths', () => {
    expect(canonicalUrl('/ai-ready/submit')).toBe(`${SITE_ORIGIN}/ai-ready/submit`);
  });
});

describe('buildDirectoryJsonLd', () => {
  const baseProfile: Profile = {
    profileId: 'abc123',
    name: 'Jane Doe',
    headline: 'Cloud Engineer',
    bio: 'Veteran-founded AI leader in Clarksville.',
    linkedinUrl: 'https://linkedin.com/in/janedoe',
    headshotUrl: 'https://example.com/jane.jpg',
    credentials: [
      {
        issuer: 'AWS',
        title: 'Solutions Architect - Associate',
        verifyUrl: 'https://cred.example.com/jane',
      },
    ],
    degrees: [
      {
        degree: 'BS',
        institution: 'Austin Peay State University',
        year: 2020,
      },
    ],
  };

  it('emits a CollectionPage with ItemList and correct count', () => {
    const ld = buildDirectoryJsonLd([baseProfile]);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('CollectionPage');
    expect(ld['@id']).toBe(`${SITE_ORIGIN}/ai-ready`);
    const mainEntity = ld.mainEntity as Record<string, unknown>;
    expect(mainEntity['@type']).toBe('ItemList');
    expect(mainEntity.numberOfItems).toBe(1);
  });

  it('handles an empty profile list', () => {
    const ld = buildDirectoryJsonLd([]);
    const mainEntity = ld.mainEntity as Record<string, unknown>;
    expect(mainEntity.numberOfItems).toBe(0);
    expect(mainEntity.itemListElement).toEqual([]);
  });

  it('wraps each profile in a ListItem with 1-based position', () => {
    const second: Profile = { ...baseProfile, profileId: 'def456', name: 'John Roe' };
    const ld = buildDirectoryJsonLd([baseProfile, second]);
    const items = (ld.mainEntity as { itemListElement: Array<Record<string, unknown>> })
      .itemListElement;
    expect(items).toHaveLength(2);
    expect(items[0].position).toBe(1);
    expect(items[1].position).toBe(2);
    expect(items[0]['@type']).toBe('ListItem');
  });

  it('maps credentials to EducationalOccupationalCredential with the issuer as recognizedBy', () => {
    const ld = buildDirectoryJsonLd([baseProfile]);
    const items = (ld.mainEntity as { itemListElement: Array<Record<string, unknown>> })
      .itemListElement;
    const person = items[0].item as Record<string, unknown>;
    const creds = person.hasCredential as Array<Record<string, unknown>>;
    expect(creds).toHaveLength(1);
    expect(creds[0]['@type']).toBe('EducationalOccupationalCredential');
    expect(creds[0].name).toBe('Solutions Architect - Associate');
    const recognizedBy = creds[0].recognizedBy as Record<string, unknown>;
    expect(recognizedBy.name).toBe('AWS');
  });

  it('omits hasCredential when profile has no credentials', () => {
    const bare: Profile = { ...baseProfile, credentials: [], degrees: [] };
    const ld = buildDirectoryJsonLd([bare]);
    const person = (
      (ld.mainEntity as { itemListElement: Array<Record<string, unknown>> })
        .itemListElement[0].item
    ) as Record<string, unknown>;
    expect(person.hasCredential).toBeUndefined();
    expect(person.alumniOf).toBeUndefined();
  });

  it('drops empty strings from optional profile fields', () => {
    const thinProfile: Profile = {
      profileId: 'xyz',
      name: 'No Bio',
      headline: '',
      bio: '   ',
      credentials: [],
      degrees: [],
    };
    const ld = buildDirectoryJsonLd([thinProfile]);
    const person = (
      (ld.mainEntity as { itemListElement: Array<Record<string, unknown>> })
        .itemListElement[0].item
    ) as Record<string, unknown>;
    expect(person.jobTitle).toBeUndefined();
    expect(person.bio).toBeUndefined();
    expect(person.name).toBe('No Bio');
  });

  it('produces JSON that survives round-tripping through JSON.stringify', () => {
    const tricky: Profile = {
      ...baseProfile,
      name: "Mary O'Brien & <script>alert(1)</script>",
      bio: 'Line 1\nLine 2 "quoted"',
    };
    const ld = buildDirectoryJsonLd([tricky]);
    const serialized = JSON.stringify(ld);
    const parsed = JSON.parse(serialized);
    const person = parsed.mainEntity.itemListElement[0].item;
    expect(person.name).toBe("Mary O'Brien & <script>alert(1)</script>");
    expect(person.description).toBe('Line 1\nLine 2 "quoted"');
  });
});

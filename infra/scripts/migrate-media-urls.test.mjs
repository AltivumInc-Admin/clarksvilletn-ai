// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { rewriteUrl, rewriteItem } from './migrate-media-urls.mjs';

const OLD = 'https://ai-ready-clarksville-media.s3.us-east-1.amazonaws.com';
const NEW = 'https://d111abcdef8.cloudfront.net';

describe('rewriteUrl', () => {
  it('swaps the old S3 base for the new CDN base, preserving the key path', () => {
    expect(rewriteUrl(`${OLD}/headshots/p1.jpg`, OLD, NEW)).toBe(`${NEW}/headshots/p1.jpg`);
    expect(rewriteUrl(`${OLD}/badges/p1/0.png`, OLD, NEW)).toBe(`${NEW}/badges/p1/0.png`);
  });

  it('leaves non-matching and already-migrated URLs unchanged', () => {
    expect(rewriteUrl('https://example.com/x.png', OLD, NEW)).toBe('https://example.com/x.png');
    expect(rewriteUrl(`${NEW}/headshots/p1.jpg`, OLD, NEW)).toBe(`${NEW}/headshots/p1.jpg`);
  });

  it('passes through non-string values untouched', () => {
    expect(rewriteUrl(undefined, OLD, NEW)).toBeUndefined();
    expect(rewriteUrl(null, OLD, NEW)).toBeNull();
  });
});

describe('rewriteItem', () => {
  it('rewrites headshotUrl and each credential badgeImageUrl', () => {
    const item = {
      profileId: 'p1',
      headshotUrl: `${OLD}/headshots/p1.jpg`,
      credentials: [
        { issuer: 'AWS', title: 'SAA', badgeImageUrl: `${OLD}/badges/p1/0.png` },
        { issuer: 'No badge', title: 'X' },
      ],
    };
    const r = rewriteItem(item, OLD, NEW);
    expect(r.changed).toBe(true);
    expect(r.headshotUrl).toBe(`${NEW}/headshots/p1.jpg`);
    expect(r.credentials[0].badgeImageUrl).toBe(`${NEW}/badges/p1/0.png`);
    expect(r.credentials[1]).toEqual({ issuer: 'No badge', title: 'X' });
  });

  it('reports changed=false when everything already points at the new base', () => {
    const item = {
      profileId: 'p2',
      headshotUrl: `${NEW}/headshots/p2.jpg`,
      credentials: [{ issuer: 'AWS', badgeImageUrl: `${NEW}/badges/p2/0.png` }],
    };
    expect(rewriteItem(item, OLD, NEW).changed).toBe(false);
  });

  it('handles items with no media fields', () => {
    const r = rewriteItem({ profileId: 'p3', name: 'Jane' }, OLD, NEW);
    expect(r.changed).toBe(false);
    expect(r.headshotUrl).toBeUndefined();
  });

  it('does not mutate the input item', () => {
    const item = { profileId: 'p4', headshotUrl: `${OLD}/headshots/p4.jpg`, credentials: [] };
    rewriteItem(item, OLD, NEW);
    expect(item.headshotUrl).toBe(`${OLD}/headshots/p4.jpg`);
  });
});

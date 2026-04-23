import type { Profile } from '../types';

export const SITE_ORIGIN = 'https://clarksvilletn.ai';

export function canonicalUrl(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (clean === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${clean.replace(/\/+$/, '')}`;
}

type JsonLd = Record<string, unknown>;

function dropEmpty<T extends JsonLd>(obj: T): T {
  const out = {} as JsonLd;
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

function profileToPerson(profile: Profile, index: number): JsonLd {
  const hasCredential = profile.credentials.map((cred) =>
    dropEmpty({
      '@type': 'EducationalOccupationalCredential',
      name: cred.title,
      credentialCategory: 'certification',
      url: cred.verifyUrl,
      recognizedBy: dropEmpty({
        '@type': 'Organization',
        name: cred.issuer,
      }),
    }),
  );

  const alumniOf = profile.degrees.map((deg) =>
    dropEmpty({
      '@type': 'EducationalOrganization',
      name: deg.institution,
    }),
  );

  const person = dropEmpty({
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/ai-ready#profile-${profile.profileId}`,
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.bio,
    url: profile.linkedinUrl,
    image: profile.headshotUrl,
    address: dropEmpty({
      '@type': 'PostalAddress',
      addressLocality: 'Clarksville',
      addressRegion: 'TN',
      addressCountry: 'US',
    }),
    hasCredential: hasCredential.length ? hasCredential : undefined,
    alumniOf: alumniOf.length ? alumniOf : undefined,
  });

  return {
    '@type': 'ListItem',
    position: index + 1,
    item: person,
  };
}

export function buildDirectoryJsonLd(profiles: Profile[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_ORIGIN}/ai-ready`,
    url: `${SITE_ORIGIN}/ai-ready`,
    name: 'AI-Ready Clarksville Directory',
    description:
      'A verified directory of Clarksville residents, professionals, and students with AI, cloud, and technology credentials.',
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: profiles.length,
      itemListElement: profiles.map(profileToPerson),
    },
  };
}

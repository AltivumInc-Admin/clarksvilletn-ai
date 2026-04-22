import { ExternalLink, GraduationCap, Linkedin, Award } from 'lucide-react';
import type { Profile } from '../../types';

const MAX_CREDENTIALS_VISIBLE = 6;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export default function ProfileCard({ profile }: { profile: Profile }) {
  const visibleCreds = profile.credentials.slice(0, MAX_CREDENTIALS_VISIBLE);
  const hiddenCount = profile.credentials.length - visibleCreds.length;

  return (
    <article className="bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow p-6 flex flex-col h-full">
      <header className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          {profile.headshotUrl ? (
            <img
              src={profile.headshotUrl}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border border-river-blue/10"
              loading="lazy"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-river-blue text-white flex items-center justify-center font-serif font-semibold text-xl">
              {initials(profile.name)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-serif font-bold text-river-blue truncate">{profile.name}</h3>
          {profile.headline && (
            <p className="text-sm text-historic-stone leading-snug mt-0.5">{profile.headline}</p>
          )}
          {profile.city && (
            <p className="text-xs text-historic-stone/70 mt-1">{profile.city}</p>
          )}
        </div>
        {profile.linkedinUrl && (
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-lg text-river-blue/60 hover:text-sunset-copper hover:bg-river-blue/5 transition-colors"
            aria-label={`${profile.name} on LinkedIn`}
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </header>

      {profile.bio && (
        <p className="text-sm text-historic-stone leading-relaxed mb-4 line-clamp-3">
          {profile.bio}
        </p>
      )}

      {visibleCreds.length > 0 && (
        <section className="mb-4">
          <h4 className="text-[11px] font-semibold text-river-blue uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-3 h-3" />
            Credentials
          </h4>
          <ul className="space-y-2">
            {visibleCreds.map((cred, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm">
                {cred.badgeImageUrl ? (
                  <img
                    src={cred.badgeImageUrl}
                    alt=""
                    className="w-8 h-8 object-contain flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-river-blue/8 text-river-blue text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                    {cred.issuer.slice(0, 3).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-river-blue leading-tight truncate">{cred.title}</p>
                  <p className="text-[11px] text-historic-stone/70 leading-tight truncate">
                    {cred.issuer}
                    {cred.issuedDate ? ` · ${cred.issuedDate}` : ''}
                  </p>
                </div>
                <a
                  href={cred.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-[11px] font-medium text-sunset-copper hover:text-sunset-copper-dark inline-flex items-center gap-0.5"
                >
                  Verify
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
          {hiddenCount > 0 && (
            <p className="text-[11px] text-historic-stone/70 mt-2">+{hiddenCount} more</p>
          )}
        </section>
      )}

      {profile.degrees.length > 0 && (
        <section className="mt-auto pt-4 border-t border-river-blue/5">
          <h4 className="text-[11px] font-semibold text-river-blue uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <GraduationCap className="w-3 h-3" />
            Education
          </h4>
          <ul className="space-y-1">
            {profile.degrees.map((deg, i) => (
              <li key={i} className="text-sm text-historic-stone leading-snug">
                <span className="text-river-blue font-medium">{deg.degree}</span>
                {deg.focus ? `, ${deg.focus}` : ''} · {deg.institution} · {deg.year}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

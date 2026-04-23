import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import CTA from '../components/sections/CTA';
import ProfileCard from '../components/cards/ProfileCard';
import { listProfiles } from '../lib/api';
import type { Profile } from '../types';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { buildDirectoryJsonLd, canonicalUrl } from '../lib/seo';

type LoadState = 'loading' | 'ready' | 'error';

export default function AIReady() {
  const [state, setState] = useState<LoadState>('loading');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const jsonLd = useMemo(
    () => (profiles.length > 0 ? buildDirectoryJsonLd(profiles) : undefined),
    [profiles],
  );

  useDocumentMeta({
    title: 'AI-Ready Clarksville Directory',
    description:
      'A verified directory of Clarksville residents, professionals, and students with AI, cloud, and technology credentials.',
    canonical: canonicalUrl('/ai-ready'),
    jsonLd,
  });

  useEffect(() => {
    let cancelled = false;
    listProfiles()
      .then((res) => {
        if (cancelled) return;
        setProfiles(res.profiles);
        setState('ready');
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message);
        setState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-gradient-to-b from-river-blue-50 to-cloud-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">AI-Ready Clarksville</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mt-3 mb-6">
              The People Building Clarksville's AI Future
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed mb-8">
              A directory of Clarksville residents, professionals, and students with verified AI,
              cloud, and technology credentials. Real people. Real skills. Real community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/ai-ready/submit">
                Add Your Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" href="/resources">
                Browse Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {state === 'loading' && (
            <div className="max-w-md mx-auto text-center text-historic-stone py-16">
              Loading profiles...
            </div>
          )}

          {state === 'error' && (
            <div className="max-w-xl mx-auto text-center py-16">
              <p className="text-historic-stone mb-4">
                We couldn't load profiles right now.
              </p>
              <p className="text-xs text-historic-stone/60">{error}</p>
            </div>
          )}

          {state === 'ready' && profiles.length === 0 && (
            <div className="max-w-xl mx-auto text-center py-16">
              <Users className="w-10 h-10 text-sunset-copper/40 mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold text-river-blue mb-3">
                Be the first profile
              </h2>
              <p className="text-historic-stone mb-6">
                AI-Ready Clarksville is just getting started. Add your profile and help
                establish the city's verified AI talent base.
              </p>
              <Button href="/ai-ready/submit">
                Add Your Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}

          {state === 'ready' && profiles.length > 0 && (
            <>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
                <div>
                  <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Community</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2">
                    {profiles.length} {profiles.length === 1 ? 'Profile' : 'Profiles'}
                  </h2>
                </div>
                <Link
                  to="/ai-ready/submit"
                  className="mt-4 md:mt-0 inline-flex items-center text-sunset-copper font-medium hover:text-sunset-copper-600 transition-colors group"
                >
                  Add your profile
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <ProfileCard key={profile.profileId} profile={profile} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTA
        title="Your skills belong on this page"
        description="If you live, work, or study in Clarksville and hold AI, cloud, or adjacent technical credentials, this directory is for you."
        primaryLabel="Add Your Profile"
        primaryHref="/ai-ready/submit"
        secondaryLabel="Browse Resources"
        secondaryHref="/resources"
      />
    </>
  );
}

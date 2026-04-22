import { useEffect, useState } from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import CTA from '../components/sections/CTA';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { partners } from '../data/timeline';
import Button from '../components/ui/Button';
import ProfileCard from '../components/cards/ProfileCard';
import { listProfiles } from '../lib/api';
import type { Profile } from '../types';

export default function Home() {
  const [featuredProfiles, setFeaturedProfiles] = useState<Profile[]>([]);
  const [profileCount, setProfileCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    listProfiles()
      .then((res) => {
        if (cancelled) return;
        setFeaturedProfiles(res.profiles.slice(0, 3));
        setProfileCount(res.profiles.length);
      })
      .catch(() => {
        if (cancelled) return;
        setProfileCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero />
      <Features />

      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">AI-Ready Clarksville</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-river-blue mt-2 mb-3">
                The People Building What's Next
              </h2>
              <p className="text-lg text-historic-stone max-w-xl">
                A growing directory of Clarksville residents with verified AI, cloud, and technology credentials.
              </p>
            </div>
            <Link
              to="/ai-ready"
              className="mt-4 md:mt-0 inline-flex items-center text-sunset-copper font-medium hover:text-sunset-copper-600 transition-colors group"
            >
              {profileCount !== null && profileCount > 3 ? `View all ${profileCount} profiles` : 'View directory'}
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {featuredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfiles.map((profile) => (
                <ProfileCard key={profile.profileId} profile={profile} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto text-center py-12 border border-dashed border-river-blue/15 rounded-2xl bg-cloud-white"
            >
              <Users className="w-10 h-10 text-sunset-copper/40 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-river-blue mb-2">
                The directory is just getting started
              </h3>
              <p className="text-sm text-historic-stone mb-5">
                If you live, work, or study in Clarksville and hold AI, cloud, or technology credentials,
                you can be one of the first profiles.
              </p>
              <Button href="/ai-ready/submit" size="sm">
                Add Your Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Why Here, Why Now</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-river-blue mt-2 mb-4">
                Why Clarksville is Ready
              </h2>
              <p className="text-lg text-historic-stone max-w-2xl mx-auto">
                Tennessee's 5th largest city has the talent, location, and momentum to become
                a national leader in AI adoption.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                'Home to Fort Campbell and 30,000+ military-connected families with tech skills',
                'Austin Peay State University producing 1,200+ STEM graduates annually',
                'Strategic location between Nashville and the Southeast tech corridor',
                'Cost of living 15% below national average attracts tech talent',
                'Growing population of 180,000+ with pro-business local government',
                'Established manufacturing base ready for Industry 4.0 transformation',
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-fort-green flex-shrink-0 mt-0.5" />
                  <p className="text-historic-stone">{point}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Button variant="outline" href="/about">
                Learn About Our Initiative
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-tech-silver/20 border-y border-river-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm font-medium text-historic-stone tracking-wider uppercase mb-8">
              Working With
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 max-w-4xl mx-auto">
              {partners.map((partner, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="text-sm text-historic-stone/70 font-medium whitespace-nowrap"
                >
                  {partner.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
    </>
  );
}

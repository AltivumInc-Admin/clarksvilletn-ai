import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, ArrowRight } from 'lucide-react';
import { timeline, partners } from '../data/timeline';
import Button from '../components/ui/Button';
import CTA from '../components/sections/CTA';

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-gradient-to-b from-river-blue-50 to-cloud-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">About the Initiative</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mt-3 mb-6">
              Clarksville on the Cloud
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              A transformative civic technology initiative by Altivum Inc. to position Clarksville, Tennessee
              as a national leader in AI adoption, cloud technology, and digital innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-river-blue rounded-2xl p-8 md:p-10 text-white"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-sunset-copper" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Our Mission</h2>
              <p className="text-white/80 leading-relaxed">
                To empower every Clarksville business, institution, and resident with accessible AI and
                cloud technology, creating a thriving digital economy that preserves the community's
                values while driving innovation and growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-sunset-copper rounded-2xl p-8 md:p-10 text-white"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Our Vision</h2>
              <p className="text-white/80 leading-relaxed">
                By 2030, Clarksville will be recognized as one of America's top mid-size cities for
                AI readiness, where technology serves every sector of the community and creates
                opportunity for all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Who We Are</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-4">
                Built by Clarksville, for Clarksville
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-elevation-1 border border-river-blue/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {[
                  { icon: Award, label: 'Veteran-Founded', description: 'Built by veterans who understand service and mission' },
                  { icon: Users, label: 'Community-Driven', description: 'Every initiative designed with local input' },
                  { icon: Target, label: 'Impact-Focused', description: 'Measurable outcomes for businesses and residents' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-river-blue/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-river-blue" />
                    </div>
                    <h3 className="font-serif font-bold text-river-blue mb-1">{item.label}</h3>
                    <p className="text-sm text-historic-stone">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center border-t border-river-blue/5 pt-8">
                <p className="text-historic-stone leading-relaxed max-w-2xl mx-auto">
                  ClarksvilleTN.AI is a civic technology platform built and maintained by
                  <strong className="text-river-blue"> Altivum Inc.</strong>, a veteran-founded benefit
                  corporation based in Clarksville, Tennessee. While independently operated, the
                  initiative works collaboratively with local government, educational institutions,
                  and community organizations to maximize impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-4">
              Initiative Roadmap
            </h2>
            <p className="text-lg text-historic-stone max-w-xl mx-auto">
              Key milestones in Clarksville's transformation into an AI-enabled community.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 md:gap-6 mb-6 last:mb-0"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${
                    event.status === 'completed' ? 'bg-fort-green' :
                    event.status === 'current' ? 'bg-sunset-copper animate-pulse-slow' :
                    'bg-river-blue/20'
                  }`} />
                  {index < timeline.length - 1 && (
                    <div className={`w-px flex-grow mt-1 ${
                      event.status === 'completed' ? 'bg-fort-green/30' : 'bg-river-blue/10'
                    }`} />
                  )}
                </div>

                <div className={`pb-6 ${event.status === 'upcoming' ? 'opacity-60' : ''}`}>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    event.status === 'completed' ? 'bg-fort-green/10 text-fort-green' :
                    event.status === 'current' ? 'bg-sunset-copper/10 text-sunset-copper' :
                    'bg-river-blue/10 text-river-blue/60'
                  }`}>
                    {event.date}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-river-blue mt-2 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-historic-stone leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Collaboration</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-4">
              Our Partners
            </h2>
            <p className="text-lg text-historic-stone max-w-xl mx-auto">
              Working together with organizations across education, government, technology, and community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 text-center border border-river-blue/5 hover:shadow-elevation-1 transition-all"
              >
                <span className={`text-[10px] font-medium tracking-wider uppercase ${
                  partner.type === 'technology' ? 'text-sunset-copper' :
                  partner.type === 'education' ? 'text-river-blue' :
                  partner.type === 'government' ? 'text-fort-green' :
                  'text-historic-stone'
                }`}>
                  {partner.type}
                </span>
                <p className="text-sm font-medium text-river-blue mt-1">{partner.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button variant="outline" href="mailto:info@altivum.ai?subject=Partnership%20Inquiry">
              Become a Partner
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <CTA
        title="Be Part of Clarksville's AI Future"
        description="Whether you're a business owner, educator, civic leader, or technology enthusiast, there's a role for you in this initiative."
        primaryLabel="Share Your Story"
        primaryHref="https://forms.gle/SdQrmVQzKguJduGBA"
        secondaryLabel="Explore Resources"
        secondaryHref="/resources"
      />
    </>
  );
}

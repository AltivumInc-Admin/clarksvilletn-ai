import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import CTA from '../components/sections/CTA';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companies } from '../data/companies';
import { partners } from '../data/timeline';
import Button from '../components/ui/Button';

export default function Home() {
  const featuredStories = companies.filter(c => c.caseStudy).slice(0, 3);

  return (
    <>
      <Hero />
      <Features />

      {/* Success Stories Preview */}
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
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Impact</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-river-blue mt-2 mb-3">
                Real Results, Real Businesses
              </h2>
              <p className="text-lg text-historic-stone max-w-xl">
                See how Clarksville businesses are transforming their operations with AI and cloud technology.
              </p>
            </div>
            <Link
              to="/showcase"
              className="mt-4 md:mt-0 inline-flex items-center text-sunset-copper font-medium hover:text-sunset-copper-600 transition-colors group"
            >
              View all stories
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStories.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/showcase"
                  className="block bg-white rounded-2xl border border-river-blue/8 p-6 hover:shadow-elevation-3 hover:border-river-blue/15 transition-all duration-300 h-full group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-sunset-copper bg-sunset-copper/10 px-2.5 py-1 rounded-full">
                      {company.industry}
                    </span>
                    {company.featured && (
                      <span className="text-xs font-medium text-fort-green bg-fort-green/10 px-2.5 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-river-blue mb-2 group-hover:text-sunset-copper transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-historic-stone mb-4 line-clamp-2">
                    {company.description}
                  </p>

                  {company.caseStudy?.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-river-blue/5">
                      {company.caseStudy.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-bold text-sunset-copper">{metric.value}</div>
                          <div className="text-[10px] text-historic-stone leading-tight">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-20 bg-tech-silver/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote className="w-10 h-10 text-sunset-copper/30 mx-auto mb-6" />
            <blockquote className="text-xl md:text-2xl font-serif text-river-blue leading-relaxed mb-6">
              "Moving to the cloud transformed how we serve our clients. Our new platform is fast,
              reliable, and positions us for future growth with AI."
            </blockquote>
            <div className="text-sm text-historic-stone">
              <span className="font-medium text-river-blue">Executive Chauffeurs Team</span> &mdash; Clarksville, TN
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Clarksville Section */}
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

      {/* Partners */}
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

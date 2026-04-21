import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ExternalLink, ChevronDown, ChevronUp, Award, Quote } from 'lucide-react';
import { companies } from '../data/companies';
import Button from '../components/ui/Button';
import CTA from '../components/sections/CTA';

export default function Showcase() {
  const [expandedId, setExpandedId] = useState<string | null>(companies[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Success Stories</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mt-3 mb-6">
              Clarksville Businesses Leading the Way
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              Real stories from local businesses that have transformed their operations with
              AI and cloud technology through the ClarksvilleTN.AI initiative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-river-blue py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${companies.length}`, label: 'Featured Businesses' },
              { value: '5', label: 'Industries Represented' },
              { value: '35%', label: 'Avg Cost Reduction' },
              { value: '100%', label: 'Recommend the Program' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-sunset-copper">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-river-blue/8 overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-shadow"
              >
                {/* Header - always visible */}
                <button
                  onClick={() => toggleExpand(company.id)}
                  className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-river-blue">
                        {company.name}
                      </h3>
                      {company.featured && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-sunset-copper/10 text-sunset-copper px-2.5 py-1 rounded-full">
                          <Award className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-sunset-copper font-medium">{company.industry}</span>
                    </div>
                    <p className="text-sm text-historic-stone line-clamp-2">{company.description}</p>

                    {/* Metrics preview */}
                    {company.caseStudy?.metrics && expandedId !== company.id && (
                      <div className="flex gap-6 mt-4">
                        {company.caseStudy.metrics.map((metric, i) => (
                          <div key={i}>
                            <span className="text-lg font-bold text-sunset-copper">{metric.value}</span>
                            <span className="text-xs text-historic-stone ml-1">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {expandedId === company.id ? (
                      <ChevronUp className="w-5 h-5 text-historic-stone" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-historic-stone" />
                    )}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedId === company.id && company.caseStudy && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 border-t border-river-blue/5 pt-6">
                        {/* Metrics */}
                        {company.caseStudy.metrics && (
                          <div className="grid grid-cols-3 gap-4 mb-8">
                            {company.caseStudy.metrics.map((metric, i) => (
                              <div key={i} className="bg-river-blue/5 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-sunset-copper">{metric.value}</div>
                                <div className="text-xs text-historic-stone mt-1">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Challenge & Solution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <h4 className="text-sm font-semibold text-river-blue uppercase tracking-wide mb-2">
                              The Challenge
                            </h4>
                            <p className="text-sm text-historic-stone leading-relaxed">
                              {company.caseStudy.challenge}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-river-blue uppercase tracking-wide mb-2">
                              The Solution
                            </h4>
                            <p className="text-sm text-historic-stone leading-relaxed">
                              {company.caseStudy.solution}
                            </p>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-river-blue uppercase tracking-wide mb-3">
                            Key Results
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {company.caseStudy.results.map((result, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-fort-green flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-historic-stone">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-river-blue uppercase tracking-wide mb-3">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {company.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs font-medium bg-river-blue/5 text-river-blue px-3 py-1.5 rounded-full border border-river-blue/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Testimonial */}
                        {company.caseStudy.testimonial && (
                          <div className="bg-river-blue/5 rounded-xl p-5 mb-6">
                            <Quote className="w-5 h-5 text-sunset-copper/40 mb-2" />
                            <p className="text-sm text-river-blue italic leading-relaxed mb-2">
                              "{company.caseStudy.testimonial.text}"
                            </p>
                            <p className="text-xs text-historic-stone">
                              <span className="font-medium text-river-blue">{company.caseStudy.testimonial.author}</span>
                              {' '}&mdash; {company.caseStudy.testimonial.title}
                            </p>
                          </div>
                        )}

                        {/* Website screenshot for Executive Chauffeurs */}
                        {company.id === 'executive-chauffeurs' && company.website && (
                          <div className="mb-6">
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block group cursor-pointer"
                            >
                              <div className="relative rounded-xl overflow-hidden border border-river-blue/10">
                                <img
                                  src="/ecctn.png"
                                  alt="Executive Chauffeurs of Clarksville Website"
                                  className="w-full h-auto transform transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-river-blue/0 group-hover:bg-river-blue/10 transition-colors flex items-center justify-center">
                                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-full px-4 py-2 text-sm font-medium text-river-blue shadow-elevation-2">
                                    Visit Live Website <ExternalLink className="w-4 h-4 inline ml-1" />
                                  </span>
                                </div>
                              </div>
                            </a>
                          </div>
                        )}

                        {/* Actions */}
                        {company.website && (
                          <div className="flex gap-3">
                            <Button size="sm" variant="outline" href={company.website} target="_blank" rel="noopener noreferrer">
                              Visit Website
                              <ExternalLink className="ml-2 w-3.5 h-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Story Section */}
      <section className="py-16 md:py-20 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mb-4">
              Your Success Story is Next
            </h2>
            <p className="text-lg text-historic-stone mb-8">
              Join these businesses and share how AI and cloud technology is transforming
              your operations. Get featured on our platform and inspire the Clarksville community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
                Share Your Journey
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" href="/resources">
                Browse Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTA
        title="Be Part of Clarksville's Tech Story"
        description="The 'Clarksville on the Cloud' campaign showcases businesses leading the way in digital transformation."
        primaryLabel="Share Your Story"
        primaryHref="https://forms.gle/SdQrmVQzKguJduGBA"
        secondaryLabel="Browse Resources"
        secondaryHref="/resources"
      />
    </>
  );
}

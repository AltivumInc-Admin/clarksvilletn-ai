import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';
import { programs } from '../data/programs';
import Button from '../components/ui/Button';
import CTA from '../components/sections/CTA';

export default function Programs() {
  const activePrograms = programs.filter(p => p.status === 'active');
  const comingSoon = programs.filter(p => p.status === 'coming-soon');

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
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Programs & Services</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mt-3 mb-6">
              Your Path to AI Adoption
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              From free assessments to innovation grants, we provide the tools, training, and
              support Clarksville businesses need to thrive in the AI era.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Active Programs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-fort-green" />
              <span className="text-sm font-medium text-fort-green tracking-wider uppercase">Active Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue">
              Available Programs
            </h2>
          </motion.div>

          <div className="space-y-6">
            {activePrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:gap-10">
                    <div className="lg:flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-river-blue">
                          {program.title}
                        </h3>
                        <span className="text-xs font-medium bg-fort-green/10 text-fort-green px-2.5 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-sunset-copper font-medium mb-3">
                        For: {program.audience}
                      </p>
                      <p className="text-historic-stone leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    <div className="lg:w-80 flex-shrink-0">
                      <h4 className="text-sm font-semibold text-river-blue mb-3 uppercase tracking-wide">
                        What You Get
                      </h4>
                      <ul className="space-y-2.5">
                        {program.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-fort-green flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-historic-stone">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-river-blue/5 flex flex-col sm:flex-row gap-3">
                    <Button size="sm" href="/get-involved">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
                      Take Readiness Survey
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 md:py-24 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-sunset-copper" />
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Coming Soon</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue">
              On the Horizon
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comingSoon.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-river-blue/8 p-6 md:p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-sunset-copper/10 text-sunset-copper text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Coming Soon
                </div>

                <h3 className="text-xl font-serif font-bold text-river-blue mb-2 pr-20">
                  {program.title}
                </h3>
                <p className="text-sm text-sunset-copper font-medium mb-3">
                  For: {program.audience}
                </p>
                <p className="text-sm text-historic-stone leading-relaxed mb-4">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-river-blue/30 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-historic-stone/70">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-4">
              Getting Started is Simple
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Take the Survey', description: 'Complete our brief readiness assessment to help us understand your business needs.' },
              { step: '02', title: 'Get Matched', description: 'We match you with the right programs, resources, and support for your goals.' },
              { step: '03', title: 'Begin Your Journey', description: 'Work with our experts and partners to implement AI and cloud solutions.' },
              { step: '04', title: 'Share Your Story', description: 'Celebrate your transformation and inspire other Clarksville businesses.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-serif font-bold text-sunset-copper/20 mb-3">{item.step}</div>
                <h3 className="text-lg font-serif font-bold text-river-blue mb-2">{item.title}</h3>
                <p className="text-sm text-historic-stone">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Get Started?"
        description="Take our brief survey to find the right program for your business. It only takes 5 minutes."
        primaryLabel="Take the Survey"
        primaryHref="https://forms.gle/SdQrmVQzKguJduGBA"
        secondaryLabel="Contact Us"
        secondaryHref="/get-involved"
      />
    </>
  );
}

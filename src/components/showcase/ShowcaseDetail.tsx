import { motion } from 'framer-motion';
import { ArrowRight, Cloud, Award, TrendingUp, Globe } from 'lucide-react';
import type { Company } from '../../types';

interface ShowcaseDetailProps {
  company: Company;
}

export default function ShowcaseDetail({ company }: ShowcaseDetailProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-12 md:py-24 bg-gradient-to-b from-white to-cloud-white relative"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 glass-copper rounded-full shadow-elevation-1 mb-4 md:mb-6"
          >
            <Award className="w-4 h-4 md:w-5 md:h-5 text-sunset-copper mr-1.5 md:mr-2" />
            <span className="text-sunset-copper font-medium text-sm md:text-base">Featured Success Story</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mb-3 md:mb-6"
          >
            {company.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-historic-stone max-w-3xl mx-auto"
          >
            {company.description}
          </motion.p>
        </div>

        {company.caseStudy && (
          <div className="max-w-6xl mx-auto">
            {/* The Journey */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-16">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card-premium rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-elevation-2 border border-river-blue/5 card-hover-lift"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-river-blue/10 rounded-xl flex items-center justify-center mb-3 md:mb-6 border border-river-blue/10">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-river-blue" />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-river-blue mb-2 md:mb-4">
                  The Challenge
                </h3>
                <p className="text-historic-stone text-sm md:text-base lg:text-lg leading-relaxed">
                  {company.caseStudy.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-card-premium rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-elevation-2 border border-river-blue/5 card-hover-lift"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-sunset-copper/10 rounded-xl flex items-center justify-center mb-3 md:mb-6 border border-sunset-copper/10">
                  <Cloud className="w-5 h-5 md:w-6 md:h-6 text-sunset-copper" />
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-river-blue mb-2 md:mb-4">
                  The Solution
                </h3>
                <p className="text-historic-stone text-sm md:text-base lg:text-lg leading-relaxed">
                  {company.caseStudy.solution}
                </p>
              </motion.div>
            </div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-river-blue to-river-blue-light rounded-xl md:rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 text-white"
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold mb-4 md:mb-6 lg:mb-8 text-center">
                The Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {company.caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-sunset-copper/20 rounded-full flex items-center justify-center flex-shrink-0 mr-2 md:mr-3 lg:mr-4 mt-0.5">
                      <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-sunset-copper" />
                    </div>
                    <p className="text-cloud-white text-sm md:text-base lg:text-lg">
                      {result}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Technologies Used */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 md:mt-8 lg:mt-12 text-center"
            >
              <h4 className="text-xs md:text-sm font-semibold text-historic-stone uppercase tracking-wide mb-3 md:mb-4">
                Technologies Implemented
              </h4>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {company.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 glass-light shadow-elevation-1 rounded-full text-river-blue font-medium text-xs md:text-sm hover:shadow-elevation-2 transition-shadow duration-300"
                  >
                    <Cloud className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Website Screenshot */}
            {company.id === 'executive-chauffeurs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="mt-8 md:mt-12 lg:mt-16 max-w-5xl mx-auto"
              >
                <h4 className="text-xs md:text-sm font-semibold text-historic-stone uppercase tracking-wide mb-3 md:mb-6 text-center">
                  The New Cloud-Powered Website
                </h4>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-subtle border border-fine border-river-blue/10 bg-gradient-to-br from-river-blue/5 to-sunset-copper/5 p-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-2xl"></div>
                    <div className="relative rounded-xl overflow-hidden border border-fine border-river-blue/10 shadow-inner">
                      <img
                        src="/ecctn.png"
                        alt="Executive Chauffeurs of Clarksville Website"
                        className="w-full h-auto transform transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-river-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-subtle border border-fine border-river-blue/10 flex items-center">
                          <Globe className="w-5 h-5 text-river-blue mr-2" />
                          <span className="text-river-blue font-semibold">Visit Live Website</span>
                          <ArrowRight className="w-5 h-5 text-sunset-copper ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            )}

          </div>
        )}
      </div>
    </motion.section>
  );
}
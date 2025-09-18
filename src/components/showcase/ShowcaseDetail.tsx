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
      className="py-24 bg-gradient-to-b from-white to-cloud-white"
    >
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center px-4 py-2 bg-sunset-copper/10 rounded-full mb-6"
          >
            <Award className="w-5 h-5 text-sunset-copper mr-2" />
            <span className="text-sunset-copper font-medium">Featured Success Story</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold text-river-blue mb-6"
          >
            {company.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-historic-stone max-w-3xl mx-auto"
          >
            {company.description}
          </motion.p>
        </div>

        {company.caseStudy && (
          <div className="max-w-6xl mx-auto">
            {/* The Journey */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-12 h-12 bg-river-blue/10 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-river-blue" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-river-blue mb-4">
                  The Challenge
                </h3>
                <p className="text-historic-stone text-lg leading-relaxed">
                  {company.caseStudy.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-12 h-12 bg-sunset-copper/10 rounded-lg flex items-center justify-center mb-6">
                  <Cloud className="w-6 h-6 text-sunset-copper" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-river-blue mb-4">
                  The Solution
                </h3>
                <p className="text-historic-stone text-lg leading-relaxed">
                  {company.caseStudy.solution}
                </p>
              </motion.div>
            </div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-river-blue to-river-blue-light rounded-3xl p-12 text-white"
            >
              <h3 className="text-3xl font-serif font-bold mb-8 text-center">
                The Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-8 h-8 bg-sunset-copper/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <ArrowRight className="w-4 h-4 text-sunset-copper" />
                    </div>
                    <p className="text-cloud-white text-lg">
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
              className="mt-12 text-center"
            >
              <h4 className="text-sm font-semibold text-historic-stone uppercase tracking-wide mb-4">
                Technologies Implemented
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {company.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-4 py-2 bg-white shadow-md rounded-full text-river-blue font-medium"
                  >
                    <Cloud className="w-4 h-4 mr-2" />
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
                className="mt-16 max-w-5xl mx-auto"
              >
                <h4 className="text-sm font-semibold text-historic-stone uppercase tracking-wide mb-6 text-center">
                  The New Cloud-Powered Website
                </h4>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-river-blue/5 to-sunset-copper/5 p-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-2xl"></div>
                    <div className="relative rounded-xl overflow-hidden border border-white/50 shadow-inner">
                      <img
                        src="/ecctn.png"
                        alt="Executive Chauffeurs of Clarksville Website"
                        className="w-full h-auto transform transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-river-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-3 shadow-lg flex items-center">
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
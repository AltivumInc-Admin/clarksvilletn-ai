import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ExternalLink, ChevronRight, Award, Cloud, CheckCircle } from 'lucide-react';
import { companies } from '../data/companies';
import Button from '../components/ui/Button';

const industries = ['All', 'Manufacturing', 'Healthcare', 'Financial Services', 'Logistics', 'Technology', 'Food & Beverage'];

export default function Showcase() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const filteredCompanies = selectedIndustry === 'All' 
    ? companies 
    : companies.filter(c => c.industry === selectedIndustry);

  const selectedCompanyData = companies.find(c => c.id === selectedCompany);

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-cloud-white to-tech-silver/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-river-blue mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-historic-stone max-w-3xl mx-auto">
              Discover how Clarksville businesses are transforming their operations 
              with cloud technology and AI innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedIndustry === industry
                    ? 'bg-sunset-copper text-white shadow-copper'
                    : 'bg-white text-river-blue hover:bg-river-blue hover:text-white'
                }`}
              >
                {industry}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedCompany(company.id)}
                >
                  <div className="bg-white rounded-xl shadow-river hover:shadow-copper transition-all duration-300 p-8 h-full flex flex-col">
                    {company.featured && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Award className="w-5 h-5 text-sunset-copper" />
                        <span className="text-sm font-medium text-sunset-copper">Featured Story</span>
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-serif font-semibold text-river-blue mb-2">
                      {company.name}
                    </h3>
                    
                    <p className="text-historic-stone mb-4 flex-grow">
                      {company.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-river-blue-light">
                        <Filter className="w-4 h-4" />
                        <span>{company.industry}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {company.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-tech-silver text-xs font-medium text-river-blue rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm font-medium text-sunset-copper group-hover:text-sunset-copper-dark transition-colors">
                        View Case Study
                      </span>
                      <ChevronRight className="w-5 h-5 text-sunset-copper group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedCompanyData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-river-blue mb-2">
                      {selectedCompanyData.name}
                    </h2>
                    <p className="text-historic-stone">{selectedCompanyData.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="text-historic-stone hover:text-river-blue transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedCompanyData.caseStudy && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-river-blue mb-3 flex items-center">
                        <Cloud className="w-5 h-5 mr-2 text-sunset-copper" />
                        The Challenge
                      </h3>
                      <p className="text-historic-stone">
                        {selectedCompanyData.caseStudy.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-river-blue mb-3">
                        The Solution
                      </h3>
                      <p className="text-historic-stone">
                        {selectedCompanyData.caseStudy.solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-river-blue mb-3">
                        The Results
                      </h3>
                      <ul className="space-y-2">
                        {selectedCompanyData.caseStudy.results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-sunset-copper mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-historic-stone">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedCompanyData.caseStudy.testimonial && (
                      <div className="bg-river-blue/5 rounded-xl p-6">
                        <blockquote className="text-lg text-river-blue italic mb-4">
                          "{selectedCompanyData.caseStudy.testimonial.text}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-semibold text-river-blue">
                            {selectedCompanyData.caseStudy.testimonial.author}
                          </div>
                          <div className="text-historic-stone">
                            {selectedCompanyData.caseStudy.testimonial.title}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/contact">
                    Start Your Transformation
                  </Button>
                  {selectedCompanyData.website && (
                    <Button variant="outline" href={selectedCompanyData.website} external>
                      Visit Website
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-24 bg-river-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Your Success Story Awaits
            </h2>
            <p className="text-xl text-cloud-white/90 mb-8">
              Join these pioneering Clarksville businesses in their cloud transformation journey. 
              Let's showcase how your company is shaping the future of River City.
            </p>
            <Button size="lg" variant="primary" href="/campaign">
              Join the Campaign
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
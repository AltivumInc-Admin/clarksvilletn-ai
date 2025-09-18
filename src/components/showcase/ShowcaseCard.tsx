import { motion } from 'framer-motion';
import { Cloud, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';
import type { Company } from '../../types';
import Button from '../ui/Button';

interface ShowcaseCardProps {
  company: Company;
  index: number;
}

export default function ShowcaseCard({ company, index }: ShowcaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Header with gradient accent */}
      <div className="bg-gradient-to-r from-river-blue to-river-blue-light p-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-3xl font-serif font-bold text-white mb-2">
              {company.name}
            </h3>
            <p className="text-cloud-white/90">
              {company.industry}
            </p>
          </div>
          {company.featured && (
            <div className="bg-sunset-copper/20 backdrop-blur-sm rounded-full p-2">
              <Sparkles className="w-6 h-6 text-sunset-copper" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-historic-stone mb-6 text-lg leading-relaxed">
          {company.description}
        </p>

        {/* Technologies */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-river-blue uppercase tracking-wide mb-3">
            Cloud Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {company.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 bg-tech-silver/50 text-river-blue-dark rounded-full text-sm font-medium"
              >
                <Cloud className="w-3 h-3 mr-1" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Preview */}
        {company.caseStudy && (
          <div className="border-t pt-6">
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-historic-stone uppercase tracking-wide mb-3">
                The Challenge
              </h4>
              <p className="text-historic-stone">
                {company.caseStudy.challenge}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-historic-stone uppercase tracking-wide mb-3">
                The Solution
              </h4>
              <p className="text-historic-stone">
                {company.caseStudy.solution}
              </p>
            </div>

            {/* Key Results */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-historic-stone uppercase tracking-wide mb-3">
                Key Results
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {company.caseStudy.results.slice(0, 4).map((result, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-fort-green mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-historic-stone">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {company.website && (
          <div className="flex justify-end pt-4">
            <Button
              href={company.website}
              external
              variant="outline"
              className="group"
            >
              Visit Website
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
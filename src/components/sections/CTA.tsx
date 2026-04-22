import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

interface CTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'gradient';
}

export default function CTA({
  title = "Ready to Transform Your Business?",
  description = "Join Clarksville residents already building with AI and cloud technology. Add your profile or explore the directory.",
  primaryLabel = "Add Your Profile",
  primaryHref = "/ai-ready/submit",
  secondaryLabel = "See AI-Ready Clarksville",
  secondaryHref = "/ai-ready",
  variant = 'dark',
}: CTAProps) {
  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${
      variant === 'dark' ? 'bg-river-blue-800' : 'bg-cta-gradient'
    }`}>
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 md:mb-6">
            {title}
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="primary" href={primaryHref}>
              {primaryLabel}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {secondaryLabel && (
              <Button size="lg" variant="outline" href={secondaryHref} className="border-white/20 text-white hover:bg-white/10">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="py-24 bg-river-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/cloud-pattern.svg')] opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Join Clarksville's Cloud Revolution?
          </h2>
          <p className="text-xl text-cloud-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a local manufacturer, retailer, or service provider, 
            discover the resources and support available for your cloud journey.
          </p>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" variant="primary" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
              Take Our Brief Survey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
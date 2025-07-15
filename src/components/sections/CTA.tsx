import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react';
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
            we're here to guide your journey to the cloud and beyond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <Calendar className="w-8 h-8 text-sunset-copper mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Free Consultation
              </h3>
              <p className="text-cloud-white/80 text-sm">
                Get a personalized cloud strategy session for your business
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <MessageSquare className="w-8 h-8 text-sunset-copper mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Join the Campaign
              </h3>
              <p className="text-cloud-white/80 text-sm">
                Be featured in our "Clarksville on the Cloud" showcase
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" variant="primary" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
              Take Our Brief Survey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" href="/campaign" className="border-white text-white hover:bg-white hover:text-river-blue">
              Learn About the Campaign
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
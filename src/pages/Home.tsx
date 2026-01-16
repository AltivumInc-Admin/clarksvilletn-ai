import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import CTA from '../components/sections/CTA';
import { motion } from 'framer-motion';
import { Building2, Sparkles, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      
      <section className="py-12 md:py-24 bg-white relative">
        <div className="absolute inset-0 bg-copper-radial opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-river-blue mb-3 md:mb-4">
              Clarksville's Digital Transformation
            </h2>
            <p className="text-sm md:text-lg lg:text-xl text-historic-stone max-w-3xl mx-auto">
              From Fort Campbell's military excellence to the Cumberland River's commerce, 
              Clarksville is writing the next chapter of its success story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center glass-light rounded-2xl p-6 md:p-8 shadow-elevation-1 card-hover-lift"
            >
              <div className="bg-sunset-copper/10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 border border-sunset-copper/20">
                <Building2 className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-sunset-copper" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold text-river-blue mb-2 md:mb-3">
                Local Business Focus
              </h3>
              <p className="text-sm md:text-base text-historic-stone mb-3 md:mb-4">
                Tailored solutions for manufacturing, healthcare, retail, and service industries 
                that power Clarksville's economy.
              </p>
              <Button variant="ghost" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
                Take Our Survey
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center glass-light rounded-2xl p-6 md:p-8 shadow-elevation-1 card-hover-lift"
            >
              <div className="bg-river-blue/10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 border border-river-blue/20">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-river-blue" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold text-river-blue mb-2 md:mb-3">
                AI Innovation Hub
              </h3>
              <p className="text-sm md:text-base text-historic-stone mb-3 md:mb-4">
                Creating a central destination where businesses can explore and experience 
                AI solutions tailored to their industry needs.
              </p>
              <Button variant="ghost" href="/campaign">
                Learn More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center glass-light rounded-2xl p-6 md:p-8 shadow-elevation-1 card-hover-lift"
            >
              <div className="bg-fort-green/10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-6 border border-fort-green/20">
                <TrendingUp className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-fort-green" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold text-river-blue mb-2 md:mb-3">
                Measurable Results
              </h3>
              <p className="text-sm md:text-base text-historic-stone mb-3 md:mb-4">
                Join successful companies already leveraging cloud and AI to drive growth 
                in Tennessee's 5th largest city.
              </p>
              <Button variant="ghost" href="/analytics">
                View Analytics
              </Button>
            </motion.div>
          </div>
        </div>
      </section>


      <CTA />
    </>
  );
}
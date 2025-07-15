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
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-river-blue mb-4">
              Clarksville's Digital Transformation
            </h2>
            <p className="text-xl text-historic-stone max-w-3xl mx-auto">
              From Fort Campbell's military excellence to the Cumberland River's commerce, 
              we're writing the next chapter of Clarksville's success story.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-sunset-copper/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-sunset-copper" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-river-blue mb-3">
                Local Business Focus
              </h3>
              <p className="text-historic-stone mb-4">
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
              className="text-center"
            >
              <div className="bg-river-blue/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-river-blue" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-river-blue mb-3">
                AI Innovation Hub
              </h3>
              <p className="text-historic-stone mb-4">
                Building towards Tennessee's first brick-and-mortar AI store, 
                making advanced technology accessible to all.
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
              className="text-center"
            >
              <div className="bg-fort-green/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-fort-green" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-river-blue mb-3">
                Proven Results
              </h3>
              <p className="text-historic-stone mb-4">
                Join successful companies already leveraging cloud and AI to drive growth 
                in Tennessee's 5th largest city.
              </p>
              <Button variant="ghost" href="/showcase">
                Success Stories
              </Button>
            </motion.div>
          </div>
        </div>
      </section>


      <CTA />
    </>
  );
}
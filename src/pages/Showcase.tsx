import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Building2, Rocket, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Showcase() {
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
              Discover how Clarksville businesses will transform their operations 
              with cloud technology and AI innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-river-blue/5 to-sunset-copper/5 rounded-2xl p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-sunset-copper/10 rounded-full mb-6">
                <Sparkles className="w-10 h-10 text-sunset-copper" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mb-6">
                Coming Soon: Your Success Story
              </h2>
              
              <p className="text-lg text-historic-stone mb-8 max-w-2xl mx-auto">
                As you transition to the cloud and implement AI into your workflows, 
                we would love to feature your success stories and innovative ideas. 
                Be among the first Clarksville businesses to showcase how technology 
                is transforming your operations and driving growth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <Building2 className="w-8 h-8 text-river-blue mb-4 mx-auto" />
                  <h3 className="font-semibold text-river-blue mb-2">Share Your Journey</h3>
                  <p className="text-sm text-historic-stone">
                    Tell us about your cloud migration and AI adoption experience
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <Rocket className="w-8 h-8 text-sunset-copper mb-4 mx-auto" />
                  <h3 className="font-semibold text-river-blue mb-2">Inspire Others</h3>
                  <p className="text-sm text-historic-stone">
                    Your innovation can motivate other Clarksville businesses
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <TrendingUp className="w-8 h-8 text-fort-green mb-4 mx-auto" />
                  <h3 className="font-semibold text-river-blue mb-2">Gain Recognition</h3>
                  <p className="text-sm text-historic-stone">
                    Be featured as a leader in Clarksville's tech transformation
                  </p>
                </motion.div>
              </div>

              <div className="space-y-4">
                <p className="text-historic-stone">
                  Whether you're a manufacturing company streamlining operations, 
                  a healthcare provider improving patient care, or a retail business 
                  enhancing customer experience - we want to hear from you!
                </p>
                
                <div className="flex justify-center mt-8">
                  <Button size="lg" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
                    Take Our Brief Survey
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
              Be Part of Clarksville's Tech Story
            </h2>
            <p className="text-xl text-cloud-white/90 mb-8">
              The "Clarksville on the Cloud" campaign will launch soon, showcasing 
              local businesses leading the way in digital transformation. Join us in 
              building Tennessee's most innovative city.
            </p>
            <Button size="lg" variant="primary" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
              Get Started with Our Survey
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
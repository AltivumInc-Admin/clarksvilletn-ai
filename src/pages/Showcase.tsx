import { motion } from 'framer-motion';
import { ChevronRight, Rocket } from 'lucide-react';
import Button from '../components/ui/Button';
import ShowcaseDetail from '../components/showcase/ShowcaseDetail';
import { companies } from '../data/companies';

export default function Showcase() {
  const featuredCompany = companies.find(c => c.featured);

  return (
    <>

      {/* Featured Company Detail */}
      {featuredCompany && (
        <ShowcaseDetail company={featuredCompany} />
      )}

      {/* Join the Movement */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-cloud-white to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-river-blue/5 to-sunset-copper/5 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-sunset-copper/10 rounded-full mb-4 md:mb-6">
                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-sunset-copper" />
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-river-blue mb-3 md:mb-6">
                Your Success Story is Next
              </h2>

              <p className="text-sm md:text-base lg:text-lg text-historic-stone mb-4 md:mb-8 max-w-2xl mx-auto">
                Join Executive Chauffeurs and other forward-thinking Clarksville businesses
                in the cloud revolution. Transform your operations, enhance your services,
                and lead your industry into the future.
              </p>

              <div className="mb-4 md:mb-8">
                <p className="text-sm md:text-base text-historic-stone">
                  Whether you're in manufacturing, healthcare, retail, or any other industry -
                  the cloud can transform how you do business.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" href="https://forms.gle/SdQrmVQzKguJduGBA" external>
                  Share Your Journey
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" href="/campaign">
                  Learn About the Campaign
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-24 bg-river-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-3 md:mb-6">
              Be Part of Clarksville's Tech Story
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-cloud-white/90 mb-4 md:mb-8">
              The "Clarksville on the Cloud" campaign showcases businesses leading
              the way in digital transformation. Join us in building Tennessee's
              most innovative city.
            </p>
            <Button size="lg" variant="primary" href="https://forms.gle/SdQrmVQzKguJduGBA" external>
              Get Started Today
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
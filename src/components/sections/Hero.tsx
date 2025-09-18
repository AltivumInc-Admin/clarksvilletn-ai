import { motion } from 'framer-motion';
import { Cloud, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0">
      <div className="absolute inset-0 bg-gradient-to-br from-cloud-white via-tech-silver/30 to-cloud-white"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-sunset-copper/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-river-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[url('/images/clarksville-river.jpg')] bg-cover bg-center opacity-5"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-1.5 md:space-x-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-river mb-4 md:mb-6">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-sunset-copper" />
              <span className="text-xs md:text-sm font-medium text-river-blue">
                Launching "Clarksville on the Cloud" Campaign
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-river-blue mb-4 md:mb-6">
              Clarksville's Gateway to
              <span className="block gradient-text">Cloud & AI Innovation</span>
            </h1>
            
            <p className="text-base md:text-xl lg:text-2xl text-historic-stone max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Empowering Clarksville businesses with cutting-edge cloud technology and AI innovation. 
              From Fort Campbell to the Cumberland River, Clarksville is building Tennessee's tech future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
              Take Our Brief Survey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" href="/showcase">
              See Success Stories
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 md:mt-16 grid grid-cols-3 gap-4 md:gap-8"
          >
            {[
              { number: '180K+', label: 'Clarksville Residents' },
              { number: '1 in 20', label: 'TN Businesses Using AI' },
              { number: '15%', label: 'Tech Sector Growth' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-sunset-copper mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-historic-stone">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Cloud className="w-8 h-8 text-river-blue/40" />
      </motion.div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Building2, Users, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-dark"></div>
      <div className="absolute inset-0 bg-pattern-grid opacity-10"></div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-sunset-copper/8 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-river-blue-400/10 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-fort-green/5 rounded-full blur-[60px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-0">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-fort-green animate-pulse-slow"></span>
              <span className="text-sm font-medium text-white/90">
                Building Tennessee's AI Future
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
              Where Clarksville
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sunset-copper-300 to-sunset-copper">
                Meets Innovation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
              ClarksvilleTN.AI is the city's initiative connecting businesses, residents, and
              institutions with AI and cloud technology to drive economic growth and community
              transformation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" href="/about">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" href="/showcase" className="border-white/20 text-white hover:bg-white/10">
                See Success Stories
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {[
              { icon: Building2, value: '156', label: 'Businesses Adopting Cloud', color: 'text-sunset-copper' },
              { icon: Users, value: '2,300+', label: 'Tech Jobs Created', color: 'text-river-blue-300' },
              { icon: Brain, value: '$127M', label: 'Tech Investment', color: 'text-fort-green-300' },
              { icon: Lightbulb, value: '47%', label: 'Tech Sector Growth', color: 'text-sunset-copper-300' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 text-center"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cloud-white to-transparent"></div>
    </section>
  );
}

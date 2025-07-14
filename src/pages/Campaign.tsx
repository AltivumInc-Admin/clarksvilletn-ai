import { motion } from 'framer-motion';
import { Cloud, CheckCircle, Users, TrendingUp, Award, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Campaign() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-river-blue via-river-blue-light to-river-blue">
        <div className="absolute inset-0 bg-[url('/images/cloud-pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-6 relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-sunset-copper/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Cloud className="w-5 h-5 text-sunset-copper" />
              <span className="text-sm font-medium text-white">Launching 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              Clarksville on the Cloud
            </h1>
            
            <p className="text-xl md:text-2xl text-cloud-white/90 mb-8 leading-relaxed">
              A transformative campaign showcasing how local businesses are leveraging 
              cloud technology to drive innovation, efficiency, and growth in River City.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Join the Campaign
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-river-blue">
                Download Campaign Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-river-blue mb-4">
              Why "Clarksville on the Cloud"?
            </h2>
            <p className="text-xl text-historic-stone">
              As Tennessee's 5th largest city experiences unprecedented growth, 
              we're positioning Clarksville as a leader in digital transformation 
              and technological innovation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                number: '50+',
                label: 'Local Businesses',
                description: 'Ready to showcase their cloud journey',
              },
              {
                icon: TrendingUp,
                number: '35%',
                label: 'Average Cost Reduction',
                description: 'Reported by early cloud adopters',
              },
              {
                icon: Award,
                number: '$1M+',
                label: 'Investment Pool',
                description: 'Available for qualifying businesses',
              },
              {
                icon: Cloud,
                number: '24/7',
                label: 'Support & Resources',
                description: 'Continuous guidance and assistance',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-river-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-river-blue" />
                </div>
                <div className="text-3xl font-bold text-sunset-copper mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-river-blue mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-historic-stone">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-tech-silver/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-river-blue mb-4">
              Campaign Benefits
            </h2>
            <p className="text-xl text-historic-stone max-w-3xl mx-auto">
              Join Clarksville's most ambitious business transformation initiative
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Free Cloud Assessment',
                description: 'Comprehensive evaluation of your current infrastructure and personalized cloud migration roadmap.',
                icon: CheckCircle,
              },
              {
                title: 'Featured Success Story',
                description: 'Showcase your transformation journey on our platform and in local media outlets.',
                icon: CheckCircle,
              },
              {
                title: 'Expert Consultation',
                description: 'Access to cloud architects, AI specialists, and digital transformation experts.',
                icon: CheckCircle,
              },
              {
                title: 'Marketing Support',
                description: 'Professional photography, video production, and content creation for your story.',
                icon: CheckCircle,
              },
              {
                title: 'Networking Opportunities',
                description: 'Connect with other forward-thinking Clarksville businesses and tech leaders.',
                icon: CheckCircle,
              },
              {
                title: 'Funding Assistance',
                description: 'Guidance on grants, incentives, and funding opportunities for cloud adoption.',
                icon: CheckCircle,
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-river flex items-start space-x-4"
              >
                <benefit.icon className="w-6 h-6 text-sunset-copper flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-river-blue mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-historic-stone">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-sunset-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Ready to Put Your Business on the Cloud?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join fellow Clarksville businesses in embracing the future. 
              Limited spots available for our 2025 launch cohort.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Application Process
              </h3>
              <div className="space-y-4 text-left">
                {[
                  'Complete the online application form',
                  'Schedule your free cloud readiness assessment',
                  'Receive your personalized transformation plan',
                  'Begin your cloud journey with expert support',
                  'Share your success story with the community',
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-white/90">{step}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="primary" className="mt-8 w-full sm:w-auto">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
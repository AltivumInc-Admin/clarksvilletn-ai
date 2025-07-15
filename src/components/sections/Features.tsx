import { motion } from 'framer-motion';
import { Cloud, Cpu, Shield, TrendingUp, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Reduced Infrastructure Costs',
    description: 'Eliminate expensive hardware purchases and maintenance. Pay only for what you use with scalable cloud resources.',
    color: 'text-river-blue',
    bgColor: 'bg-river-blue/10',
  },
  {
    icon: Cpu,
    title: 'AI-Powered Efficiency',
    description: 'Automate repetitive tasks, analyze data instantly, and make smarter decisions with artificial intelligence.',
    color: 'text-sunset-copper',
    bgColor: 'bg-sunset-copper/10',
  },
  {
    icon: Shield,
    title: 'Enterprise-Level Security',
    description: 'Access bank-grade encryption and security protocols that most businesses couldn\'t afford on their own.',
    color: 'text-fort-green',
    bgColor: 'bg-fort-green/10',
  },
  {
    icon: TrendingUp,
    title: 'Unlimited Scalability',
    description: 'Grow from 10 to 10,000 customers without infrastructure headaches. Scale up or down instantly based on demand.',
    color: 'text-river-blue',
    bgColor: 'bg-river-blue/10',
  },
  {
    icon: Users,
    title: 'Work From Anywhere',
    description: 'Enable your team to collaborate seamlessly whether they\'re at home, in the office, or on the road.',
    color: 'text-sunset-copper',
    bgColor: 'bg-sunset-copper/10',
  },
  {
    icon: Zap,
    title: 'Faster Time to Market',
    description: 'Deploy new features in hours instead of months. Stay ahead of competitors with rapid innovation cycles.',
    color: 'text-fort-green',
    bgColor: 'bg-fort-green/10',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-cloud-white to-tech-silver/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-river-blue mb-4">
            Why Clarksville Businesses Choose the Cloud
          </h2>
          <p className="text-xl text-historic-stone max-w-3xl mx-auto">
            From manufacturing giants to local startups, discover how Clarksville is 
            becoming a leader in modern technology across Tennessee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-river hover:shadow-copper transition-all duration-300 h-full">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-river-blue mb-3">
                  {feature.title}
                </h3>
                <p className="text-historic-stone leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Lightbulb, Globe } from 'lucide-react';

const pillars = [
  {
    icon: Building2,
    title: 'Business AI Adoption',
    description: 'Helping Clarksville businesses leverage AI and cloud technology to reduce costs, increase efficiency, and compete in the digital economy.',
    color: 'bg-sunset-copper',
    lightColor: 'bg-sunset-copper/10',
    textColor: 'text-sunset-copper',
    stat: '156 businesses enrolled',
  },
  {
    icon: GraduationCap,
    title: 'Workforce Development',
    description: 'Building a pipeline of tech-ready talent through training programs, certifications, and partnerships with Austin Peay State University.',
    color: 'bg-river-blue',
    lightColor: 'bg-river-blue/10',
    textColor: 'text-river-blue',
    stat: '1,200+ trained annually',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Ecosystem',
    description: 'Creating the infrastructure for startups and entrepreneurs to build, test, and scale AI solutions right here in Clarksville.',
    color: 'bg-fort-green',
    lightColor: 'bg-fort-green/10',
    textColor: 'text-fort-green',
    stat: 'Innovation Lab coming 2026',
  },
  {
    icon: Globe,
    title: 'Smart City Solutions',
    description: 'Applying AI to city challenges including transportation, public safety, sustainability, and citizen services for a smarter Clarksville.',
    color: 'bg-river-blue',
    lightColor: 'bg-river-blue-100',
    textColor: 'text-river-blue',
    stat: 'Pilot programs active',
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-cloud-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Our Strategy</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-river-blue mt-2 mb-4">
            Four Pillars of Innovation
          </h2>
          <p className="text-lg text-historic-stone max-w-2xl mx-auto">
            A comprehensive approach to making Clarksville Tennessee's premier
            destination for AI and cloud technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-elevation-1 border border-river-blue/5 hover:shadow-elevation-3 hover:border-river-blue/10 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${pillar.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-river-blue mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-historic-stone leading-relaxed mb-3">
                      {pillar.description}
                    </p>
                    <span className={`text-sm font-medium ${pillar.textColor}`}>
                      {pillar.stat}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

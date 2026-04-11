import { motion } from 'framer-motion';
import { Building2, Users, Handshake, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';

const audiences = [
  {
    id: 'businesses',
    icon: Building2,
    title: 'For Businesses',
    description: 'Whether you\'re a manufacturer, retailer, healthcare provider, or service company, we have programs designed to help you adopt AI and cloud technology.',
    actions: [
      { label: 'Take the AI Readiness Survey', href: 'https://forms.gle/SdQrmVQzKguJduGBA', external: true },
      { label: 'Explore Programs', href: '/programs' },
      { label: 'See Success Stories', href: '/showcase' },
    ],
    color: 'bg-sunset-copper',
  },
  {
    id: 'residents',
    icon: Users,
    title: 'For Residents',
    description: 'Learn about AI, build new skills, and discover career opportunities in Clarksville\'s growing tech sector. Free resources and training available.',
    actions: [
      { label: 'Browse Learning Resources', href: '/resources' },
      { label: 'Workforce Programs', href: '/programs' },
      { label: 'View Job Market Data', href: '/analytics' },
    ],
    color: 'bg-river-blue',
  },
  {
    id: 'partners',
    icon: Handshake,
    title: 'For Partners & Investors',
    description: 'Join our ecosystem of technology providers, educational institutions, and community organizations working together to build Clarksville\'s AI future.',
    actions: [
      { label: 'Learn About the Initiative', href: '/about' },
      { label: 'View Analytics', href: '/analytics' },
      { label: 'Contact Us', href: 'mailto:info@altivum.ai' },
    ],
    color: 'bg-fort-green',
  },
];

export default function GetInvolved() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-gradient-to-b from-river-blue-50 to-cloud-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Get Involved</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mt-3 mb-6">
              Join Clarksville's AI Future
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              There's a place for everyone in Clarksville's AI initiative. Find the path
              that's right for you and take the first step today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Audience Pathways */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-8 max-w-4xl mx-auto">
            {audiences.map((audience, index) => (
              <motion.div
                key={audience.id}
                id={audience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-river-blue/8 shadow-elevation-1 overflow-hidden"
              >
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className={`w-14 h-14 ${audience.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <audience.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-river-blue mb-3">
                        {audience.title}
                      </h2>
                      <p className="text-historic-stone leading-relaxed mb-6">
                        {audience.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {audience.actions.map((action, i) => (
                          <Button
                            key={i}
                            size="sm"
                            variant={i === 0 ? 'primary' : 'outline'}
                            href={action.href}
                            {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {action.label}
                            {i === 0 && <ArrowRight className="ml-2 w-4 h-4" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Contact Us</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2 mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-historic-stone max-w-xl mx-auto">
                Have questions about our programs or want to explore partnership opportunities?
                We'd love to hear from you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Mail,
                  title: 'Email Us',
                  primary: 'info@altivum.ai',
                  href: 'mailto:info@altivum.ai',
                  secondary: 'We respond within 24 hours',
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  primary: '615-219-9425',
                  href: 'tel:615-219-9425',
                  secondary: 'Mon-Fri, 9am-5pm CT',
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  primary: 'Clarksville, TN',
                  href: '',
                  secondary: 'Montgomery County, Tennessee',
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 text-center border border-river-blue/5 shadow-elevation-1"
                >
                  <div className="w-12 h-12 bg-river-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <contact.icon className="w-6 h-6 text-river-blue" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-river-blue mb-2">{contact.title}</h3>
                  {contact.href ? (
                    <a href={contact.href} className="text-sunset-copper hover:text-sunset-copper-600 font-medium transition-colors">
                      {contact.primary}
                    </a>
                  ) : (
                    <span className="text-sunset-copper font-medium">{contact.primary}</span>
                  )}
                  <p className="text-xs text-historic-stone mt-1">{contact.secondary}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Survey CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12 bg-river-blue rounded-2xl p-8 md:p-10 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                Start with Our Quick Survey
              </h3>
              <p className="text-white/70 mb-6 max-w-lg mx-auto">
                Not sure where to begin? Our 5-minute survey helps us understand your needs
                and match you with the right programs and resources.
              </p>
              <Button size="lg" variant="primary" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
                Take the Survey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

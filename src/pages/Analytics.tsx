import { motion } from 'framer-motion';
import { TrendingUp, Building2, DollarSign, Briefcase, GraduationCap } from 'lucide-react';

const stats = [
  {
    label: 'Tech Sector Growth',
    value: '47%',
    period: '2020-2024',
    icon: TrendingUp,
    color: 'text-sunset-copper',
    bgColor: 'bg-sunset-copper/10',
  },
  {
    label: 'Tech Jobs Created',
    value: '2,300+',
    period: 'Since 2022',
    icon: Briefcase,
    color: 'text-river-blue',
    bgColor: 'bg-river-blue/10',
  },
  {
    label: 'Average Salary Increase',
    value: '$85K',
    period: 'Tech Positions',
    icon: DollarSign,
    color: 'text-fort-green',
    bgColor: 'bg-fort-green/10',
  },
  {
    label: 'Companies Adopting Cloud',
    value: '156',
    period: 'Local Businesses',
    icon: Building2,
    color: 'text-sunset-copper',
    bgColor: 'bg-sunset-copper/10',
  },
  {
    label: 'STEM Graduates',
    value: '1,200+',
    period: 'Annual Average',
    icon: GraduationCap,
    color: 'text-river-blue',
    bgColor: 'bg-river-blue/10',
  },
  {
    label: 'Tech Investment',
    value: '$127M',
    period: '2023-2024',
    icon: DollarSign,
    color: 'text-fort-green',
    bgColor: 'bg-fort-green/10',
  },
];

const growthData = [
  { year: '2020', businesses: 45, investment: 23 },
  { year: '2021', businesses: 67, investment: 41 },
  { year: '2022', businesses: 98, investment: 68 },
  { year: '2023', businesses: 134, investment: 95 },
  { year: '2024', businesses: 156, investment: 127 },
];

export default function Analytics() {
  const maxBusinesses = Math.max(...growthData.map(d => d.businesses));
  const maxInvestment = Math.max(...growthData.map(d => d.investment));

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
              Clarksville Tech Analytics
            </h1>
            <p className="text-xl text-historic-stone max-w-3xl mx-auto">
              Real data showcasing Clarksville's remarkable transformation into 
              Tennessee's emerging technology hub.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-sunset-copper/10 border-2 border-sunset-copper/20 rounded-xl p-6 text-center">
              <p className="text-lg text-river-blue font-medium">
                <strong>Note:</strong> These visualizations represent sample analytics demonstrating our vision 
                for tracking and presenting Clarksville's tech and AI adoption. Our goal is to provide 
                businesses and public sector organizations with clear insights into the local technology 
                landscape, enabling data-driven decisions for digital transformation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mb-4">
              Growth Metrics
            </h2>
            <p className="text-lg text-historic-stone">
              Key performance indicators driving Clarksville's digital economy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-river p-6 hover:shadow-copper transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-historic-stone">{stat.period}</span>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-river-blue font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-beige/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue text-center mb-12">
              5-Year Growth Trajectory
            </h2>
            
            <div className="bg-white rounded-2xl shadow-river p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-river-blue mb-6">
                    Cloud-Adopting Businesses
                  </h3>
                  <div className="space-y-4">
                    {growthData.map((data, index) => (
                      <motion.div
                        key={data.year}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-historic-stone">{data.year}</span>
                          <span className="text-sm font-bold text-river-blue">{data.businesses}</span>
                        </div>
                        <div className="h-6 bg-tech-silver rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.businesses / maxBusinesses) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-river-blue to-sunset-copper"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-river-blue mb-6">
                    Tech Investment (Millions)
                  </h3>
                  <div className="space-y-4">
                    {growthData.map((data, index) => (
                      <motion.div
                        key={data.year}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-historic-stone">{data.year}</span>
                          <span className="text-sm font-bold text-fort-green">${data.investment}M</span>
                        </div>
                        <div className="h-6 bg-tech-silver rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.investment / maxInvestment) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-fort-green to-sunset-copper"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mb-8">
              Industry Breakdown
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { industry: 'Manufacturing', percentage: '32%', count: '50' },
                { industry: 'Healthcare', percentage: '24%', count: '37' },
                { industry: 'Retail & E-commerce', percentage: '28%', count: '44' },
                { industry: 'Professional Services', percentage: '16%', count: '25' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-river-blue/5 to-sunset-copper/5 rounded-xl p-6"
                >
                  <div className="text-3xl font-bold text-sunset-copper mb-2">
                    {item.percentage}
                  </div>
                  <div className="text-sm font-medium text-river-blue mb-1">
                    {item.industry}
                  </div>
                  <div className="text-xs text-historic-stone">
                    {item.count} businesses
                  </div>
                </motion.div>
              ))}
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
              Join Clarksville's Tech Revolution
            </h2>
            <p className="text-xl text-cloud-white/90 mb-8">
              These numbers tell a story of transformation. Be part of the next chapter 
              as Clarksville continues its journey to becoming Tennessee's premier tech destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.gle/SdQrmVQzKguJduGBA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-medium rounded-lg bg-sunset-copper text-white hover:bg-sunset-copper-dark transition-all duration-200 shadow-copper"
              >
                Take Our Survey
                <TrendingUp className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
import { motion } from 'framer-motion';
import { TrendingUp, Building2, DollarSign, Briefcase, GraduationCap, AlertCircle } from 'lucide-react';
import CTA from '../components/sections/CTA';

const stats = [
  {
    label: 'Tech Sector Growth',
    value: '47%',
    period: '2020-2024',
    icon: TrendingUp,
    color: 'text-sunset-copper',
    bgColor: 'bg-sunset-copper/10',
    borderColor: 'border-sunset-copper/20',
  },
  {
    label: 'Tech Jobs Created',
    value: '2,300+',
    period: 'Since 2022',
    icon: Briefcase,
    color: 'text-river-blue',
    bgColor: 'bg-river-blue/10',
    borderColor: 'border-river-blue/20',
  },
  {
    label: 'Average Tech Salary',
    value: '$85K',
    period: 'Tech Positions',
    icon: DollarSign,
    color: 'text-fort-green',
    bgColor: 'bg-fort-green/10',
    borderColor: 'border-fort-green/20',
  },
  {
    label: 'Cloud-Adopting Companies',
    value: '156',
    period: 'Local Businesses',
    icon: Building2,
    color: 'text-sunset-copper',
    bgColor: 'bg-sunset-copper/10',
    borderColor: 'border-sunset-copper/20',
  },
  {
    label: 'STEM Graduates',
    value: '1,200+',
    period: 'Annual Average',
    icon: GraduationCap,
    color: 'text-river-blue',
    bgColor: 'bg-river-blue/10',
    borderColor: 'border-river-blue/20',
  },
  {
    label: 'Tech Investment',
    value: '$127M',
    period: '2023-2024',
    icon: DollarSign,
    color: 'text-fort-green',
    bgColor: 'bg-fort-green/10',
    borderColor: 'border-fort-green/20',
  },
];

const growthData = [
  { year: '2020', businesses: 45, investment: 23 },
  { year: '2021', businesses: 67, investment: 41 },
  { year: '2022', businesses: 98, investment: 68 },
  { year: '2023', businesses: 134, investment: 95 },
  { year: '2024', businesses: 156, investment: 127 },
];

const industries = [
  { name: 'Manufacturing', percentage: 32, count: 50, color: 'bg-river-blue' },
  { name: 'Healthcare', percentage: 24, count: 37, color: 'bg-sunset-copper' },
  { name: 'Retail & E-commerce', percentage: 28, count: 44, color: 'bg-fort-green' },
  { name: 'Professional Services', percentage: 16, count: 25, color: 'bg-river-blue-400' },
];

export default function Analytics() {
  const maxBusinesses = Math.max(...growthData.map(d => d.businesses));
  const maxInvestment = Math.max(...growthData.map(d => d.investment));

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
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Data & Insights</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mt-3 mb-6">
              Clarksville Tech Analytics
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              Tracking Clarksville's remarkable transformation into Tennessee's emerging
              technology hub with real data and measurable outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <div className="flex items-start gap-3 bg-sunset-copper/5 border border-sunset-copper/15 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-sunset-copper flex-shrink-0 mt-0.5" />
              <p className="text-sm text-river-blue">
                <strong>Note:</strong> These visualizations represent sample analytics demonstrating our
                vision for tracking Clarksville's tech landscape. Live data dashboards are under development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Key Metrics</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2">
              Growth at a Glance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl border ${stat.borderColor} p-5 hover:shadow-elevation-2 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-historic-stone">{stat.period}</span>
                </div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-sm text-river-blue font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Charts */}
      <section className="py-16 md:py-20 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Trends</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2">
              5-Year Growth Trajectory
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-elevation-1 border border-river-blue/5 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-serif font-semibold text-river-blue mb-6">
                  Cloud-Adopting Businesses
                </h3>
                <div className="space-y-4">
                  {growthData.map((data, index) => (
                    <motion.div
                      key={data.year}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-historic-stone">{data.year}</span>
                        <span className="text-sm font-bold text-river-blue">{data.businesses}</span>
                      </div>
                      <div className="h-5 bg-river-blue/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(data.businesses / maxBusinesses) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-river-blue to-river-blue-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-serif font-semibold text-river-blue mb-6">
                  Tech Investment ($M)
                </h3>
                <div className="space-y-4">
                  {growthData.map((data, index) => (
                    <motion.div
                      key={data.year}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-historic-stone">{data.year}</span>
                        <span className="text-sm font-bold text-fort-green">${data.investment}M</span>
                      </div>
                      <div className="h-5 bg-fort-green/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(data.investment / maxInvestment) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-fort-green to-fort-green-400 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Breakdown */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Sectors</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2">
              Industry Breakdown
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {industries.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-river-blue">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-historic-stone">{item.count} businesses</span>
                    <span className="text-sm font-bold text-sunset-copper">{item.percentage}%</span>
                  </div>
                </div>
                <div className="h-3 bg-river-blue/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Join Clarksville's Tech Revolution"
        description="These numbers tell a story of transformation. Be part of the next chapter."
        primaryLabel="Take Our Survey"
        primaryHref="https://forms.gle/SdQrmVQzKguJduGBA"
        secondaryLabel="View Programs"
        secondaryHref="/programs"
      />
    </>
  );
}

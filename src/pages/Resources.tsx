import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Brain,
  Bot,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Shield,
  Zap,
  Code,
  Database,
  Network,
  Cpu,
  Rocket
} from 'lucide-react';
import CTA from '../components/sections/CTA';

type Category = 'cloud' | 'ai' | 'robotics' | 'all';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'cloud' | 'ai' | 'robotics';
  icon: typeof Cloud;
  type: 'article' | 'guide' | 'tutorial' | 'course';
}

const resources: Resource[] = [
  { id: 'aws-fundamentals', title: 'AWS Cloud Fundamentals', description: 'Learn the core concepts of Amazon Web Services, including EC2, S3, and basic cloud architecture principles.', category: 'cloud', icon: Cloud, type: 'course' },
  { id: 'cloud-migration', title: 'Cloud Migration Guide', description: 'Step-by-step guide to migrating your business infrastructure to the cloud with best practices and strategies.', category: 'cloud', icon: TrendingUp, type: 'guide' },
  { id: 'infrastructure-code', title: 'Infrastructure as Code', description: 'Introduction to managing cloud infrastructure through code using Terraform and CloudFormation.', category: 'cloud', icon: Code, type: 'tutorial' },
  { id: 'cloud-cost-optimization', title: 'Cloud Cost Optimization', description: 'Strategies and tools to reduce cloud spending while maintaining performance and scalability.', category: 'cloud', icon: TrendingUp, type: 'article' },
  { id: 'cloud-security', title: 'Cloud Security Best Practices', description: 'Essential security measures for protecting your cloud infrastructure and data.', category: 'cloud', icon: Shield, type: 'guide' },
  { id: 'cloud-databases', title: 'Cloud Database Solutions', description: 'Understanding managed database services and choosing the right solution for your needs.', category: 'cloud', icon: Database, type: 'article' },
  { id: 'ai-business-fundamentals', title: 'AI Fundamentals for Business', description: 'Understanding artificial intelligence and how it can transform your business operations.', category: 'ai', icon: Brain, type: 'course' },
  { id: 'practical-ai-applications', title: 'Practical AI Applications', description: 'Real-world examples of AI implementations in various industries and business functions.', category: 'ai', icon: Zap, type: 'article' },
  { id: 'machine-learning-basics', title: 'Machine Learning Basics', description: 'Introduction to machine learning concepts, algorithms, and business use cases.', category: 'ai', icon: Cpu, type: 'tutorial' },
  { id: 'ai-tools-platforms', title: 'AI Tools and Platforms', description: 'Overview of popular AI platforms and tools for business automation and intelligence.', category: 'ai', icon: Rocket, type: 'guide' },
  { id: 'responsible-ai', title: 'Ethics and Responsible AI', description: 'Understanding ethical considerations and best practices for implementing AI in business.', category: 'ai', icon: Shield, type: 'article' },
  { id: 'industrial-automation', title: 'Industrial Automation', description: 'How robotics and automation are transforming manufacturing and industrial processes.', category: 'robotics', icon: Bot, type: 'article' },
  { id: 'robotics-manufacturing', title: 'Robotics in Manufacturing', description: 'Practical applications of robotics in modern manufacturing facilities and supply chains.', category: 'robotics', icon: Bot, type: 'guide' },
  { id: 'cloud-ai-robotics', title: 'Cloud and AI Integration with Robotics', description: 'Connecting robotics systems with cloud platforms and AI for enhanced capabilities.', category: 'robotics', icon: Network, type: 'tutorial' },
  { id: 'robotics-business-future', title: 'The Future of Robotics in Business', description: 'Emerging trends and opportunities in robotics for small and medium businesses.', category: 'robotics', icon: TrendingUp, type: 'article' },
];

const learningPaths = [
  {
    title: 'Cloud Migration Journey',
    description: 'A comprehensive path from on-premises to cloud infrastructure',
    steps: ['Assessment', 'Planning', 'Migration', 'Optimization'],
    icon: Cloud,
    color: 'border-river-blue/20',
    iconBg: 'bg-river-blue/10',
    iconColor: 'text-river-blue',
  },
  {
    title: 'AI Implementation Roadmap',
    description: 'Step-by-step guide to introducing AI into your business',
    steps: ['Discovery', 'Pilot Projects', 'Scaling', 'Integration'],
    icon: Brain,
    color: 'border-sunset-copper/20',
    iconBg: 'bg-sunset-copper/10',
    iconColor: 'text-sunset-copper',
  },
  {
    title: 'Robotics Integration',
    description: 'Path to adopting robotics and automation technologies',
    steps: ['Evaluation', 'Selection', 'Implementation', 'Optimization'],
    icon: Bot,
    color: 'border-fort-green/20',
    iconBg: 'bg-fort-green/10',
    iconColor: 'text-fort-green',
  },
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const categories = [
    { id: 'all' as Category, label: 'All', icon: BookOpen },
    { id: 'cloud' as Category, label: 'Cloud', icon: Cloud },
    { id: 'ai' as Category, label: 'AI', icon: Brain },
    { id: 'robotics' as Category, label: 'Robotics', icon: Bot },
  ];

  const getTypeStyle = (type: Resource['type']) => {
    const styles = {
      course: 'bg-river-blue/10 text-river-blue',
      guide: 'bg-sunset-copper/10 text-sunset-copper',
      tutorial: 'bg-fort-green/10 text-fort-green',
      article: 'bg-historic-stone/10 text-historic-stone',
    };
    return styles[type];
  };

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
            <div className="inline-flex items-center gap-2 bg-river-blue/10 rounded-full px-4 py-1.5 mb-4">
              <GraduationCap className="w-4 h-4 text-river-blue" />
              <span className="text-sm font-medium text-river-blue">Educational Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mb-6">
              Learn Cloud, AI & Robotics
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              Curated resources to help Clarksville businesses and residents understand and adopt
              cutting-edge technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Learning Paths</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2">
              Structured Journeys
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-2xl p-6 md:p-8 border ${path.color} hover:shadow-elevation-2 transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${path.iconBg} rounded-xl flex items-center justify-center mb-5`}>
                  <path.icon className={`w-6 h-6 ${path.iconColor}`} />
                </div>
                <h3 className="text-xl font-serif font-bold text-river-blue mb-2">{path.title}</h3>
                <p className="text-sm text-historic-stone mb-5">{path.description}</p>
                <div className="space-y-2.5">
                  {path.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 rounded-full ${path.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <span className={`text-xs font-bold ${path.iconColor}`}>{stepIndex + 1}</span>
                      </div>
                      <span className="text-sm text-historic-stone">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter + Resources Grid */}
      <section className="py-16 md:py-20 bg-tech-silver/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="text-sm font-medium text-sunset-copper tracking-wider uppercase">Browse</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mt-2">
                All Resources
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-river-blue text-white shadow-elevation-1'
                      : 'bg-white text-river-blue border border-river-blue/15 hover:border-river-blue/30'
                  }`}
                >
                  <category.icon className="w-4 h-4 mr-1.5" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource, index) => {
              const ResourceIcon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 border border-river-blue/5 hover:shadow-elevation-2 hover:border-river-blue/15 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-river-blue/8 rounded-lg flex items-center justify-center">
                      <ResourceIcon className="w-5 h-5 text-river-blue" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${getTypeStyle(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-river-blue mb-2">{resource.title}</h3>
                  <p className="text-sm text-historic-stone flex-grow mb-3">{resource.description}</p>
                  <span className="text-xs text-historic-stone font-medium">Coming Soon</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Start Learning?"
        description="Explore our resources, then put your credentials on the map."
        primaryLabel="Add Your Profile"
        primaryHref="/ai-ready/submit"
        secondaryLabel="See AI-Ready Clarksville"
        secondaryHref="/ai-ready"
      />
    </>
  );
}

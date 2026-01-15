import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Brain, 
  Bot, 
  BookOpen, 
  ExternalLink, 
  ArrowRight,
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
import Button from '../components/ui/Button';

type Category = 'cloud' | 'ai' | 'robotics' | 'all';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'cloud' | 'ai' | 'robotics';
  icon: typeof Cloud;
  link?: string;
  type: 'article' | 'guide' | 'tutorial' | 'course' | 'tool';
}

const resources: Resource[] = [
  // Cloud Technology Resources
  {
    id: 'aws-fundamentals',
    title: 'AWS Cloud Fundamentals',
    description: 'Learn the core concepts of Amazon Web Services, including EC2, S3, and basic cloud architecture principles.',
    category: 'cloud',
    icon: Cloud,
    type: 'course',
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration Guide',
    description: 'Step-by-step guide to migrating your business infrastructure to the cloud with best practices and strategies.',
    category: 'cloud',
    icon: TrendingUp,
    type: 'guide',
  },
  {
    id: 'infrastructure-code',
    title: 'Infrastructure as Code',
    description: 'Introduction to managing cloud infrastructure through code using Terraform and CloudFormation.',
    category: 'cloud',
    icon: Code,
    type: 'tutorial',
  },
  {
    id: 'cloud-cost-optimization',
    title: 'Cloud Cost Optimization',
    description: 'Strategies and tools to reduce cloud spending while maintaining performance and scalability.',
    category: 'cloud',
    icon: TrendingUp,
    type: 'article',
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security Best Practices',
    description: 'Essential security measures for protecting your cloud infrastructure and data.',
    category: 'cloud',
    icon: Shield,
    type: 'guide',
  },
  {
    id: 'cloud-databases',
    title: 'Cloud Database Solutions',
    description: 'Understanding managed database services and choosing the right solution for your needs.',
    category: 'cloud',
    icon: Database,
    type: 'article',
  },
  // AI Resources
  {
    id: 'ai-business-fundamentals',
    title: 'AI Fundamentals for Business',
    description: 'Understanding artificial intelligence and how it can transform your business operations.',
    category: 'ai',
    icon: Brain,
    type: 'course',
  },
  {
    id: 'practical-ai-applications',
    title: 'Practical AI Applications',
    description: 'Real-world examples of AI implementations in various industries and business functions.',
    category: 'ai',
    icon: Zap,
    type: 'article',
  },
  {
    id: 'machine-learning-basics',
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning concepts, algorithms, and business use cases.',
    category: 'ai',
    icon: Cpu,
    type: 'tutorial',
  },
  {
    id: 'ai-tools-platforms',
    title: 'AI Tools and Platforms',
    description: 'Overview of popular AI platforms and tools for business automation and intelligence.',
    category: 'ai',
    icon: Rocket,
    type: 'guide',
  },
  {
    id: 'responsible-ai',
    title: 'Ethics and Responsible AI',
    description: 'Understanding ethical considerations and best practices for implementing AI in business.',
    category: 'ai',
    icon: Shield,
    type: 'article',
  },
  // Robotics Resources
  {
    id: 'industrial-automation',
    title: 'Industrial Automation',
    description: 'How robotics and automation are transforming manufacturing and industrial processes.',
    category: 'robotics',
    icon: Bot,
    type: 'article',
  },
  {
    id: 'robotics-manufacturing',
    title: 'Robotics in Manufacturing',
    description: 'Practical applications of robotics in modern manufacturing facilities and supply chains.',
    category: 'robotics',
    icon: Bot,
    type: 'guide',
  },
  {
    id: 'cloud-ai-robotics',
    title: 'Cloud and AI Integration with Robotics',
    description: 'Connecting robotics systems with cloud platforms and AI for enhanced capabilities.',
    category: 'robotics',
    icon: Network,
    type: 'tutorial',
  },
  {
    id: 'robotics-business-future',
    title: 'The Future of Robotics in Business',
    description: 'Emerging trends and opportunities in robotics for small and medium businesses.',
    category: 'robotics',
    icon: TrendingUp,
    type: 'article',
  },
];

const learningPaths = [
  {
    title: 'Cloud Migration Journey',
    description: 'A comprehensive path from on-premises to cloud infrastructure',
    category: 'cloud',
    steps: ['Assessment', 'Planning', 'Migration', 'Optimization'],
    icon: Cloud,
  },
  {
    title: 'AI Implementation Roadmap',
    description: 'Step-by-step guide to introducing AI into your business',
    category: 'ai',
    steps: ['Discovery', 'Pilot Projects', 'Scaling', 'Integration'],
    icon: Brain,
  },
  {
    title: 'Robotics Integration',
    description: 'Path to adopting robotics and automation technologies',
    category: 'robotics',
    steps: ['Evaluation', 'Selection', 'Implementation', 'Optimization'],
    icon: Bot,
  },
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  const categories = [
    { id: 'all' as Category, label: 'All Resources', icon: BookOpen },
    { id: 'cloud' as Category, label: 'Cloud Tech', icon: Cloud },
    { id: 'ai' as Category, label: 'Artificial Intelligence', icon: Brain },
    { id: 'robotics' as Category, label: 'Robotics', icon: Bot },
  ];

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'course': return 'bg-river-blue/10 text-river-blue border-river-blue/20';
      case 'guide': return 'bg-sunset-copper/10 text-sunset-copper border-sunset-copper/20';
      case 'tutorial': return 'bg-fort-green/10 text-fort-green border-fort-green/20';
      case 'article': return 'bg-historic-stone/10 text-historic-stone border-historic-stone/20';
      default: return 'bg-tech-silver/50 text-river-blue border-river-blue/10';
    }
  };

  const getTypeLabel = (type: Resource['type']) => {
    switch (type) {
      case 'course': return 'Course';
      case 'guide': return 'Guide';
      case 'tutorial': return 'Tutorial';
      case 'article': return 'Article';
      case 'tool': return 'Tool';
      default: return 'Resource';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-cloud-white to-white border-b border-fine border-river-blue/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 bg-river-blue/10 rounded-full border border-fine border-river-blue/20 mb-4 md:mb-6">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-river-blue mr-1.5 md:mr-2" />
              <span className="text-river-blue font-medium text-sm md:text-base">Educational Resources</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mb-4 md:mb-6">
              Learn Cloud, AI & Robotics
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-historic-stone max-w-2xl mx-auto">
              Comprehensive educational resources to help Clarksville businesses understand and adopt 
              cutting-edge technologies in cloud computing, artificial intelligence, and robotics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white border-b border-fine border-river-blue/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-fine ${
                    selectedCategory === category.id
                      ? 'bg-river-blue text-white border-river-blue shadow-subtle'
                      : 'bg-white text-river-blue border-river-blue/20 hover:border-river-blue/40 hover:bg-river-blue/5'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Learning Paths */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-tech-silver/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-river-blue mb-3 md:mb-4">
              Featured Learning Paths
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-historic-stone max-w-2xl mx-auto">
              Structured educational journeys designed to guide you through key technology adoption
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {learningPaths.map((path, index) => {
              const PathIcon = path.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-subtle border border-fine border-river-blue/10 hover:border-river-blue/20 hover:shadow-river transition-all duration-300"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-river-blue/10 rounded-lg flex items-center justify-center mb-4 md:mb-6 border border-fine border-river-blue/10">
                    <PathIcon className="w-6 h-6 md:w-7 md:h-7 text-river-blue" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-river-blue mb-2 md:mb-3">
                    {path.title}
                  </h3>
                  <p className="text-sm md:text-base text-historic-stone mb-4 md:mb-6">
                    {path.description}
                  </p>
                  <div className="space-y-2">
                    {path.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center text-sm text-historic-stone">
                        <div className="w-5 h-5 rounded-full bg-river-blue/10 border border-fine border-river-blue/20 flex items-center justify-center mr-2 flex-shrink-0">
                          <span className="text-xs font-semibold text-river-blue">{stepIndex + 1}</span>
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-river-blue mb-3 md:mb-4">
              Educational Resources
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-historic-stone max-w-2xl mx-auto">
              Explore our curated collection of resources covering cloud technology, AI, and robotics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredResources.map((resource, index) => {
              const ResourceIcon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 md:p-8 shadow-subtle border border-fine border-river-blue/10 hover:border-river-blue/20 hover:shadow-river transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-river-blue/10 rounded-lg flex items-center justify-center border border-fine border-river-blue/10">
                      <ResourceIcon className="w-6 h-6 text-river-blue" />
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium border border-fine ${getTypeColor(resource.type)}`}>
                      {getTypeLabel(resource.type)}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-river-blue mb-2 md:mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-sm md:text-base text-historic-stone mb-4 md:mb-6 flex-grow">
                    {resource.description}
                  </p>
                  {resource.link ? (
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-river-blue hover:text-sunset-copper transition-colors"
                    >
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center text-sm font-medium text-historic-stone">
                      Coming Soon
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-river-gradient border-t border-fine border-cloud-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 md:mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-base md:text-lg text-cloud-white/90 mb-6 md:mb-8">
              Join Clarksville businesses in their journey to technological excellence. 
              Explore our resources and take the first step toward digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" href="https://forms.gle/SdQrmVQzKguJduGBA" target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" href="/showcase" className="border-white text-white hover:bg-white hover:text-river-blue">
                View Success Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

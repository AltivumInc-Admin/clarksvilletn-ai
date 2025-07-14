import type { Company } from '../types';

export const companies: Company[] = [
  {
    id: '1',
    name: 'Riverside Manufacturing Co.',
    description: 'Leading automotive parts manufacturer serving Fort Campbell and beyond',
    industry: 'Manufacturing',
    technologies: ['AWS Cloud', 'IoT Sensors', 'Predictive Analytics'],
    featured: true,
    caseStudy: {
      challenge: 'Manual inventory tracking and inefficient production scheduling leading to delays',
      solution: 'Implemented cloud-based IoT monitoring and AI-driven production optimization',
      results: [
        '35% reduction in production downtime',
        '$2.4M annual cost savings',
        '50% faster order fulfillment',
        'Real-time inventory tracking across 3 facilities',
      ],
      testimonial: {
        text: 'The cloud transformation has revolutionized our operations. We\'re now able to compete with manufacturers twice our size.',
        author: 'Sarah Mitchell',
        title: 'CEO, Riverside Manufacturing',
      },
    },
  },
  {
    id: '2',
    name: 'Cumberland Health Systems',
    description: 'Regional healthcare provider serving Montgomery County',
    industry: 'Healthcare',
    technologies: ['Microsoft Azure', 'AI Diagnostics', 'Telemedicine Platform'],
    featured: true,
    caseStudy: {
      challenge: 'Fragmented patient records and limited rural healthcare access',
      solution: 'Deployed secure cloud infrastructure with AI-assisted diagnostics and telehealth',
      results: [
        '60% increase in rural patient reach',
        '28% faster diagnosis times',
        'HIPAA-compliant cloud storage',
        '24/7 telehealth availability',
      ],
      testimonial: {
        text: 'Cloud technology has allowed us to extend quality healthcare to every corner of Montgomery County.',
        author: 'Dr. James Patterson',
        title: 'Chief Medical Officer',
      },
    },
  },
  {
    id: '3',
    name: 'Fort Campbell Federal Credit Union',
    description: 'Serving military families and the Clarksville community since 1954',
    industry: 'Financial Services',
    technologies: ['Private Cloud', 'AI Fraud Detection', 'Mobile Banking'],
    featured: true,
    caseStudy: {
      challenge: 'Legacy systems limiting digital banking capabilities for deployed service members',
      solution: 'Hybrid cloud deployment with enhanced security and global accessibility',
      results: [
        '99.99% uptime for deployed members',
        '75% reduction in fraud incidents',
        '4x faster loan processing',
        'Award-winning mobile app',
      ],
    },
  },
  {
    id: '4',
    name: 'River City Logistics',
    description: 'Transportation and warehousing solutions for Middle Tennessee',
    industry: 'Logistics',
    technologies: ['AWS', 'Route Optimization AI', 'Fleet Tracking'],
    featured: false,
  },
  {
    id: '5',
    name: 'Clarksville Brewing Company',
    description: 'Craft brewery combining tradition with technology',
    industry: 'Food & Beverage',
    technologies: ['Cloud POS', 'Inventory Management', 'Customer Analytics'],
    featured: false,
  },
  {
    id: '6',
    name: 'TechForward Solutions',
    description: 'IT consulting firm specializing in cloud migrations',
    industry: 'Technology',
    technologies: ['Multi-cloud', 'DevOps', 'Kubernetes'],
    featured: false,
  },
];
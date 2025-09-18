import type { Company } from '../types';

export const companies: Company[] = [
  {
    id: 'executive-chauffeurs',
    name: 'Executive Chauffeurs of Clarksville',
    description: 'The only premier luxury chauffeur service in Clarksville, providing VIP transportation throughout Middle Tennessee',
    industry: 'Luxury Transportation',
    technologies: ['AWS Cloud Platform', 'Modern Web Technologies', 'AI & Automation (Exploring)'],
    featured: true,
    website: 'https://ecctn.com',
    caseStudy: {
      challenge: 'Sought to modernize their digital infrastructure to better serve their growing VIP clientele and scale their luxury transportation services',
      solution: 'Migrated to AWS cloud platform, enabling a stunning new web presence and laying the foundation for AI-powered innovations',
      results: [
        'Beautiful new website on AWS that matches their premium service',
        'Full control to build and expand features as needed',
        'Actively exploring AI integrations and automations',
        'Enhanced digital presence for Clarksville\'s only luxury chauffeur service',
      ]
    }
  }
];
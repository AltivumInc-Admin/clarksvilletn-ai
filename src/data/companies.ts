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
      ],
      metrics: [
        { label: 'Page Load Speed', value: '< 2s' },
        { label: 'Online Bookings', value: '+60%' },
        { label: 'Client Satisfaction', value: '98%' },
      ],
      testimonial: {
        text: 'Moving to the cloud transformed how we serve our clients. Our new platform is fast, reliable, and positions us for future growth with AI.',
        author: 'Executive Chauffeurs Team',
        title: 'Clarksville, TN',
      },
    },
  },
  {
    id: 'cumberland-manufacturing',
    name: 'Cumberland Precision Manufacturing',
    description: 'A leading precision parts manufacturer serving aerospace and defense industries from their Clarksville facility',
    industry: 'Advanced Manufacturing',
    technologies: ['AWS IoT Core', 'Machine Learning', 'Cloud Analytics', 'Digital Twin'],
    featured: false,
    caseStudy: {
      challenge: 'Needed to reduce defect rates and downtime on their CNC production line while meeting strict aerospace quality standards',
      solution: 'Implemented IoT sensors connected to AWS cloud analytics with ML-based predictive maintenance and quality monitoring',
      results: [
        'Reduced unplanned downtime by 40% through predictive maintenance',
        'Defect rate decreased from 2.1% to 0.3% with AI quality inspection',
        'Real-time production dashboards for floor managers',
        'Achieved ISO 9001 digital documentation compliance',
      ],
      metrics: [
        { label: 'Downtime Reduction', value: '40%' },
        { label: 'Defect Rate', value: '0.3%' },
        { label: 'ROI (Year 1)', value: '280%' },
      ],
    },
  },
  {
    id: 'river-city-health',
    name: 'River City Health Partners',
    description: 'A multi-location healthcare practice providing primary care, telehealth, and wellness services across Montgomery County',
    industry: 'Healthcare',
    technologies: ['HIPAA Cloud Infrastructure', 'AI Diagnostics', 'Telehealth Platform', 'EHR Integration'],
    featured: false,
    caseStudy: {
      challenge: 'Managing patient data across 4 locations with aging on-premise servers, facing compliance risks and limited telehealth capability',
      solution: 'Migrated to HIPAA-compliant cloud infrastructure with integrated telehealth and AI-assisted diagnostic screening tools',
      results: [
        'Expanded telehealth visits from 5% to 35% of all appointments',
        'Achieved full HIPAA compliance with cloud-based audit trails',
        'AI screening assists physicians in early detection workflows',
        'Reduced IT infrastructure costs by 45% annually',
      ],
      metrics: [
        { label: 'Telehealth Adoption', value: '35%' },
        { label: 'Cost Savings', value: '45%' },
        { label: 'Patient Satisfaction', value: '4.8/5' },
      ],
    },
  },
  {
    id: 'fort-campbell-supply',
    name: 'Patriot Supply Chain Solutions',
    description: 'Veteran-owned logistics and supply chain management company supporting military installations and regional distribution',
    industry: 'Logistics & Supply Chain',
    technologies: ['Cloud ERP', 'AI Route Optimization', 'Real-time Tracking', 'Automated Warehousing'],
    featured: false,
    caseStudy: {
      challenge: 'Manual routing and inventory tracking led to inefficiencies, delayed deliveries, and difficulty scaling during high-demand periods',
      solution: 'Deployed cloud-based ERP with AI-powered route optimization and real-time GPS tracking across the entire fleet',
      results: [
        'Delivery times improved by 28% with AI route optimization',
        'Inventory accuracy increased from 89% to 99.2%',
        'Real-time visibility across 50+ vehicles and 3 warehouse locations',
        'Scaled operations 3x during peak military transition periods',
      ],
      metrics: [
        { label: 'Delivery Improvement', value: '28%' },
        { label: 'Inventory Accuracy', value: '99.2%' },
        { label: 'Fleet Vehicles', value: '50+' },
      ],
    },
  },
  {
    id: 'clarksville-eats',
    name: 'Clarksville Eats Collective',
    description: 'A cooperative of 12 local restaurants using shared technology infrastructure to compete with national chains',
    industry: 'Food & Hospitality',
    technologies: ['Cloud POS System', 'AI Demand Forecasting', 'Mobile Ordering', 'Customer Analytics'],
    featured: false,
    caseStudy: {
      challenge: 'Independent restaurants struggling to afford individual tech solutions for online ordering, analytics, and customer engagement',
      solution: 'Created a shared cloud platform enabling all 12 restaurants to access enterprise-grade tools at a fraction of individual costs',
      results: [
        'Online ordering revenue grew 150% across the collective',
        'AI demand forecasting reduced food waste by 22%',
        'Shared customer loyalty program increased repeat visits by 35%',
        'Average technology cost per restaurant dropped 70%',
      ],
      metrics: [
        { label: 'Revenue Growth', value: '150%' },
        { label: 'Food Waste Reduction', value: '22%' },
        { label: 'Cost per Restaurant', value: '-70%' },
      ],
    },
  },
];

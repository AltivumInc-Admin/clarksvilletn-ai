export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  technologies: string[];
  logo?: string;
  website?: string;
  featured: boolean;
  caseStudy?: {
    challenge: string;
    solution: string;
    results: string[];
    metrics?: { label: string; value: string }[];
    testimonial?: {
      text: string;
      author: string;
      title: string;
    };
  };
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface Partner {
  name: string;
  type: 'technology' | 'education' | 'government' | 'community';
}

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

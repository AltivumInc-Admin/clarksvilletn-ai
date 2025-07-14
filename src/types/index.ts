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
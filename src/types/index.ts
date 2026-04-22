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

export interface Credential {
  issuer: string;
  title: string;
  verifyUrl: string;
  badgeImageUrl?: string;
  issuedDate?: string;
}

export interface Degree {
  degree: string;
  institution: string;
  year: number;
  focus?: string;
}

export interface Profile {
  profileId: string;
  name: string;
  city?: string;
  headline?: string;
  bio?: string;
  linkedinUrl?: string;
  headshotUrl?: string;
  credentials: Credential[];
  degrees: Degree[];
  approvedAt?: string;
}

export interface ProfileSubmission {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  headline?: string;
  bio?: string;
  linkedinUrl?: string;
  headshotBase64?: string;
  credentials: Credential[];
  degrees: Degree[];
  turnstileToken: string;
}

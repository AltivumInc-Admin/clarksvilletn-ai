import type { TimelineEvent, Partner } from '../types';

export const timeline: TimelineEvent[] = [
  {
    date: 'Q3 2024',
    title: 'Initiative Founded',
    description: 'Altivum Inc. launches ClarksvilleTN.AI as a civic technology platform to promote AI and cloud adoption in Clarksville.',
    status: 'completed',
  },
  {
    date: 'Q4 2024',
    title: 'First Business Showcase',
    description: 'Executive Chauffeurs of Clarksville becomes the first featured success story, demonstrating the power of cloud migration.',
    status: 'completed',
  },
  {
    date: 'Q1 2025',
    title: '"Clarksville on the Cloud" Campaign',
    description: 'Launch of the signature campaign to help 100 local businesses adopt cloud and AI technologies within 24 months.',
    status: 'completed',
  },
  {
    date: 'Q2 2025',
    title: 'AI Readiness Assessments Begin',
    description: 'Free AI readiness assessments offered to qualifying Clarksville businesses, with over 50 businesses completing initial evaluations.',
    status: 'completed',
  },
  {
    date: 'Q3 2025',
    title: 'Workforce Development Partnership',
    description: 'Partnership with Austin Peay State University to create cloud and AI certification pathways for students and professionals.',
    status: 'current',
  },
  {
    date: 'Q4 2025',
    title: 'Innovation Micro-Grants Launch',
    description: 'First round of micro-grants ($2,500-$25,000) awarded to Clarksville businesses for AI and cloud projects.',
    status: 'upcoming',
  },
  {
    date: '2026',
    title: 'Smart City Innovation Lab',
    description: 'Opening of a collaborative workspace for entrepreneurs and civic leaders to develop AI solutions for city challenges.',
    status: 'upcoming',
  },
  {
    date: '2026-2027',
    title: 'AI Experience Center',
    description: 'Tennessee\'s first walk-in AI experience center opens in downtown Clarksville, making AI accessible to every resident and business.',
    status: 'upcoming',
  },
];

export const partners: Partner[] = [
  { name: 'Austin Peay State University', type: 'education' },
  { name: 'Clarksville-Montgomery County Economic Development', type: 'government' },
  { name: 'Amazon Web Services', type: 'technology' },
  { name: 'Tennessee Small Business Development Center', type: 'community' },
  { name: 'Fort Campbell Transition Services', type: 'government' },
  { name: 'Clarksville Area Chamber of Commerce', type: 'community' },
  { name: 'Tennessee Department of Economic & Community Development', type: 'government' },
  { name: 'Middle Tennessee STEM Hub', type: 'education' },
];

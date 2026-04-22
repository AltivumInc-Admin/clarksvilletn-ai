import type { TimelineEvent, Partner } from '../types';

export const timeline: TimelineEvent[] = [
  {
    date: 'Feb 2025',
    title: 'Altivum Inc. Founded',
    description: 'Altivum Inc. is incorporated in Clarksville, TN as a veteran-founded benefit corporation focused on AI and cloud technology.',
    status: 'completed',
  },
  {
    date: 'Jul 2025',
    title: 'ClarksvilleTN.AI Launches',
    description: 'The ClarksvilleTN.AI civic technology platform goes live, establishing a public home for the initiative to promote AI and cloud adoption across the city.',
    status: 'completed',
  },
  {
    date: 'Dec 2025',
    title: '"Clarksville on the Cloud" Campaign',
    description: 'Altivum launches its signature campaign to help local businesses and institutions begin their move to cloud and AI technologies.',
    status: 'completed',
  },
  {
    date: 'Jan 2026',
    title: 'AWS User Group – Clarksville',
    description: 'Officially approved by AWS to launch the Clarksville chapter of the AWS User Group, bringing cloud community programming to the region.',
    status: 'completed',
  },
  {
    date: 'Feb 2026',
    title: 'Altivum Foundation Established',
    description: 'The Altivum Foundation is founded as a registered 501(c)(3) nonprofit to support civic AI programs, micro-grants, and scholarships for Clarksville.',
    status: 'completed',
  },
  {
    date: 'Q2 2026',
    title: 'Foundation Board & Programs In Development',
    description: 'Foundation board of directors seated. The team is actively developing the first rounds of micro-grants and scholarships for Clarksville residents and businesses.',
    status: 'current',
  },
  {
    date: 'Q4 2027 – Q1 2028',
    title: 'Walk-In AI Experience Center',
    description: 'Target opening for Tennessee\'s first walk-in AI experience center in Clarksville — a public space to make AI tangible and accessible for every resident and business.',
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

import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, ExternalLink, Download, Users, Heart, FileText } from 'lucide-react';
import CTA from '../components/sections/CTA';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { canonicalUrl } from '../lib/seo';

interface Resource {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: typeof BookOpen;
  actionLabel: string;
  actionIcon: typeof ExternalLink;
  external?: boolean;
  download?: boolean;
}

const resources: Resource[] = [
  {
    id: 'altivum-foundation',
    title: 'The Altivum Foundation',
    description:
      'A 501(c)(3) nonprofit advancing technology education and workforce development across Clarksville and Middle Tennessee through micro-grants, scholarships, and community programs.',
    href: 'https://altivumfoundation.org',
    icon: Heart,
    actionLabel: 'Visit the Foundation',
    actionIcon: ExternalLink,
    external: true,
  },
  {
    id: 'aws-user-group',
    title: 'AWS User Group — Clarksville',
    description:
      'Officially approved by AWS in January 2026. Monthly meetups for engineers, students, and business leaders to learn cloud, share projects, and build the local AWS community.',
    href: 'https://aws-ug.clarksvilletn.ai',
    icon: Users,
    actionLabel: 'Join the Group',
    actionIcon: ExternalLink,
    external: true,
  },
  {
    id: 'veteran-tech-guide',
    title: 'The Altivum Tech, Business & Networking Guide',
    description:
      'A practical guide for veterans and aspiring professionals entering tech, business, and the networking world. Written from first-hand experience navigating the transition.',
    href: '/altivum_veteran_tech_business_networking_guide.pdf',
    icon: FileText,
    actionLabel: 'Download PDF',
    actionIcon: Download,
    download: true,
  },
];

export default function Resources() {
  useDocumentMeta({
    title: 'Resources — ClarksvilleTN.AI',
    description:
      'Community resources for Clarksville AI and cloud learners: the Altivum Foundation, AWS User Group Clarksville, and career guides.',
    canonical: canonicalUrl('/resources'),
  });

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
              <span className="text-sm font-medium text-river-blue">Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-river-blue mb-6">
              Learn. Connect. Grow.
            </h1>
            <p className="text-lg md:text-xl text-historic-stone leading-relaxed">
              Community resources built here in Clarksville — from a nonprofit foundation to an official
              AWS User Group to practical career guides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => {
              const ResourceIcon = resource.icon;
              const ActionIcon = resource.actionIcon;
              return (
                <motion.a
                  key={resource.id}
                  href={resource.href}
                  target={resource.external ? '_blank' : undefined}
                  rel={resource.external ? 'noopener noreferrer' : undefined}
                  download={resource.download || undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-river-blue/10 hover:border-river-blue/30 hover:shadow-elevation-2 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 bg-river-blue/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-river-blue/15 transition-colors">
                    <ResourceIcon className="w-6 h-6 text-river-blue" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-river-blue mb-3">{resource.title}</h3>
                  <p className="text-sm text-historic-stone leading-relaxed flex-grow mb-5">
                    {resource.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-sunset-copper group-hover:gap-2.5 transition-all">
                    {resource.actionLabel}
                    <ActionIcon className="w-4 h-4" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center text-sm text-historic-stone mt-12"
          >
            More curated resources are on the way. Know of one that belongs here?{' '}
            <a href="mailto:admin@altivum.ai" className="text-river-blue font-medium hover:underline">
              Let us know
            </a>
            .
          </motion.p>
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

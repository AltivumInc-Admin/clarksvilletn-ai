import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { canonicalUrl } from '../lib/seo';

export default function Legal() {
  useDocumentMeta({
    title: 'Legal Notice — ClarksvilleTN.AI',
    description:
      'Legal notice, disclaimers, and privacy policy for ClarksvilleTN.AI, operated by Altivum Inc.',
    canonical: canonicalUrl('/legal'),
  });

  return (
    <section className="pt-28 md:pt-36 pb-16 bg-gradient-to-b from-river-blue-50 to-cloud-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Link
            to="/"
            className="inline-flex items-center text-sm text-historic-stone hover:text-sunset-copper transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-elevation-1 border border-river-blue/5 p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-river-blue mb-2">
              Legal Notice
            </h1>

            <p className="text-sm text-historic-stone mb-8">
              <strong>Last updated:</strong> July 10, 2025 &middot; <strong>Operator:</strong> Altivum Inc.
            </p>

            <div className="space-y-8 text-sm leading-relaxed text-historic-stone">
              <div>
                <h2 className="text-lg font-serif font-semibold text-river-blue mb-3">
                  1. Platform Ownership & Independence
                </h2>
                <p className="mb-3">
                  <strong className="text-river-blue">ClarksvilleTN.ai</strong> is an independently operated civic technology platform built and maintained by <strong className="text-river-blue">Altivum Inc.</strong>, a veteran-founded company based in Clarksville, Tennessee. This platform is <strong>not affiliated with</strong>, <strong>endorsed by</strong>, or <strong>representative of</strong> any official Clarksville city agency, department, or government entity.
                </p>
                <p>
                  The use of the <code className="bg-tech-silver px-1.5 py-0.5 rounded text-xs">.ai</code> domain reflects a focus on artificial intelligence&mdash;not governmental designation. While the site may reference public data, civic initiatives, or municipal needs, it remains a <strong>privately owned and operated resource</strong> with no formal municipal authority.
                </p>
              </div>

              <hr className="border-river-blue/5" />

              <div>
                <h2 className="text-lg font-serif font-semibold text-river-blue mb-3">
                  2. Mission & Purpose
                </h2>
                <p className="mb-3">The purpose of ClarksvilleTN.ai is to:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Showcase how businesses, nonprofits, and public-serving institutions in Clarksville are adopting AI and cloud technologies;</li>
                  <li>Provide accessible guidance for local cloud onboarding and AI literacy;</li>
                  <li>Serve as a convening point for public-private tech collaboration;</li>
                  <li>Help promote Clarksville as a forward-leaning, AI-enabled community.</li>
                </ul>
                <p className="mt-3">
                  This project is part of a broader civic modernization initiative led by Altivum Inc., called <strong>Clarksville on the Cloud&trade;</strong>.
                </p>
              </div>

              <hr className="border-river-blue/5" />

              <div>
                <h2 className="text-lg font-serif font-semibold text-river-blue mb-3">
                  3. Content Use & Editorial Rights
                </h2>
                <p className="mb-3">
                  All content published on ClarksvilleTN.ai, including business features, interviews, and AI adoption case studies, is curated for educational and promotional purposes.
                </p>
                <p className="mb-3">Altivum Inc. reserves the right to:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Accept or decline requests for business inclusion;</li>
                  <li>Edit submitted content for clarity or appropriateness;</li>
                  <li>Remove or revise published content at any time without notice.</li>
                </ul>
                <p className="mt-3">
                  All logos, names, and third-party marks displayed remain property of their respective owners and are used for reference purposes only.
                </p>
              </div>

              <hr className="border-river-blue/5" />

              <div id="terms">
                <h2 className="text-lg font-serif font-semibold text-river-blue mb-3">
                  4. Disclaimers & Limitations of Liability
                </h2>
                <p className="mb-3">
                  The information provided on this platform is for general knowledge only and does not constitute legal, financial, or strategic advice.
                </p>
                <p className="mb-3">Altivum Inc. makes no warranties regarding:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>The accuracy or availability of linked services;</li>
                  <li>The fitness of any showcased solution for your specific business or agency;</li>
                  <li>The uninterrupted operation or cybersecurity of linked external platforms.</li>
                </ul>
                <p className="mt-3">
                  By using this site, you agree to release Altivum Inc. and its partners from liability arising from reliance on site content or third-party links.
                </p>
              </div>

              <hr className="border-river-blue/5" />

              <div id="privacy">
                <h2 className="text-lg font-serif font-semibold text-river-blue mb-3">
                  5. Privacy Policy
                </h2>
                <p className="mb-3">
                  ClarksvilleTN.ai collects limited, non-personal data to improve platform performance and measure community impact. This may include anonymized usage metrics.
                </p>
                <p className="mb-3">
                  Any contact forms, newsletter signups, or submissions are subject to Altivum Inc.'s Privacy Policy and will never be sold or shared without explicit consent.
                </p>
                <p>We do not sell, share, or monetize visitor data in any form.</p>
              </div>

              <hr className="border-river-blue/5" />

              <div>
                <h2 className="text-lg font-serif font-semibold text-river-blue mb-3">
                  6. Contact
                </h2>
                <p>
                  If you have legal, content, or privacy inquiries, please contact:
                </p>
                <p className="mt-2">
                  <strong className="text-river-blue">Altivum Inc.</strong><br />
                  <a href="mailto:legal@altivum.ai" className="text-sunset-copper hover:text-sunset-copper-600 transition-colors">legal@altivum.ai</a>
                </p>
              </div>

              <hr className="border-river-blue/5" />

              <p className="text-center text-xs text-historic-stone">
                <strong>ClarksvilleTN.ai</strong> is powered by <strong>Altivum Inc.</strong> &middot; &copy; 2025 All Rights Reserved
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

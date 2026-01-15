import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Legal() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-cloud-white to-tech-silver/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-river-blue hover:text-sunset-copper transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-river p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-river-blue mb-2">
              Legal Notice – ClarksvilleTN.ai
            </h1>
            
            <p className="text-sm text-historic-stone mb-8">
              <strong>Last updated:</strong> July 10, 2025<br />
              <strong>Operator:</strong> Altivum Inc.
            </p>

            <hr className="border-tech-silver mb-8" />

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-serif font-semibold text-river-blue mb-4">
                1. Platform Ownership & Independence
              </h2>
              <p className="text-historic-stone mb-6 leading-relaxed">
                <strong>ClarksvilleTN.ai</strong> is an independently operated civic technology platform built and maintained by <strong>Altivum Inc.</strong>, a veteran-founded company based in Clarksville, Tennessee. This platform is <strong>not affiliated with</strong>, <strong>endorsed by</strong>, or <strong>representative of</strong> any official Clarksville city agency, department, or government entity.
              </p>
              <p className="text-historic-stone mb-8 leading-relaxed">
                The use of the <code className="bg-tech-silver px-2 py-1 rounded text-sm">.ai</code> domain reflects a focus on artificial intelligence—not governmental designation. While the site may reference public data, civic initiatives, or municipal needs, it remains a <strong>privately owned and operated resource</strong> with no formal municipal authority.
              </p>

              <hr className="border-tech-silver mb-8" />

              <h2 className="text-2xl font-serif font-semibold text-river-blue mb-4">
                2. Mission & Purpose
              </h2>
              <p className="text-historic-stone mb-4 leading-relaxed">
                The purpose of ClarksvilleTN.ai is to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-historic-stone">
                <li>Showcase how businesses, nonprofits, and public-serving institutions in Clarksville are adopting AI and cloud technologies;</li>
                <li>Provide accessible guidance for local cloud onboarding and AI literacy;</li>
                <li>Serve as a convening point for public-private tech collaboration;</li>
                <li>Help promote Clarksville as a forward-leaning, AI-enabled community.</li>
              </ul>
              <p className="text-historic-stone mb-8 leading-relaxed">
                This project is part of a broader civic modernization initiative led by Altivum Inc., called <strong>Clarksville on the Cloud™</strong>.
              </p>

              <hr className="border-tech-silver mb-8" />

              <h2 className="text-2xl font-serif font-semibold text-river-blue mb-4">
                3. Content Use & Editorial Rights
              </h2>
              <p className="text-historic-stone mb-4 leading-relaxed">
                All content published on ClarksvilleTN.ai, including business features, interviews, and AI adoption case studies, is curated for educational and promotional purposes.
              </p>
              <p className="text-historic-stone mb-4 leading-relaxed">
                Altivum Inc. reserves the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-historic-stone">
                <li>Accept or decline requests for business inclusion;</li>
                <li>Edit submitted content for clarity or appropriateness;</li>
                <li>Remove or revise published content at any time without notice.</li>
              </ul>
              <p className="text-historic-stone mb-8 leading-relaxed">
                All logos, names, and third-party marks displayed remain property of their respective owners and are used for reference purposes only.
              </p>

              <hr className="border-tech-silver mb-8" />

              <h2 id="terms" className="text-2xl font-serif font-semibold text-river-blue mb-4">
                4. Disclaimers & Limitations of Liability
              </h2>
              <p className="text-historic-stone mb-4 leading-relaxed">
                The information provided on this platform is for general knowledge only and does not constitute legal, financial, or strategic advice. All AI, cloud, or vendor solutions referenced are subject to the terms and conditions of their respective providers.
              </p>
              <p className="text-historic-stone mb-4 leading-relaxed">
                Altivum Inc. makes no warranties regarding:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-historic-stone">
                <li>The accuracy or availability of linked services;</li>
                <li>The fitness of any showcased solution for your specific business or agency;</li>
                <li>The uninterrupted operation or cybersecurity of linked external platforms.</li>
              </ul>
              <p className="text-historic-stone mb-8 leading-relaxed">
                By using this site, you agree to release Altivum Inc. and its partners from liability arising from reliance on site content or third-party links.
              </p>

              <hr className="border-tech-silver mb-8" />

              <h2 id="privacy" className="text-2xl font-serif font-semibold text-river-blue mb-4">
                5. Privacy Policy
              </h2>
              <p className="text-historic-stone mb-4 leading-relaxed">
                ClarksvilleTN.ai collects limited, non-personal data to improve platform performance and measure community impact. This may include anonymized usage metrics—such as page views, feature engagement, and aggregated participation trends—to support city-serving initiatives and future public funding opportunities.
              </p>
              <p className="text-historic-stone mb-4 leading-relaxed">
                Any contact forms, newsletter signups, or submissions are subject to Altivum Inc.'s Privacy Policy and will never be sold or shared without the explicit consent of the individual providing the information.
              </p>
              <p className="text-historic-stone mb-8 leading-relaxed">
                We do not sell, share, or monetize visitor data in any form.
              </p>

              <hr className="border-tech-silver mb-8" />

              <h2 className="text-2xl font-serif font-semibold text-river-blue mb-4">
                6. Contact
              </h2>
              <p className="text-historic-stone mb-4 leading-relaxed">
                If you have legal, content, or privacy inquiries related to ClarksvilleTN.ai, please contact:
              </p>
              <p className="text-historic-stone mb-8 leading-relaxed">
                <strong>Altivum Inc.</strong><br />
                📧 <a href="mailto:legal@altivum.ai" className="text-sunset-copper hover:text-sunset-copper-dark transition-colors">legal@altivum.ai</a>
              </p>

              <hr className="border-tech-silver mb-8" />

              <p className="text-center text-sm text-historic-stone">
                <strong>ClarksvilleTN.ai</strong> is powered by <strong>Altivum Inc.</strong> | © 2025 All Rights Reserved
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
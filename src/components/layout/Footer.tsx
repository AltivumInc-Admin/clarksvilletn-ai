import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-river-blue-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>

      <div className="container mx-auto px-4 md:px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-9 h-9 bg-sunset-copper rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-serif font-bold">
                ClarksvilleTN<span className="text-sunset-copper">.AI</span>
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Empowering Clarksville's businesses, residents, and institutions with
              AI and cloud technology to build a smarter, more connected community.
            </p>
            <div className="flex items-center space-x-2 text-sm text-white/50">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Clarksville, Tennessee</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4 text-white/90">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About the Initiative', href: '/about' },
                { label: 'Success Stories', href: '/showcase' },
                { label: 'Resources', href: '/resources' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-sunset-copper transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4 text-white/90">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@altivum.ai" className="text-sm text-white/60 hover:text-sunset-copper transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-sunset-copper/70" />
                  <span>info@altivum.ai</span>
                </a>
              </li>
              <li>
                <a href="tel:615-219-9425" className="text-sm text-white/60 hover:text-sunset-copper transition-colors flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-sunset-copper/70" />
                  <span>615-219-9425</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 leading-relaxed">
                Home of Fort Campbell and the 101st Airborne Division.
                Where military excellence meets technological innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              &copy; {currentYear} Altivum Inc. All rights reserved. Veteran-founded benefit corporation, Clarksville, TN.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/legal" className="text-xs text-white/40 hover:text-sunset-copper transition-colors">
                Legal Notice
              </Link>
              <Link to="/legal#privacy" className="text-xs text-white/40 hover:text-sunset-copper transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { Cloud, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-river-blue text-cloud-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-8 h-8 text-sunset-copper" />
              <h3 className="text-xl font-serif font-bold">ClarksvilleTN.AI</h3>
            </div>
            <p className="text-sm text-cloud-white/80 mb-4">
              Empowering Clarksville businesses with cloud technology and AI innovation.
            </p>
            <p className="text-xs text-cloud-white/60">
              Building towards Tennessee's first AI store
            </p>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/campaign" className="text-sm text-cloud-white/80 hover:text-sunset-copper transition-colors">
                  Clarksville on the Cloud
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="text-sm text-cloud-white/80 hover:text-sunset-copper transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-cloud-white/80 hover:text-sunset-copper transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-cloud-white/80">
                <Mail className="w-4 h-4 text-sunset-copper" />
                <a href="mailto:info@clarksvilletn.ai" className="hover:text-sunset-copper transition-colors">
                  info@clarksvilletn.ai
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-cloud-white/80">
                <Phone className="w-4 h-4 text-sunset-copper" />
                <span>Coming Soon</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold mb-4">About Clarksville</h4>
            <p className="text-sm text-cloud-white/80 mb-4">
              Home of Fort Campbell and the 101st Airborne Division. 
              Where military excellence meets technological innovation.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cloud-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-cloud-white/60">
              © {currentYear} Altivum Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-sm text-cloud-white/60 hover:text-sunset-copper transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-cloud-white/60 hover:text-sunset-copper transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-river-blue-dark py-2">
        <div className="container mx-auto px-6">
          <p className="text-xs text-center text-cloud-white/40">
            Owned and operated by Altivum<sup>™</sup> Inc., a for-profit benefit corporation incorporated in Tennessee
          </p>
        </div>
      </div>
    </footer>
  );
}
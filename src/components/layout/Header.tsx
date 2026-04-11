import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NavLink } from '../../types';
import Button from '../ui/Button';

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Success Stories', href: '/showcase' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Resources', href: '/resources' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-elevation-2 border-b border-river-blue-100/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="relative w-9 h-9 bg-river-blue rounded-lg flex items-center justify-center group-hover:bg-sunset-copper transition-colors duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold text-river-blue tracking-tight">
                ClarksvilleTN<span className="text-sunset-copper">.AI</span>
              </span>
              <p className="text-[10px] text-historic-stone leading-none -mt-0.5 hidden sm:block">
                Powered by Altivum
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-sunset-copper'
                      : 'text-river-blue/80 hover:text-river-blue hover:bg-river-blue/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-sunset-copper rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <Button size="sm" href="/get-involved">
              Get Involved
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-river-blue hover:text-sunset-copper transition-colors rounded-lg hover:bg-river-blue/5"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-river-blue-100/30"
          >
            <div className="container mx-auto px-4 py-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`block py-3 text-sm font-medium border-b border-river-blue/5 last:border-b-0 transition-colors ${
                      location.pathname === link.href
                        ? 'text-sunset-copper'
                        : 'text-river-blue hover:text-sunset-copper'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 pb-1">
                <Button size="sm" href="/get-involved" className="w-full">
                  Get Involved
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

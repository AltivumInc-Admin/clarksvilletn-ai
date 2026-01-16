import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, external, target, rel, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]';

    const variants = {
      primary: 'bg-sunset-copper text-white hover:bg-sunset-copper-dark focus:ring-sunset-copper shadow-elevation-2 hover:shadow-copper-glow btn-shimmer',
      secondary: 'bg-river-blue text-white hover:bg-river-blue-dark focus:ring-river-blue shadow-elevation-2 hover:shadow-river-glow btn-shimmer',
      outline: 'border border-river-blue/20 text-river-blue hover:bg-river-blue/5 hover:border-river-blue/40 focus:ring-river-blue hover:shadow-elevation-2',
      ghost: 'text-river-blue hover:bg-river-blue/5 focus:ring-river-blue border border-transparent hover:border-river-blue/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base',
      lg: 'px-5 md:px-8 py-2.5 md:py-3.5 text-base md:text-lg',
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (external || href.startsWith('http') || href.startsWith('https')) {
        return (
          <a
            href={href}
            target={target || "_blank"}
            rel={rel || "noopener noreferrer"}
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'river-blue': '#1e3a5f',
        'river-blue-light': '#2d4a7a',
        'river-blue-dark': '#152b4a',
        'sunset-copper': '#b87333',
        'sunset-copper-light': '#d4884a',
        'sunset-copper-dark': '#9c5f2a',
        'fort-green': '#2d5016',
        'fort-green-light': '#3a6a1e',
        'fort-green-dark': '#1f3a0f',
        'cloud-white': '#f8f9fa',
        'tech-silver': '#e9ecef',
        'historic-stone': '#6c757d',
        'warm-beige': '#f5e6d3',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        // Five-level elevation system
        'elevation-1': '0 1px 2px rgba(30, 58, 95, 0.04), 0 1px 3px rgba(30, 58, 95, 0.06)',
        'elevation-2': '0 2px 4px rgba(30, 58, 95, 0.06), 0 4px 8px rgba(30, 58, 95, 0.08)',
        'elevation-3': '0 4px 8px rgba(30, 58, 95, 0.08), 0 8px 16px rgba(30, 58, 95, 0.10)',
        'elevation-4': '0 8px 16px rgba(30, 58, 95, 0.10), 0 16px 32px rgba(30, 58, 95, 0.12)',
        'elevation-5': '0 12px 24px rgba(30, 58, 95, 0.12), 0 24px 48px rgba(30, 58, 95, 0.14)',
        // Colored glow shadows
        'copper-glow': '0 4px 20px rgba(184, 115, 51, 0.25)',
        'river-glow': '0 4px 20px rgba(30, 58, 95, 0.25)',
        'green-glow': '0 4px 20px rgba(45, 80, 22, 0.25)',
        // Inner shadows for depth
        'inner-subtle': 'inset 0 1px 2px rgba(30, 58, 95, 0.06)',
        'inner-medium': 'inset 0 2px 4px rgba(30, 58, 95, 0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // New micro-interactions
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(184, 115, 51, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(184, 115, 51, 0.5)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        // Enhanced gradients
        'river-gradient': 'linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 50%, #1e3a5f 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #9c5f2a 0%, #b87333 30%, #d4884a 70%, #b87333 100%)',
        'cloud-pattern': "url('/images/cloud-pattern.svg')",
        // Premium gradients
        'hero-gradient': 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%, #f8f9fa 100%)',
        'cta-gradient': 'linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 40%, #1e3a5f 80%, #152b4a 100%)',
        'mesh-gradient': 'linear-gradient(135deg, rgba(30, 58, 95, 0.03) 0%, transparent 50%), linear-gradient(225deg, rgba(184, 115, 51, 0.03) 0%, transparent 50%)',
        // Radial accents
        'river-radial': 'radial-gradient(ellipse at top right, rgba(30, 58, 95, 0.08) 0%, transparent 50%)',
        'copper-radial': 'radial-gradient(ellipse at bottom left, rgba(184, 115, 51, 0.06) 0%, transparent 50%)',
        // Card gradients
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.9) 100%)',
        'card-premium': 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,250,1) 100%)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
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
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
      backgroundImage: {
        'river-gradient': 'linear-gradient(135deg, #1e3a5f 0%, #2d4a7a 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #b87333 0%, #d4884a 100%)',
        'cloud-pattern': "url('/images/cloud-pattern.svg')",
      },
    },
  },
  plugins: [],
}
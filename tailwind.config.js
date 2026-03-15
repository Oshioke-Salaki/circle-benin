/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#89172E',
        'crimson-deep': '#5C0A1C',
        dark: '#080309',
        'dark-card': '#0F0512',
        'dark-surface': '#150A18',
        cream: '#F2E8DC',
        'cream-dim': '#BFB3A5',
        gold: '#C9A96E',
        'gold-bright': '#E8C98A',
        'gold-dim': '#8A7050',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.9s ease forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'float-slow': 'float 10s ease-in-out infinite',
        'draw-circle': 'drawCircle 2.5s ease forwards',
        shimmer: 'shimmer 4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(4deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
        drawCircle: {
          from: { strokeDashoffset: '1000', opacity: '0' },
          to: { strokeDashoffset: '0', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'radial-crimson': 'radial-gradient(ellipse at center, rgba(137,23,46,0.18) 0%, transparent 70%)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */

// Colours are CSS variables (see app/globals.css) so light and dark share one set of utilities.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        ink: token('ink'),
        muted: token('muted'),
        crimson: token('crimson'),
        'crimson-hover': token('crimson-hover'),
        'crimson-glow': token('crimson-glow'),
        accent: token('accent'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      // Shape system: images and panels use `rounded-tile`, every control is a full pill,
      // and the brand shape (hero plate, dish plates) is a full circle.
      borderRadius: {
        tile: '1.25rem',
      },
      // Layer scale. Nothing else in the app sets a z-index.
      zIndex: {
        raised: '1',
        header: '40',
        dock: '45',
        sheet: '60',
        palette: '70',
        grain: '90',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        spin: { to: { transform: 'rotate(360deg)' } },
        'spin-reverse': { to: { transform: 'rotate(-360deg)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'spin-slow': 'spin 90s linear infinite',
        'spin-ring': 'spin-reverse 60s linear infinite',
        shimmer: 'shimmer 1.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#374151',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: { color: theme('colors.gray.900') },
            h2: { color: theme('colors.gray.900') },
            h3: { color: theme('colors.gray.900') },
            h4: { color: theme('colors.gray.900') },
            strong: { color: theme('colors.gray.900') },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            h4: { color: theme('colors.white') },
            strong: { color: theme('colors.white') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
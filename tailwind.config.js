/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'inline-flex',
    'flex',
    'text-xl',
    'items-center',
    'size-8',
    'gap-2',
    'font-semibold',
    'border-2 ',
    'border-stone-700',
    'rounded-md',
    'size-6',
    'justify-center',
  ],
  theme: {
    extend: {
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },

      keyframes: {
        'shine-pulse': {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          'to': {
            'background-position': '0% 0%',
          },

        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
    },
  },
  plugins: [],
}

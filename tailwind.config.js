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
    fontFamily: {
      pingFang: 'PingFang SC',
    },
    extend: {
      colors: {
        'black5': 'rgba(30, 34, 43, 0.05)',
        'hyacinth-blue-500': '#274FEE',
        'active-nav': 'rgba(39, 79, 238, 0.08)',
        'clear-btn-hover': 'rgba(254, 75, 75, 0.08)',
        'item-hover': 'rgba(30, 34, 43, 0.06)',
        'separate': 'rgba(229, 229, 229, 0.70)',
        'btn-major-hover': '#3A60F7',
        'btn-minor-hover': 'rgba(39, 79, 238, 0.08)',
      },
      keyframes: {
        spin360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin360: 'spin360 2s linear infinite',
      },
      boxShadow: {
        dialog: '0px 4px 16px 0px rgba(30, 34, 43, 0.08)',
      },
    },
  },
  plugins: [],
}

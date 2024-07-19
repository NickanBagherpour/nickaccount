import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gray: {
          750: '#2D3748',
          775: '#283141',
        },
        winter: {
          primary: '#a0c4ff',
          secondary: '#9bf6ff',
          accent: '#caffbf',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;

// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // כאן אנחנו מלמדים את Tailwind את הצבעים החדשים שלנו
      colors: {
        'brand-dark': 'var(--brand-dark)',
        'brand-cyan': 'var(--brand-cyan)',
        'brand-cyan-light': 'var(--brand-cyan-light)',
        'brand-cream': 'var(--brand-cream)',
        'brand-slate': 'var(--brand-slate)',
        'brand-light-gray': 'var(--brand-light-gray)',
      },
      // הוספנו כאן גם את הגופן הראשי של האתר
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
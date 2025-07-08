import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // מגדיר שכל פעם שנשתמש בקלאס font-sans, הוא יתייחס לפונט Assistant
        sans: ['var(--font-assistant)'],
      },
      colors: {
        // הגדרת צבעי המותג הרשמיים
        'brand-dark': '#1e293b', // כחול-דיו
        'brand-cyan': '#06b6d4', // תכלת-שמיים
        'brand-cream': '#F9FAFB', // שמנת-ענן
      },
    },
  },
  plugins: [],
}
export default config
// eslint.config.mjs
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

const eslintConfig = [
  // התעלם מתיקיית ה-build של Next.js
  {
    ignores: [".next/**"],
  },
  
  // הגדרת תצורה ראשית
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      // הפעלת כל הכללים המומלצים
      ...nextPlugin.configs.recommended.rules,
      // הפעלת הכללים של Core Web Vitals
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
    languageOptions: {
      globals: {
        // הוספת משתנים גלובליים של דפדפן ו-Node
        ...globals.browser,
        ...globals.node,
      }
    }
  }
];

export default eslintConfig;
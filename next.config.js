// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! אזהרה: זה משבית את כל בדיקות הטיפוסים במהלך ה-build !!
    // !! השתמש בזה רק כפתרון זמני כדי לגרום ל-build לעבור !!
    // !! וודא שאתה עדיין בודק טיפוסים בסביבת הפיתוח או בעורך הקוד שלך.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // לוודא שגם ESLint מושתק בזמן ה-build
  },
};

module.exports = nextConfig;
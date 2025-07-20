// src/components/features/HeroSection.tsx
'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// ======================= התיקון כאן =======================
// הוספנו 'as const' כדי ש-TypeScript יבין שהערכים קבועים ומדויקים
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const, // הוספנו as const
      stiffness: 70,
      damping: 10,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }, // הוספנו as const
};

const ctaButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 150, damping: 15 } }, // הוספנו as const
};
// ===================== סוף התיקון =======================


export const HeroSection: FC = () => {
  return (
    <motion.section
      className="bg-brand-cream py-28 sm:py-40"
      dir="rtl"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight"
          variants={itemVariants}
        >
          הגיע הזמן למצוא שידוך!
        </motion.h1>
        <motion.p
          className="mt-8 max-w-3xl mx-auto text-xl text-brand-dark/80 leading-relaxed"
          variants={itemVariants}
        >
          <strong>מעשיך יקרבוך</strong> היא קהילה ייחודית ופלטפורמה חכמה, המעצבת מחדש את תהליך ההיכרות. כאן, אנו משיבים את הכבוד, העומק והדיוק, כדי שתבנו בית נאמן בישראל – עבורכם ועבור הדורות הבאים.
        </motion.p>
        <motion.div
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
          variants={itemVariants}
        >
          <motion.a
            href="/#the-experience"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg sm:text-xl font-semibold text-white bg-brand-dark rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-800 transform hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/30"
            variants={ctaButtonVariants}
          >
             <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-brand-cyan rounded-full group-hover:w-40 group-hover:h-40 opacity-10"></span>
             <span className="relative">גלו את החוויה שלנו</span>
          </motion.a>
          <motion.div variants={ctaButtonVariants}>
            <Link href="/testimonials" className="text-brand-dark/70 font-semibold text-lg hover:text-brand-cyan transition-colors duration-300">
              סיפורי הצלחה
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
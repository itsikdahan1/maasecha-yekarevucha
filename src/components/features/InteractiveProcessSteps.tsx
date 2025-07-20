'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

const processSteps = [
    {
      icon: "bot",
      title: "שלב 1: הרישום החכם",
      description: "הכל מתחיל בשיחה עם הבוט החכם שלנו בוואטסאפ. הוא ישאל את השאלות הנכונות, יבין מי אתם, ויבנה לכם פרופיל ראשוני מדויק. בלי טפסים ארוכים ומייגעים."
    },
    {
      icon: "camera",
      title: "שלב 2: ערב ההפקה",
      description: "זהו לב המיזם. יום מרוכז וחוויתי הכולל סדנאות מעשיות עם מומחים, צילום פרופיל וידאו מקצועי, ופגישות איכותיות באווירה נעימה ומכבדת."
    },
    {
      icon: "users",
      title: "שלב 3: הקהילה והפלטפורמה",
      description: "לאחר ערב ההפקה, אתם מצטרפים לפלטפורמה הסגורה שלנו ולקהילה התומכת. כאן תקבלו הצעות מותאמות, תשתתפו בוובינרים ותקבלו ליווי עד לחופה."
    }
];

// ======================= התיקון כאן =======================
// הוספנו 'as const' כדי ש-TypeScript יבין שהערכים קבועים ומדויקים
const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.6, 0.4, 1] as const, // <-- הוספנו as const
    }
  }
};
// ===================== סוף התיקון =======================

export const InteractiveProcessSteps = () => {
  return (
    <div className="mt-24 max-w-4xl mx-auto">
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-12 h-[calc(100%-6rem)] w-0.5 bg-slate-200/70" aria-hidden="true"></div>

        <div className="space-y-16 md:space-y-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <div className="relative z-10 flex-shrink-0 bg-brand-cyan text-white w-28 h-28 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Icon name={step.icon} className="w-14 h-14" />
              </div>
              <div className="w-full max-w-lg mt-[-3rem] pt-16 pb-8 px-8 bg-white rounded-2xl shadow-xl border border-slate-200/80 text-right">
                <h3 className="text-3xl font-bold text-brand-dark">{step.title}</h3>
                <p className="mt-4 text-lg text-brand-slate leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
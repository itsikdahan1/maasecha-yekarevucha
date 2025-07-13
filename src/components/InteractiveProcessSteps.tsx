// src/components/InteractiveProcessSteps.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';

const processSteps = [
    {
      icon: "bot",
      title: "שלב 1: הרישום החכם",
      description: "הכל מתחיל בשיחה עם הבוט החכם שלנו בוואטסאפ. הוא ישאל את השאלות הנכונות, יבין מי אתם, ויבנה לכם פרופיל ראשוני מדויק."
    },
    {
      icon: "camera",
      title: "שלב 2: ערב ההפקה",
      description: "זהו לב המיזם. יום מרוכז וחוויתי הכולל סדנאות מעשיות עם מומחים, צילום פרופיל וידאו מקצועי, ופגישות איכותיות באווירה נעימה ומכבדת."
    },
    {
      icon: "users",
      title: "שלב 3: הקהילה והפלטפורמה",
      description: "לאחר ערב ההפקה, אתם מצטרפים לפלטפורמה הסגורה שלנו ולקהילה התומכת. כאן תקבלו הצעות מותאמות וליווי עד לחופה."
    }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export const InteractiveProcessSteps = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const stepIndex = (page % processSteps.length + processSteps.length) % processSteps.length;
    const step = processSteps[stepIndex];

    return (
        // --- כאן התיקון: הקטנו את הרוחב המקסימלי מ-max-w-2xl ל-max-w-lg ---
        <div className="relative mt-20 max-w-lg mx-auto h-80 flex flex-col items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute w-full px-4"
                >
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="flex-shrink-0 bg-brand-cyan text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                                <Icon name={step.icon} className="w-10 h-10" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-brand-dark">{step.title}</h2>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed min-h-[100px]">{step.description}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* כפתורי ניווט */}
            {page > 0 && (
                <button
                    onClick={() => paginate(-1)}
                    className="absolute top-1/2 -translate-y-1/2 right-[-20px] sm:right-[-40px] bg-white p-3 rounded-full shadow-md hover:bg-slate-100 transition-transform hover:scale-110"
                    aria-label="השלב הקודם"
                >
                    <Icon name="arrowLeft" className="w-6 h-6 transform scale-x-[-1]" />
                </button>
            )}
            {page < processSteps.length - 1 && (
                <button
                    onClick={() => paginate(1)}
                    className="absolute top-1/2 -translate-y-1/2 left-[-20px] sm:left-[-40px] bg-white p-3 rounded-full shadow-md hover:bg-slate-100 transition-transform hover:scale-110"
                    aria-label="השלב הבא"
                >
                    <Icon name="arrowLeft" className="w-6 h-6" />
                </button>
            )}

             {/* חיווי התקדמות (נקודות) */}
            <div className="absolute bottom-[-40px] flex justify-center space-x-3">
                {processSteps.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setPage([index, index > page ? 1 : -1])}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${stepIndex === index ? 'bg-brand-cyan scale-125' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};
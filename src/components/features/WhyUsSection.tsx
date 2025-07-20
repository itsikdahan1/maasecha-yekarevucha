// src/components/features/WhyUsSection.tsx
'use client';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

const pillars = [
  {
    icon: "camera",
    title: "פרופיל וידאו אותנטי",
    description: "במקום תמונה ששווה אלף מילים, קבלו סרטון ששווה פגישה. הכירו את האדם, לא רק את הפרופיל."
  },
  {
    icon: "gem",
    title: "פחות פגישות, יותר דיוק",
    description: "הפלטפורמה שלנו חוסכת לך זמן יקר. פרופילי הוידאו וההתאמה החכמה מאפשרים לך להכיר לעומק לפני הפגישה הראשונה."
  },
  {
    icon: "server",
    title: "פלטפורמה חכמה",
    description: "אלגוריתם מתקדם וכלים מבוססי AI שעוזרים לך להציג את עצמך בצורה הטובה ביותר ומציעים התאמות מדויקות."
  },
  {
    icon: "users",
    title: "קהילה תומכת",
    description: "אתם לא לבד. הצטרפו לקהילה איכותית של אנשים כמוכם, עם ליווי, תמיכה וסדנאות העשרה לאורך כל הדרך."
  }
];

const itemEnterVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const sectionTextVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const iconGlowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" as const } },
};

export const WhyUsSection: FC = () => {
    return (
        // ======================= התיקון הסופי כאן =======================
        // הסרנו את ה-SVG הבעייתי לחלוטין. השארנו רק את הרקע הנקי.
        <section className="relative py-24 sm:py-32 bg-gradient-to-b from-brand-cream to-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.5 }}
                        variants={sectionTextVariants}
                        className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                    מהפכה בדרך שבה מכירים
                    </motion.h2>
                    <motion.p 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.5 }}
                        variants={sectionTextVariants}
                        className="max-w-2xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">
                    שילבנו טכנולוגיה מתקדמת עם הבנה עמוקה של עולם הנפש והשידוכים, כדי ליצור חוויה שלא הכרתם.
                    </motion.p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {pillars.map((pillar, index) => (
                    <motion.div
                        key={pillar.title}
                        className="group relative p-8 rounded-2xl overflow-hidden
                                bg-white/50 shadow-md border border-slate-100
                                transition-all duration-200 ease-out
                                hover:shadow-lg hover:bg-white/80 hover:backdrop-blur-md cursor-pointer"
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={itemEnterVariants}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/0 to-brand-cyan/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-xl scale-125"></div>
                        <div className="relative z-10 text-right">
                            <motion.div 
                                className="flex justify-end mb-5"
                                variants={iconGlowVariants}
                            >
                                <div className="flex-shrink-0 relative w-20 h-20 rounded-full flex items-center justify-center bg-brand-cyan shadow-xl text-white">
                                    <Icon name={pillar.icon} className="w-9 h-9"/>
                                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                                </div>
                            </motion.div>
                            <h3 className="text-xl font-bold text-brand-dark mt-2">
                                {pillar.title}
                            </h3>
                            <p className="mt-2 text-brand-slate">
                                {pillar.description}
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                    </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
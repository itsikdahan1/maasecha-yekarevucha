// src/components/features/ExpertsSection.tsx
import React, { FC } from 'react';
import type { Expert } from '@/types';
import { motion, Variants } from 'framer-motion'; // ייבוא motion ו-Variants

interface ExpertsSectionProps {
  experts: Expert[];
}

export const ExpertsSection: FC<ExpertsSectionProps> = ({ experts }) => { 
  // אנימציות בסיסיות לכרטיסי מומחים
  const expertCardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger effect
        duration: 0.6,
        ease: "easeOut" as const, // וודא ease תקין
      },
    }),
  };

  return (
    <section id="experts" className="py-24 sm:py-32 bg-brand-cream" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">ליווי אישי ומקצועי</h2>
          <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            נבחרת המומחים שלנו
          </p>
          <p className="max-w-xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">
            ההצלחה שלך היא המשימה של כולנו. לכן בנינו נבחרת של אנשי מקצוע מהשורה הראשונה, שילוו אותך בדרך.
          </p>
        </div>

        {/* בדיקה אם יש מומחים להצגה */}
        {experts && experts.length > 0 ? (
          // שינוי ה-grid להבטחת פריסה טובה במובייל ובטאבלט
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto justify-center">
            {experts.map((expert, index) => (
              <motion.div 
                key={expert._id} 
                className="bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2 border border-slate-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} // <--- שינוי amount ל-0.1
                variants={expertCardVariants}
                custom={index} 
              >
                <img 
                  className="w-32 h-32 rounded-full mx-auto ring-4 ring-brand-cyan/50 p-1 shadow-lg object-cover" 
                  src={expert.imageUrl || 'https://placehold.co/128x128/06b6d4/white?text=מומחה'} 
                  alt={`תמונה של ${expert.name}`}
                  loading="lazy"
                />
                <h3 className="mt-6 text-xl font-semibold text-brand-dark">{expert.name}</h3>
                <p className="mt-1 text-brand-cyan font-medium">{expert.role}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          // הודעה אם אין מומחים
          <div className="text-center mt-10 text-lg text-brand-slate">
            <p>אין מומחים זמינים כרגע. אנא עדכן/י את הנתונים ב-Sanity Studio.</p>
          </div>
        )}
      </div>
    </section>
  );
}
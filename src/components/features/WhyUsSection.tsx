// src/components/features/WhyUsSection.tsx
import React, { FC } from 'react';
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

export const WhyUsSection: FC = () => (
  <section className="py-24 sm:py-32 bg-white" dir="rtl">
    <div className="container mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
          מהפכה בדרך שבה מכירים
        </h2>
        <p className="max-w-2xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">
          שילבנו טכנולוגיה מתקדמת עם הבנה עמוקה של עולם הנפש והשידוכים, כדי ליצור חוויה שלא הכרתם.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="text-center p-8 bg-brand-light rounded-2xl shadow-lg border border-slate-100 transition-all duration-300 hover:shadow-cyan-500/10 hover:-translate-y-2">
            <div className="flex justify-center mb-5">
              <div className="flex-shrink-0 bg-brand-cyan text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Icon name={pillar.icon} className="w-9 h-9"/>
              </div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark">{pillar.title}</h3>
            <p className="mt-2 text-brand-slate">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
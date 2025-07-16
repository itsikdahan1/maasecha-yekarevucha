'use client';

import React from 'react';
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

export const InteractiveProcessSteps = () => {
  return (
    // הוספנו overflow-hidden לאלמנט העוטף כדי למנוע גלישה צידית
    <div className="relative mt-20 max-w-3xl mx-auto overflow-hidden px-2"> 
      {/* הקו האנכי שמחבר בין השלבים */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
      
      <div className="space-y-16">
        {processSteps.map((step, index) => (
          <div key={index} className="relative flex items-center">
            {/* סידור השלבים לסירוגין (ימין-שמאל) */}
            <div className={`flex w-full items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              <div className="hidden md:flex flex-shrink-0 bg-brand-cyan text-white w-24 h-24 rounded-full items-center justify-center shadow-lg z-10">
                <Icon name={step.icon} className="w-12 h-12" />
              </div>
              <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80">
                <div className="flex items-center gap-4 md:hidden mb-4">
                    <div className="flex-shrink-0 bg-brand-cyan text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                      <Icon name={step.icon} className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-dark">{step.title}</h2>
                </div>
                <h2 className="hidden md:block text-3xl font-bold text-brand-dark">{step.title}</h2>
                <p className="mt-2 text-lg text-brand-slate leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
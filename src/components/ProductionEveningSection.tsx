// src/components/ProductionEveningSection.tsx
'use client';
import React, { FC } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { productionEvening } from '@/lib/data';

const mentalCoachingItem = {
  title: "ליווי ואימון מנטלי",
  expert: "כלים לצמיחה והתמודדות בתהליך",
  icon: "brainCircuit"
};

export const ProductionEveningSection: FC = () => {
  const info = productionEvening.info;

  const womenWorkshopItems = [
    ...info.workshops.women.items.filter(item => item.icon !== 'gift'),
    mentalCoachingItem
  ];
  const menWorkshopItems = [
    ...info.workshops.men.items.filter(item => item.icon !== 'gift'),
    mentalCoachingItem
  ];

  const updatedTimeline = info.timeline.map(item => {
    if (item.icon === 'gift') {
      return {
        name: "הטבות ווובינרים",
        description: "גישה להטבות בלעדיות, שת\"פים וסדנאות העשרה שבועיות עם מיטב המומחים שלנו.",
        icon: "gem"
      };
    }
    return item;
  });

  return (
    <section id="the-experience" className="py-24 sm:py-32 bg-brand-cream" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            חווית הפקה שטרם הכרתם
          </h2>
          <p className="max-w-3xl mt-6 mx-auto text-lg text-brand-dark/70 leading-relaxed">
            אנחנו לא מסתפקים בלהכיר לכם. אנחנו רוצים לתת לכם כלים להצלחה. ערב ההפקה שלנו הוא יום מרוכז של צמיחה, למידה והיכרות איכותית.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {updatedTimeline.map((item) => (
            <div key={item.name} className="bg-white/60 p-6 rounded-2xl text-center shadow-lg border border-slate-200/50 transition-all duration-300 hover:shadow-cyan-500/10 hover:-translate-y-2">
              <div className="flex justify-center mb-5">
                <div className="flex-shrink-0 bg-brand-cyan text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Icon name={item.icon} className="w-9 h-9"/>
                </div>
              </div>
              <h4 className="font-bold text-brand-dark text-xl">{item.name}</h4>
              <p className="text-brand-dark/70 mt-2 text-md leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-24">
            <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12">
              
                <div className="w-full lg:w-[40%] bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-slate-200/80 z-10">
                    <h3 className="text-3xl font-bold text-brand-dark mb-8 text-center">{info.workshops.men.title}</h3>
                    <ul className="space-y-6">
                        {menWorkshopItems.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-brand-cyan text-white mt-1">
                                    <Icon name={item.icon} className="w-5 h-5 p-0.5" />
                                </div>
                                <div className="mr-4">
                                    <p className="text-xl text-brand-dark font-semibold">{item.title}</p>
                                    <p className="text-brand-dark/70 text-md">{item.expert}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ⬇️ התיקון כאן: הקטנו את העיגול למובייל ⬇️ */}
                <div className="order-first lg:order-none w-36 h-36 lg:w-48 lg:h-48 bg-gradient-to-br from-brand-cyan to-cyan-600 rounded-full flex flex-col shrink-0 items-center justify-center text-center p-4 shadow-2xl z-20 text-white border-8 border-brand-cream lg:mt-16 animate-pulse-slow">
                    <Icon name="gift" className="w-10 h-10 mb-2"/>
                    <h4 className="text-2xl font-bold">בונוס</h4>
                    <p className="text-sm">מתנה לכל משתתף</p>
                </div>

                <div className="w-full lg:w-[40%] bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-slate-200/80 z-10">
                    <h3 className="text-3xl font-bold text-brand-dark mb-8 text-center">{info.workshops.women.title}</h3>
                    <ul className="space-y-6">
                        {womenWorkshopItems.map((item, index) => (
                            <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-brand-cyan text-white mt-1">
                                    <Icon name={item.icon} className="w-5 h-5 p-0.5" />
                                </div>
                                <div className="mr-4">
                                    <p className="text-xl text-brand-dark font-semibold">{item.title}</p>
                                    <p className="text-brand-dark/70 text-md">{item.expert}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
        <div className="text-center mt-24">
            <Link 
                href="/how-it-works"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-semibold text-white bg-brand-dark rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-800 transform hover:-translate-y-1 shadow-xl"
            >
                <span className="relative">מאיפה מתחילים? כל הפרטים כאן</span>
            </Link>
        </div>
      </div>
    </section>
  );
};
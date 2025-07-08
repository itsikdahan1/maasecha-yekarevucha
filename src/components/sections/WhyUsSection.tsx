'use client';
import React from 'react';
import { Icon } from './ui/Icon';

export const WhyUsSection = () => {
    const pillars = [
      { title: "הפלטפורמה החכמה", description: "טכנולוגיה שמכירה אותך לעומק, ומציגה רק התאמות עם פוטנציאל אמיתי, על בסיס הרבה יותר מתמונה.", icon: "brainCircuit" },
      { title: "החוויה המעצימה", description: "ערבי הפקה וסדנאות שמעניקים כלים, ביטחון, וחוויה שמתחילה את המסע ממקום של כוח.", icon: "heart" },
      { title: "הקהילה התומכת", description: "מרחב בטוח של אנשים איכותיים, שנבחרו בקפידה ומקבלים ליווי, תוכן וחיזוק לאורך כל הדרך.", icon: "users" },
      { title: "הערך והשקיפות", description: "מודל עסקי הוגן מבוסס הצלחה וגישה לנבחרת המומחים המובילה בתחום.", icon: "gem" },
    ];

    return (
        <section id="why-us" className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                        למה אנחנו הבחירה הנכונה?
                    </h2>
                    <p className="max-w-3xl mt-5 mx-auto text-lg text-brand-dark/70 leading-relaxed">
                        שילבנו בין טכנולוגיה מתקדמת, חוויה אנושית מעצימה, קהילה איכותית וליווי של מיטב המומחים. כל זה כדי לתת לך את הדרך הבטוחה, הנעימה והיעילה ביותר לחופה.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="flex items-start gap-x-6 p-8 bg-brand-cream/60 rounded-2xl border border-transparent hover:border-cyan-200/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-cyan-100/70 text-brand-cyan">
                                <Icon name={pillar.icon} className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-brand-dark">{pillar.title}</h3>
                                <p className="mt-2 text-brand-dark/70 leading-relaxed">{pillar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
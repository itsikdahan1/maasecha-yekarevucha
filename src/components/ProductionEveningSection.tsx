'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './ui/Icon';

const productionEvening = {
  title: "החוויה שממנה מתחילים",
  subtitle: "ערב הפקה. לא עוד דמי רישום",
  description: "אנו מאמינים שהדרך לחתונה מתחילה בהשקעה אמיתית. לכן, יצרנו ערב הפקה יוקרתי ומעצים, המעניק כלים מעשיים, חוויה מקצועית, ופרופיל וידאו אותנטי שמחליף אלף תמונות.",
  timeline: [
    { name: "קבלת פנים ובר מפנק", icon: "coffee", description: "מתחילים את הערב באווירה נינוחה עם כיבוד עשיר ונטוורקינג איכותי." },
    { name: "הרצאות העשרה", icon: "mic", description: "סדנאות ממוקדות וכלים פרקטיים מפי נבחרת המומחים שלנו." },
    { name: "צילום פרופיל וידאו", icon: "camera", description: "צילום דיסקרטי ואישי באווירה תומכת, שמבליט את האותנטיות שלכם." },
    { name: "מתנת פרימיום", icon: "gift", description: "כל משתתף ומשתתפת יוצאים עם מתנה יוקרתית מאיתנו, כי הדרך חשובה לא פחות מהמטרה." },
  ],
  workshops: {
    men: {
      title: "סדנאות לגברים",
      items: [
        { title: "הכנה רוחנית ומעשית", expert: "שיחה עם רב ויועץ זוגי", icon: "check" },
        { title: "כלים לניהול שיחה", expert: "מומחה לתקשורת בין-אישית", icon: "check" },
        { title: "בונוס יוקרתי", expert: "בושם איכותי לפגישות", icon: "gift" }
      ]
    },
    women: {
      title: "סדנאות לנשים",
      items: [
        { title: "ביטחון עצמי והחלטות", expert: "שיחה עם יועצת זוגית", icon: "check" },
        { title: "סטיילינג ושידור מסר", expert: "סטייליסטית ויועצת תדמית", icon: "check" },
        { title: "בונוס יוקרתי", expert: "שובר לאיפור מקצועי", icon: "gift" }
      ]
    }
  }
};


export const ProductionEveningSection = () => {
    return (
        <section id="the-experience" className="py-24 sm:py-32 bg-brand-cream" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">{productionEvening.subtitle}</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                        {productionEvening.title}
                    </p>
                    <p className="max-w-3xl mt-6 mx-auto text-lg text-brand-dark/70 leading-relaxed">
                        {productionEvening.description}
                    </p>
                </div>

                {/* --- NEW, STABLE & ELEGANT TIMELINE --- */}
                <div className="max-w-4xl mx-auto mb-24">
                    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-x-12">
                        {productionEvening.timeline.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Text Box (Left on Desktop) */}
                                <div className={index % 2 === 0 ? 'text-right' : 'hidden md:block'}>
                                    {index % 2 !== 0 && (
                                        <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200/80">
                                            <h4 className="font-bold text-brand-dark text-lg">{item.name}</h4>
                                            <p className="text-brand-dark/70 mt-1">{item.description}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Centerpiece (Icon & Line) */}
                                <div className="relative flex justify-center">
                                    <div className="absolute top-0 h-full w-0.5 bg-cyan-200/70"></div>
                                    <div className="z-10 flex-shrink-0 bg-brand-cyan text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                        <Icon name={item.icon} className="w-9 h-9"/>
                                    </div>
                                </div>

                                {/* Text Box (Right on Desktop, Below on Mobile) */}
                                <div className={index % 2 === 0 ? 'md:text-left' : 'col-start-2 md:col-start-auto'}>
                                    {index % 2 === 0 && (
                                       <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200/80">
                                            <h4 className="font-bold text-brand-dark text-lg">{item.name}</h4>
                                            <p className="text-brand-dark/70 mt-1">{item.description}</p>
                                       </div>
                                    )}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Workshops Section */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                    {[productionEvening.workshops.men, productionEvening.workshops.women].map((workshop) => (
                        <div key={workshop.title} className="bg-white/70 p-10 rounded-2xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-cyan-100/50 hover:border-cyan-200 hover:-translate-y-2">
                            <h3 className="text-3xl font-bold text-brand-dark mb-8">{workshop.title}</h3>
                            <ul className="space-y-6">
                                {workshop.items.map((item, index) => (
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
                    ))}
                </div>
            </div>
        </section>
    );
};
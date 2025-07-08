'use client';
import React from 'react';
import { Icon } from './ui/Icon';

export const CommunitySection = () => {
    return (
        <section id="community" className="py-24 sm:py-32 bg-gradient-to-br from-brand-dark to-slate-900 text-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
                <div className="text-center md:text-right">
                    <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">לא עוד מאגר, אלא קהילה</h2>
                    <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                        הכוח שלך להליכה משותפת
                    </p>
                    <p className="max-w-xl mt-6 text-lg text-slate-300/80 leading-relaxed">
                        עם הצטרפותך, את/ה הופך/ת לחלק מקהילה איכותית, מסוננת ותומכת. אנו מציעים מעטפת רחבה הכוללת וובינרים, הרצאות העשרה, ועדכונים יומיים בסטטוס הוואטסאפ&nbsp;שלנו.
                    </p>
                    <div className="mt-8 flex justify-center md:justify-start">
                        <a href="https://wa.me/972553080685" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-brand-dark px-6 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-100 transition-transform hover:scale-105 shadow-lg">
                            <Icon name="whatsappBubble" className="w-6 h-6"/>
                            <span>קבלו עדכונים בסטטוס</span>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src="https://storage.googleapis.com/gemini-prod-us-west1-423901-d859/images/570e28e1-5121-4f10-b472-35e98586940e.png" alt="קהילת וואטסאפ של מעשיך יקרבוך" className="rounded-2xl shadow-2xl w-full max-w-sm" />
                </div>
            </div>
        </section>
    );
};
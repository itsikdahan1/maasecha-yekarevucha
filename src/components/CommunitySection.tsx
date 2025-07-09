// src/components/CommunitySection.tsx
'use client';
import React, { FC } from 'react';
import { Icon } from './Icon';

export const CommunitySection: FC = () => {
    const whatsappCommunityText = encodeURIComponent('שלום, ברצוני להצטרף לקהילת הסטטוסים של "מעשיך יקרבוך"');

    return (
        <section id="community" className="py-24 sm:py-32 bg-gradient-to-br from-brand-dark to-slate-900 text-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-16">
                    
                    <div className="flex flex-col items-center md:items-start text-center md:text-right max-w-lg">
                        <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">תמיכה לאורך כל הדרך</h2>
                        <p className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                            קהילה תומכת, לא עוד מאגר
                        </p>
                        <p className="mt-6 text-lg text-slate-300/80 leading-relaxed">
                            עם הצטרפותך, את/ה הופך/ת לחלק מקהילה איכותית ומסוננת. אנו מציעים מעטפת רחבה הכוללת וובינרים, הרצאות העשרה, ועדכונים יומיים בסטטוס הוואטסאפ שלנו כדי לתת לך כלים וכוח להצלחה.
                        </p>
                        <div className="mt-8">
                            <a href={`https://wa.me/972553080685?text=${whatsappCommunityText}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-brand-dark px-6 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-100 transition-transform hover:scale-105 shadow-lg">
                               <Icon name="whatsappBubble" className="w-6 h-6"/>
                               <span>הצטרפו לקהילה שלנו</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <img 
                            src="/images/Beige.svg" 
                            alt="קהילת מעשיך יקרבוך" 
                            className="rounded-2xl shadow-2xl w-full max-w-sm" 
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};
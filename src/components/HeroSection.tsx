import React from 'react';

export const HeroSection = () => {
  return (
    <section className="bg-brand-cream" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8 py-28 sm:py-40 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-dark tracking-tight">
          הגיע הזמן להכיר באמת
        </h1>
        <p className="mt-8 max-w-3xl mx-auto text-xl text-brand-dark/80 leading-relaxed">
          <strong>מעשיך יקרבוך</strong> היא לא עוד אפליקציה. זו פלטפורמה חכמה עם <strong>פרופילי וידאו אותנטיים</strong> וקהילה תומכת, שמחליפה את התסכול&nbsp;והשטחיות בהיכרות אמיתית, עמוקה&nbsp;ומכבדת.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="#the-experience" className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-semibold text-white bg-brand-dark rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-800 transform hover:-translate-y-1 shadow-xl hover:shadow-cyan-500/30">
             <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-brand-cyan rounded-full group-hover:w-40 group-hover:h-40 opacity-10"></span>
             <span className="relative">אני רוצה להתחיל את המסע</span>
          </a>
          <div className="flex gap-x-6">
            <a href="#why-us" className="text-brand-dark/70 font-semibold text-lg hover:text-brand-cyan transition-colors duration-300">
              איך זה עובד?
            </a>
            <a href="#blog" className="text-brand-dark/70 font-semibold text-lg hover:text-brand-cyan transition-colors duration-300">
              סיפורי הצלחה
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
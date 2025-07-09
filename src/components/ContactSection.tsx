import React, { FC } from 'react';
import { Icon } from './Icon';

export const ContactSection: FC = () => {
  const whatsappJoinText = encodeURIComponent('שלום, אני מעוניין/ת להצטרף למחזור הקרוב של "מעשיך יקרבוך"');
  return (
    <section id="contact" className="bg-brand-dark text-white" dir="rtl">
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold">מוכנים להתחיל את המסע שלכם?</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">
          אנחנו כאן כדי ללוות אתכם. הצטרפו למחזור הקרוב, או צרו קשר לכל שאלה.
        </p>
        <div className="mt-10">
          <a
            href={`https://wa.me/972553080685?text=${whatsappJoinText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-semibold text-white bg-brand-cyan rounded-xl overflow-hidden transition-all duration-300 hover:bg-cyan-600 transform hover:-translate-y-1 shadow-xl"
          >
            <span className="relative flex items-center gap-3">
              <Icon name="whatsapp" className="w-6 h-6" />
              להצטרפות ופרטים נוספים
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
import React, { FC } from 'react';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';

export const ContactSection: FC = () => {
  return (
    <section id="contact" className="bg-brand-dark" dir="rtl">
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">מוכנים להתחיל את המסע שלכם?</h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">הדרך לזוגיות מתחילה בצעד אחד. גלו את התהליך הייחודי שלנו, שמחבר בין טכנולוגיה, קהילה וליווי אישי.</p>
        <div className="mt-10">
          <Link href="/how-it-works" className="btn-primary text-xl">
            <span className="flex items-center gap-3">
              <Icon name="sparkles" className="w-6 h-6" />
              גלו את התהליך
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
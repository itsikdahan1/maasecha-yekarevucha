// src/app/faq/page.tsx
import { getFaqs } from '@/lib/sanity';
import type { Faq } from '@/types';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

export const metadata = {
  title: "שאלות ותשובות | מעשיך יקרבוך",
  description: "כל מה שרציתם לדעת על תהליך ההיכרות, ערבי ההפקה והפלטפורמה החכמה שלנו.",
};

export default async function FaqPage() {
  const faqs: Faq[] = await getFaqs();

  return (
    <div className="bg-white py-24 sm:py-32" dir="rtl">
      <main className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
              שאלות ותשובות
            </h1>
            <p className="mt-6 text-xl text-brand-dark/70 leading-relaxed">
              ריכזנו עבורכם את כל מה שחשוב לדעת לפני שיוצאים איתנו לדרך.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq._id} className="group bg-slate-50 p-6 rounded-2xl border border-slate-200 open:ring-2 open:ring-brand-cyan open:shadow-lg transition-all">
                <summary className="text-xl font-semibold text-brand-dark cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <div className="text-brand-cyan transition-transform duration-300 group-open:rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </summary>
                <div className="mt-4 text-slate-700 leading-relaxed prose prose-lg">
                  <PortableText value={faq.answer} />
                </div>
              </details>
            ))}
          </div>

           <div className="text-center mt-16">
              <Link href="/how-it-works" className="text-lg font-semibold text-brand-cyan hover:underline">
                עדיין יש שאלות? גלו איך התהליך שלנו עובד
              </Link>
           </div>

        </div>
      </main>
    </div>
  );
}
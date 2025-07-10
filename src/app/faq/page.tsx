// src/app/faq/page.tsx
import { getFaqs } from "@/lib/sanity";
import { Faq } from "@/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Metadata } from "next";
import React from 'react';
import { AskQuestionForm } from "@/components/AskQuestionForm";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "שאלות ותשובות | מעשיך יקרבוך",
  description: "כל מה שרציתם לשאול על המיזם, התהליך והדרך לחופה.",
};

// ⬇️ הוספנו כאן "מתרגם" עבור התוכן העשיר מ-Sanity ⬇️
const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mt-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mt-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
  },
  block: {
    normal: ({ children }) => <p className="mt-2 text-gray-700 leading-relaxed">{children}</p>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 text-gray-800">{children}</h4>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="text-brand-cyan hover:underline">{children}</a>;
    },
  },
};

export default async function FaqPage() {
  const faqs: Faq[] = await getFaqs();

  return (
    <div className="bg-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-16">
          <div className="lg:w-2/3">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">שאלות נפוצות</h2>
              <dl className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq._id} className="group bg-slate-50 p-6 rounded-xl">
                    <summary className="flex w-full cursor-pointer items-center justify-between text-left text-gray-900 list-none">
                      <span className="text-lg font-semibold leading-7">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <svg className="h-6 w-6 transform transition-transform duration-300 group-open:-rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 pr-4 border-r-2 border-brand-cyan prose-lg text-gray-600">
                      {/* ⬇️ השתמשנו ב"מתרגם" כדי להציג את התוכן נכון ⬇️ */}
                      <PortableText value={faq.answer} components={portableTextComponents} />
                    </div>
                  </details>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-28 py-8 px-6 bg-gray-100 rounded-2xl shadow-sm">
              <AskQuestionForm />
            </div>
          </div>
        </div>

        <div className="mt-32 text-center border-t border-gray-200 pt-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">מוכנים להתחיל את המסע?</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
                הצטרפו לערב ההפקה הקרוב ותנו לנו לעזור לכם למצוא את מה שחיפשתם.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/how-it-works" className="rounded-md bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500">
                    לפרטים על ערב ההפקה
                </Link>
                <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                    דברו איתנו <span aria-hidden="true">→</span>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
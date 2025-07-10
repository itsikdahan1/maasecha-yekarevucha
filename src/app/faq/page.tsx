// src/app/faq/page.tsx
import { getFaqs } from "@/lib/sanity";
import { Faq } from "@/types";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import React from 'react';
import { AskQuestionForm } from "@/components/AskQuestionForm";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "שאלות ותשובות | מעשיך יקרבוך",
  description: "כל מה שרציתם לשאול על המיזם, התהליך והדרך לחופה.",
};

export default async function FaqPage() {
  const faqs: Faq[] = await getFaqs();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* החלק של השאלות והתשובות - תופס יותר מקום */}
          <div className="lg:w-2/3">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 text-center mb-8">שאלות נפוצות</h2>
              <dl className="mt-6 space-y-6 divide-y divide-gray-900/10">
                {faqs.map((faq) => (
                  <div key={faq._id} className="pt-6">
                    <dt>
                      <details className="group">
                        <summary className="flex w-full cursor-pointer items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">{faq.question}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <svg className="h-6 w-6 transform transition-transform duration-200 group-open:-rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </span>
                        </summary>
                        <div className="mt-4 pr-4 prose prose-lg text-gray-600">
                          <PortableText value={faq.answer} />
                        </div>
                      </details>
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* החלק של הטופס - תופס כשליש מהרוחב */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 py-8 px-6 bg-gray-50 rounded-lg shadow-sm">
              <AskQuestionForm />
            </div>
          </div>
        </div>

        {/* --- החלק שהוחזר: קריאה להמשך התהליך --- */}
        <div className="mt-32 text-center border-t border-gray-200 pt-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">מוכנים להתחיל את המסע?</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
                הצטרפו לערב ההפקה הקרוב ותנו לנו לעזור לכם למצוא את מה שחיפשתם.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    href="/how-it-works"
                    className="rounded-md bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
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

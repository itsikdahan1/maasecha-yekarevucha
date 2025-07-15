import { getFaqs } from "@/lib/sanity";
import { Faq } from "@/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Metadata } from "next";
import React from 'react';
import { AskQuestionForm } from "@/components/features/AskQuestionForm";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "שאלות ותשובות | מעשיך יקרבוך",
  description: "כל מה שרציתם לשאול על המיזם, התהליך והדרך לחופה.",
};

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mt-4 space-y-2">{children}</ul>,
  },
  block: {
    normal: ({ children }) => <p className="mt-2 text-brand-slate leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">{children}</a>
    ),
  },
};

export default async function FaqPage() {
  const faqs: Faq[] = await getFaqs();

  return (
    <div className="bg-white" dir="rtl">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">שאלות נפוצות</h2>
          <p className="mt-4 text-lg text-brand-slate">כל מה שרציתם לדעת, במקום אחד.</p>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <dl className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq._id} className="group bg-brand-light-gray/50 p-6 rounded-xl transition-all duration-300 hover:bg-brand-light-gray">
                <summary className="flex w-full cursor-pointer items-center justify-between text-left text-brand-dark list-none">
                  <span className="text-lg font-semibold leading-7">{faq.question}</span>
                  <span className="ml-6 flex h-7 items-center">
                    <svg className="h-6 w-6 transform transition-transform duration-300 group-open:-rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 pr-4 border-r-2 border-brand-cyan prose-lg text-brand-slate">
                  <PortableText value={faq.answer} components={portableTextComponents} />
                </div>
              </details>
            ))}
          </dl>
        </div>

        <div className="mt-24 pt-16 border-t border-slate-200 max-w-2xl mx-auto">
          <AskQuestionForm />
        </div>
      </div>
    </div>
  );
}
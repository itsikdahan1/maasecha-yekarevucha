// C:\Users\USER\maasecha-v2\src\components\faq\FaqPageClient.tsx
'use client'; // <-- חובה שורה זו בראש הקובץ!

import { Faq } from "@/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React, { useState } from 'react';
import { AskQuestionForm } from "@/components/features/AskQuestionForm";
import { Icon } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';

// הגדרת הרכיבים ל-PortableText
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

// אנימציות
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 10,
      staggerChildren: 0.1,
    },
  },
};

const faqItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

interface FaqPageProps {
  faqs: Faq[];
}

// זו הקומפוננטה הלקוחית שרונדרה בצד הלקוח בלבד
export const FaqPageClient: React.FC<FaqPageProps> = ({ faqs }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  if (!faqs || faqs.length === 0) {
    return (
      <section className="py-24 sm:py-32 bg-white" dir="rtl">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">שאלות נפוצות</h1>
          <p className="mt-4 text-xl text-brand-slate">אין שאלות ותשובות זמינות כרגע.</p>
        </div>
      </section>
    );
  }

  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.category || 'כללי';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, Faq[]>);

  return (
    <motion.div
      className="bg-white py-24 sm:py-32"
      dir="rtl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-7xl px-6 py-0 sm:py-0 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">שאלות נפוצות</h1>
          <p className="mt-4 text-xl text-brand-slate">כל מה שרציתם לדעת, במקום אחד.</p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          {Object.entries(faqsByCategory).map(([category, faqsInCat]) => (
            <div key={category} className="mb-12">
              <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
                <Icon name="settings" className="w-7 h-7 inline-block align-middle ml-3 text-brand-cyan" />
                {category}
              </h2>
              <dl className="space-y-4">
                {faqsInCat.map((faq) => (
                  <motion.div key={faq._id} variants={faqItemVariants}>
                    <details
                      open={openFaqId === faq._id}
                      onClick={(e) => { e.preventDefault(); toggleFaq(faq._id); }}
                      className="group p-6 rounded-2xl bg-brand-light-gray/60 backdrop-blur-sm shadow-xl border border-slate-200/50 cursor-pointer overflow-hidden transition-all duration-300 hover:bg-slate-100/80"
                    >
                      <summary className="flex w-full items-center justify-between text-left text-brand-dark list-none">
                        <span className="text-lg font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <Icon name="arrowLeft" className={`h-6 w-6 transform transition-transform duration-300 ${openFaqId === faq._id ? 'rotate-90' : '-rotate-90'}`} />
                        </span>
                      </summary>
                      <AnimatePresence initial={false}>
                        {openFaqId === faq._id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="mt-4 pr-4 border-r-2 border-brand-cyan prose prose-lg text-brand-slate max-w-none"
                          >
                            <PortableText value={faq.answer} components={portableTextComponents} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </details>
                  </motion.div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-16 border-t border-slate-200 max-w-2xl mx-auto">
          <AskQuestionForm />
        </div>
      </div>
    </motion.div>
  );
};
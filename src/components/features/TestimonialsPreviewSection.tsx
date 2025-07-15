// src/components/features/TestimonialsPreviewSection.tsx
import React, { FC } from 'react';
import type { Testimonial } from '@/types';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

interface TestimonialsPreviewProps {
  testimonials: Testimonial[];
}

export const TestimonialsPreviewSection: FC<TestimonialsPreviewProps> = ({ testimonials }) => {
  const testimonialsToShow = testimonials.slice(0, 3);

  return (
    <section id="testimonials-preview" className="py-24 sm:py-32 bg-white" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">ההצלחה שלהם, ההשראה שלכם</h2>
          <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            הם כבר בנו בית נאמן בישראל
          </p>
          <p className="max-w-xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">
            הסיפורים האמיתיים הם ההוכחה הטובה ביותר שהדרך שלנו עובדת.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonialsToShow.map((testimonial) => (
            <figure key={testimonial._id} className="flex flex-col justify-between p-8 bg-brand-light rounded-2xl shadow-lg border border-slate-100 transition-all duration-300 hover:shadow-cyan-500/10 hover:-translate-y-1">
              <blockquote className="text-lg text-brand-slate before:content-['“'] before:mr-1 before:text-3xl before:text-brand-cyan after:content-['”'] after:ml-1 after:text-3xl after:text-brand-cyan">
                <p className="inline">{testimonial.quote}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4 pt-6 border-t border-slate-200">
                {testimonial.imageUrl ? (
                  <img className="h-12 w-12 rounded-full bg-slate-50 object-cover" src={testimonial.imageUrl} alt={testimonial.authorName} />
                ) : (
                  <span className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <Icon name="user" className="w-6 h-6 text-slate-500" />
                  </span>
                )}
                <div>
                  <div className="font-semibold text-brand-dark">{testimonial.authorName}</div>
                  <div className="text-slate-500">{testimonial.authorRole}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-16 text-center">
            <Link href="/testimonials" className="text-lg font-semibold text-brand-cyan hover:text-cyan-700 transition-colors">
                לעוד סיפורי הצלחה והמלצות
            </Link>
        </div>
      </div>
    </section>
  );
};

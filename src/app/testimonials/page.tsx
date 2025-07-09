// src/app/testimonials/page.tsx
import { getTestimonials } from '@/lib/sanity';
import type { Testimonial } from '@/types';
import { Icon } from '@/components/Icon';

export const metadata = {
  title: "סיפורי הצלחה והמלצות | מעשיך יקרבוך",
  description: "זוגות, רבנים ואנשי מקצוע מספרים על החוויה שלהם עם המיזם שלנו.",
};

export default async function TestimonialsPage() {
  const testimonials: Testimonial[] = await getTestimonials();

  return (
    <div className="bg-brand-cream py-24 sm:py-32" dir="rtl">
      <main className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            הם כבר מצאו. עכשיו תורכם.
          </h1>
          <p className="mt-6 text-xl text-brand-dark/70 leading-relaxed">
            ההצלחה הגדולה ביותר שלנו היא לראות את הזוגות שבונים בתים נאמנים בישראל. הנה מה שיש להם, ולמומחים שמלווים אותנו, לספר.
          </p>
        </div>

        <div className="mt-20 max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial._id} className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
              <blockquote className="text-lg text-slate-800">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                {testimonial.imageUrl ? (
                  <img className="h-12 w-12 rounded-full bg-slate-50" src={testimonial.imageUrl} alt={testimonial.authorName} />
                ) : (
                  <span className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <Icon name="user" className="w-6 h-6 text-slate-500" />
                  </span>
                )}
                <div>
                  <div className="font-semibold text-brand-dark">{testimonial.authorName}</div>
                  <div className="text-slate-600">{testimonial.authorRole}</div>
                </div>
              </figcaption>
            </figure>
          ))}
          {testimonials.length === 0 && (
            <p className="col-span-full text-center text-slate-500">עדיין לא נוספו המלצות. בקרוב...</p>
          )}
        </div>
      </main>
    </div>
  );
}
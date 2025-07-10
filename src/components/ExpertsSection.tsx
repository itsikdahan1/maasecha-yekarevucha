// src/components/ExpertsSection.tsx
import React, { FC } from 'react';
// הסרנו את הקריאה לשרת מכאן
import type { Expert } from '@/types';

// יצרנו ממשק ל-props
interface ExpertsSectionProps {
  experts: Expert[];
}

// הקומפוננטה כבר לא async ומקבלת את המומחים כ-prop
export const ExpertsSection: FC<ExpertsSectionProps> = ({ experts }) => { 
  return (
    <section id="experts" className="py-24 sm:py-32 bg-brand-cream" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">ליווי אישי ומקצועי</h2>
          <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            נבחרת המומחים שלנו
          </p>
          <p className="max-w-xl mt-6 mx-auto text-lg text-brand-dark/70 leading-relaxed">
            ההצלחה שלך היא המשימה של כולנו. לכן בנינו נבחרת של אנשי מקצוע מהשורה הראשונה, שילוו אותך בדרך.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto justify-center">
          {experts.map((expert) => (
            <div key={expert._id} className="bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-slate-200 hover:-translate-y-2 border border-slate-100">
              <img 
                className="w-32 h-32 rounded-full mx-auto ring-4 ring-white shadow-lg object-cover" 
                src={expert.imageUrl || 'https://placehold.co/128x128/06b6d4/white?text=מומחה'} 
                alt={`תמונה של ${expert.name}`} 
              />
              <h3 className="mt-6 text-xl font-semibold text-brand-dark">{expert.name}</h3>
              <p className="mt-1 text-brand-cyan font-medium">{expert.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
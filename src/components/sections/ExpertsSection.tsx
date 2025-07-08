// src/components/sections/ExpertsSection.tsx

import React from 'react';
import Image from 'next/image'; // שימוש ברכיב התמונה של Next.js לביצועים טובים יותר

interface ExpertsSectionProps {
  experts: {
    name: string;
    role: string;
    imageUrl: string;
  }[];
}

export default function ExpertsSection({ experts }: ExpertsSectionProps) {
    return (
        <section id="experts" className="py-24 sm:py-32 bg-[#F9FAFB]" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-[#06b6d4] tracking-wider uppercase">ליווי אישי ומקצועי</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                        נבחרת המומחים שלנו
                    </p>
                    <p className="max-w-xl mt-6 mx-auto text-lg text-slate-600 leading-relaxed">
                        ההצלחה שלך היא המשימה של כולנו. לכן בנינו נבחרת של אנשי מקצוע מהשורה הראשונה, שילוו אותך בדרך.
                    </p>
                </div>
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                    {experts.map((expert) => (
                        <div key={expert.name} className="bg-white p-8 rounded-2xl text-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 border border-transparent hover:border-cyan-100">
                            <Image
                                className="w-32 h-32 rounded-full mx-auto ring-4 ring-white shadow-lg object-cover"
                                src={expert.imageUrl}
                                alt={`תמונה של ${expert.name}`}
                                width={128}
                                height={128}
                            />
                            <h3 className="mt-6 text-xl font-semibold text-slate-800">{expert.name}</h3>
                            <p className="mt-1 text-[#06b6d4] font-medium">{expert.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
'use client';
import React, { useEffect, useMemo } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import Icon from '@/components/ui/Icon';
// ... הגדרות Types נשארות זהות ...

export default function ProductionEveningSection({ info }: any) {
    const observerOptions = useMemo(() => ({ threshold: 0.1, rootMargin: '0px' }), []);
    const [setElements, entries] = useIntersectionObserver(observerOptions);
    useEffect(() => { const elements = Array.from(document.querySelectorAll('.fade-in-up')); setElements(elements as Element[]); }, [setElements]);
    useEffect(() => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }); }, [entries]);
    
    return (
        <section id="the-experience" className="py-24 sm:py-32 bg-[var(--color-bg-cream)]" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-20 fade-in-up">
                    <h2 className="text-lg font-semibold text-[var(--color-primary)] tracking-wider uppercase">{info.subtitle}</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold">{info.title}</p>
                    <p className="max-w-3xl mt-6 mx-auto text-lg text-[var(--color-ink-light)] leading-relaxed">{info.description}</p>
                </div>
                <div className="relative max-w-4xl mx-auto fade-in-up">
                    <div className="absolute left-1/2 -translate-x-1/2 top-10 h-[calc(100%-4rem)] w-0.5 bg-[var(--color-primary-light)] hidden md:block" aria-hidden="true"></div>
                    <div className="relative flex flex-col items-center gap-y-12">
                        {info.timeline.map((item: any, index: number) => (
                            <div key={index} className="w-full max-w-sm md:max-w-none grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-x-12 items-center">
                                <div className={`md:text-right ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-3'}`}>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/60 hover-effect">
                                        <h4 className="font-bold text-lg">{item.name}</h4>
                                        <p className="text-base text-[var(--color-ink-light)] mt-1">{item.description}</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-auto flex justify-center items-center my-4 md:my-0 md:col-start-2">
                                    <div className="group w-20 h-20 bg-white text-[var(--color-primary)] border-4 border-[var(--color-primary-light)] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:border-[var(--color-primary)]/50">
                                        <Icon name={item.icon} className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 fade-in-up mt-24">
                    {Object.values(info.workshops).map((workshop: any, i) => (
                        <div key={i} className="bg-white p-10 rounded-2xl shadow-xl border border-stone-200/80 hover-effect">
                             <h3 className="text-3xl font-bold text-slate-900 mb-8">{workshop.title}</h3>
                             <ul className="space-y-6">{workshop.items.map((item: any, index: number) => (<li key={index} className="flex items-start"><span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-[var(--color-primary)] text-white mt-1"><Icon name={item.title.includes('בונוס') ? 'gift' : 'check'} className="w-5 h-5" /></span><div className="mr-4"><p className="text-xl font-semibold text-slate-800">{item.title}</p><p className="text-slate-500 text-md">{item.expert}</p></div></li>))}</ul>
                         </div>
                     ))}
                </div>
            </div>
        </section>
    );
}
// src/components/Footer.tsx
import React, { FC } from 'react';
import { Icon } from './Icon';
import Link from 'next/link';

export const Footer: FC = () => {
    const emailSubject = encodeURIComponent('הגעתי דרך אתר "מעשיך יקרבוך"');
    const whatsappText = encodeURIComponent('שלום, ברצוני לקבוע שיחת ייעוץ');

    const mainLinks = [
        { href: '/#the-experience', text: 'החוויה שלנו' },
        { href: '/#community', text: 'הקהילה' },
        { href: '/#experts', text: 'המומחים שלנו' },
        { href: '/blog', text: 'מאמרים ובלוג' },
    ];

    const secondaryLinks = [
        { href: '/testimonials', text: 'סיפורי הצלחה' },
        { href: '/faq', text: 'שאלות ותשובות' },
        { href: '/terms', text: 'תקנון האתר' },
        { href: '/privacy', text: 'מדיניות פרטיות' },
    ];

    return (
        <footer className="bg-brand-dark text-slate-300" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">

                    <div className="flex flex-col items-center md:items-start text-center md:text-right lg:col-span-1">
                        <Link href="/" className="mb-4">
                           <img 
                             src="/images/LOGO.svg" 
                             alt="לוגו מעשיך יקרבוך"
                             className="h-14 w-auto"
                           />
                        </Link>
                        <p className="text-lg font-semibold text-white">מחברים בין לבבות, בדרך לחתונה.</p>
                    </div>

                    <div className="text-center md:text-right lg:col-span-2">
                        <h3 className="text-lg font-bold text-white tracking-wider mb-4">ניווט מהיר</h3>
                        <div className="flex justify-center md:justify-start gap-12">
                            <ul className="space-y-3 text-slate-400">
                                {mainLinks.map(link => (
                                    <li key={link.href}><a href={link.href} className="hover:text-brand-cyan transition-colors">{link.text}</a></li>
                                ))}
                            </ul>
                            <ul className="space-y-3 text-slate-400">
                                {secondaryLinks.map(link => (
                                    <li key={link.href}><Link href={link.href} className="hover:text-brand-cyan transition-colors">{link.text}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end text-center md:text-right lg:col-span-1">
                        <h3 className="text-lg font-bold text-white tracking-wider mb-4">דברו איתנו</h3>
                        <div className="flex flex-col items-center md:items-end gap-3 text-slate-400">
                            <a href={`mailto:SHIDUCHIM.MY@GMAIL.COM?subject=${emailSubject}`} className="group inline-flex items-center gap-3 hover:text-brand-cyan transition-colors">
                                SHIDUCHIM.MY@GMAIL.COM 
                                <Icon name="mail" className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </a>
                            <a href={`https://wa.me/972553080685?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 hover:text-brand-cyan transition-colors">
                                055-308-0685 
                                <Icon name="whatsapp" className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </a>
                        </div>
                        <a 
                            href={`https://wa.me/972553080685?text=${whatsappText}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-6 inline-block bg-brand-cyan text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-brand-cyan/20 transition-all duration-300 hover:bg-cyan-600 hover:scale-105"
                        >
                            קבעו שיחת ייעוץ
                        </a>
                    </div>
                </div>

                <div className="mt-20 border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} כל הזכויות שמורות למעשיך יקרבוך | עיצוב ופיתוח: 
                        <a href="tel:0559296626" className="font-semibold text-slate-400 hover:text-brand-cyan"> יצחק דהן - 055-9296626</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
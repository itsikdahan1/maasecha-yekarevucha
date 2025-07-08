// src/components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                        <Link href="/" className="text-3xl text-white font-bold">
                            מעשיך יקרבוך
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            הופכים את הדרך לחתונה לקצרה, נעימה ומוצלחת יותר. מיזם שידוכים חדשני ודיגיטלי למגזר הדתי והחרדי.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:col-span-2">
                        <div>
                            <h3 className="text-md font-semibold text-slate-400 tracking-wider uppercase">ניווט מהיר</h3>
                            <ul className="mt-4 space-y-3">
                                <li><Link href="/#the-experience" className="text-base text-slate-300 hover:text-white transition-colors">החוויה</Link></li>
                                <li><Link href="/#community" className="text-base text-slate-300 hover:text-white transition-colors">הקהילה</Link></li>
                                <li><Link href="/webinars" className="text-base text-slate-300 hover:text-white transition-colors">וובינרים</Link></li>
                                <li><Link href="/#blog" className="text-base text-slate-300 hover:text-white transition-colors">בלוג</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-slate-400 tracking-wider uppercase">מידע וקשר</h3>
                            <ul className="mt-4 space-y-3">
                                <li><a href="mailto:SHIDUCHIM.MY@GMAIL.COM" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Icon name="mail" className="w-5 h-5" /> SHIDUCHIM.MY@GMAIL.COM</a></li>
                                <li><a href="https://wa.me/972553080685" target="_blank" rel="noopener noreferrer" className="text-base text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Icon name="whatsapp" className="w-5 h-5" /> 055-308-0685</a></li>
                                <li><Link href="/terms" className="text-base text-slate-300 hover:text-white transition-colors">תקנון האתר</Link></li>
                                <li><Link href="/accessibility" className="text-base text-slate-300 hover:text-white transition-colors">הצהרת נגישות</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-slate-700 pt-8 text-center text-slate-400">
                    <p>© {new Date().getFullYear()} מעשיך יקרבוך. כל הזכויות שמורות.</p>
                </div>
            </div>
        </footer>
    );
}
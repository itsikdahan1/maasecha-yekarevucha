import React, { FC } from 'react';
import { Icon } from "@/components/ui/Icon";
import Link from 'next/link';

export const Footer: FC = () => {
    const emailAddress = "y@maasecha.com";
    const whatsappNumber = "972553080685";

    return (
        <footer className="bg-brand-dark text-slate-300" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-center lg:text-right">

                    {/* לוגו ותיאור */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                        <Link href="/" className="mb-4">
                           <img src="/images/LOGO.svg" alt="לוגו מעשיך יקרבוך" className="h-16 w-auto" />
                        </Link>
                        <p className="mt-2 text-lg font-semibold text-white">מחברים בין לבבות, בדרך לחתונה.</p>
                    </div>

                    {/* ניווט מהיר */}
                    <div className="lg:col-span-5 lg:col-start-6">
                        <h3 className="text-lg font-bold text-white tracking-wider mb-4">ניווט מהיר</h3>
                        <div className="flex justify-center lg:justify-start gap-12 text-base">
                            <ul className="space-y-3">
                                <li><a href="/#the-experience" className="text-slate-300 hover:text-white transition-colors">החוויה שלנו</a></li>
                                <li><a href="/#community" className="text-slate-300 hover:text-white transition-colors">הקהילה</a></li>
                                <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">מאמרים ובלוג</Link></li>
                            </ul>
                            <ul className="space-y-3">
                                <li><Link href="/testimonials" className="text-slate-300 hover:text-white transition-colors">סיפורי הצלחה</Link></li>
                                <li><Link href="/faq" className="text-slate-300 hover:text-white transition-colors">שאלות ותשובות</Link></li>
                                <li><Link href="/terms" className="text-slate-300 hover:text-white transition-colors">תקנון</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* יצירת קשר */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold text-white tracking-wider mb-4">דברו איתנו</h3>
                        <div className="flex flex-col items-center lg:items-start gap-3">
                            <a href={`mailto:${emailAddress}`} className="group inline-flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                                <Icon name="mail" className="w-5 h-5" />
                                {emailAddress}
                            </a>
                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                                <Icon name="whatsapp" className="w-5 h-5" />
                                055-308-0685 
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-24 border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
                    <p>© {new Date().getFullYear()} כל הזכויות שמורות למעשיך יקרבוך | עיצוב ופיתוח: 
                        <a href="tel:0559296626" className="font-semibold text-slate-300 hover:text-white"> יצחק דהן</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
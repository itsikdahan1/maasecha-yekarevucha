import React, { FC } from 'react';
import { Icon } from "@/components/ui/Icon";
import Link from 'next/link';

export const Footer: FC = () => {
    const emailAddress = "y@maasecha.com";
    const whatsappNumber = "972553080685";
    const whatsappJoinText = encodeURIComponent('שלום, אני מעוניין/ת להצטרף למחזור הקרוב של "מעשיך יקרבוך"');

    return (
        <footer className="bg-brand-dark text-slate-300" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-10 gap-12">

                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-right">
                        <Link href="/" className="mb-4">
                           <img src="/images/LOGO.svg" alt="לוגו מעשיך יקרבוך" className="h-14 w-auto" />
                        </Link>
                        <p className="text-lg font-semibold text-white">מחברים בין לבבות, בדרך לחתונה.</p>
                    </div>

                    <div className="md:col-span-4 text-center md:text-right">
                        <h3 className="text-lg font-bold text-white tracking-wider mb-4">ניווט מהיר</h3>
                        <div className="flex justify-center md:justify-start gap-12">
                            <ul className="space-y-3 text-slate-400">
                                <li><a href="/#the-experience" className="hover:text-brand-cyan transition-colors">החוויה שלנו</a></li>
                                <li><a href="/#community" className="hover:text-brand-cyan transition-colors">הקהילה</a></li>
                                <li><Link href="/blog" className="hover:text-brand-cyan transition-colors">מאמרים ובלוג</Link></li>
                            </ul>
                            <ul className="space-y-3 text-slate-400">
                                <li><Link href="/testimonials" className="hover:text-brand-cyan transition-colors">סיפורי הצלחה</Link></li>
                                <li><Link href="/faq" className="hover:text-brand-cyan transition-colors">שאלות ותשובות</Link></li>
                                <li><Link href="/terms" className="hover:text-brand-cyan transition-colors">תקנון</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-right">
                        <h3 className="text-lg font-bold text-white tracking-wider mb-4">דברו איתנו</h3>
                        <div className="flex flex-col items-center md:items-start gap-3 text-slate-400">
                            <a href={`mailto:${emailAddress}`} className="group inline-flex items-center gap-3 hover:text-brand-cyan transition-colors">
                                {emailAddress}
                                <Icon name="mail" className="w-5 h-5" />
                            </a>
                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 hover:text-brand-cyan transition-colors">
                                055-308-0685 
                                <Icon name="whatsapp" className="w-5 h-5" />
                            </a>
                        </div>
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
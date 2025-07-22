// src/components/shared/Footer.tsx
import React, { FC } from 'react';
import { Icon } from "@/components/ui/Icon";
import Link from 'next/link';

export const Footer: FC = () => {
    const emailAddress = "y@maasecha.com";
    const whatsappNumber = "972553080685";
    const whatsappCommunityText = encodeURIComponent('שלום, ברצוני להצטרף לקהילת הסטטוסים של "מעשיך יקרבוך"');

    return (
        <footer className="bg-brand-dark text-slate-300 border-t-4 border-brand-cyan" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-center lg:text-right">

                    {/* ... עמודות אחרות ... */}
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
                        <Link href="/" className="mb-4">
                           <img src="/images/LOGO.svg" alt="לוגו מעשיך יקרבוך" className="h-16 w-auto" />
                        </Link>
                        <p className="mt-2 text-lg font-semibold text-white">מחברים בין לבבות, בדרך לחתונה.</p>
                    </div>

                    {/* ... שאר העמודות ... */}
                     <div className="lg:col-span-2">
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">ניווט</h3>
                        <ul className="space-y-2 text-base">
                            <li><a href="/#the-experience" className="text-slate-300 hover:text-white transition-colors">החוויה</a></li>
                            <li><Link href="/blog" className="text-slate-300 hover:text-white transition-colors">בלוג</Link></li>
                            <li><Link href="/faq" className="text-slate-300 hover:text-white transition-colors">שאלות נפוצות</Link></li>
                        </ul>
                    </div>

                     <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-4">יצירת קשר</h3>
                         <ul className="space-y-2 text-base">
                            <li>
                                <a href={`mailto:${emailAddress}`} className="inline-flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                                    <Icon name="mail" className="w-5 h-5" />
                                    {emailAddress}
                                </a>
                            </li>
                             <li>ז
                                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                                    <Icon name="whatsapp" className="w-5 h-5" />
                                    055-308-0685 
                                </a>
                             </li>
                        </ul>
                    </div>
                    
                    <div className="lg:col-span-4 bg-slate-800/50 p-6 rounded-lg text-center">
                         <h3 className="text-lg font-bold text-white mb-2">הצטרפו לקהילה השקטה</h3>
                         <p className="text-slate-400 text-sm mb-4">עדכונים, טיפים וסיפורים ישירות לוואטסאפ, פעם ביום.</p>
                         <a href={`https://wa.me/972553080685?text=${whatsappCommunityText}`} target="_blank" rel="noopener noreferrer" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                            <Icon name="whatsappBubble" className="w-6 h-6"/>
                            <span>הצטרפות לסטטוסים</span>
                         </a>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
                    <p>© {new Date().getFullYear()} כל הזכויות שמורות למעשיך יקרבוך</p>
                    <p className="mt-1">
                        עיצוב ופיתוח: 
                        {/* ======================= התיקון כאן ======================= */}
                        <a href="https://wa.me/972559296626" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-white mx-1">יצחק דהן</a>
                        {/* ===================== סוף התיקון ======================= */}
                    </p>
                </div>
            </div>
        </footer>
    );
};
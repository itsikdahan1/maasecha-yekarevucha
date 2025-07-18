// NewsletterPopup.tsx
'use client';

import React, { useState, useEffect, useRef, FC } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

export const NewsletterPopup: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const pathname = usePathname();
    const triggerRef = useRef(false);

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem('seenNewsletterPopup');
        
        // --- שדרוג אסטרטגי ---
        // 1. הפעל רק בעמוד הבית.
        // 2. הפעל רק אם המשתמש לא ראה את הפופ-אפ בעבר.
        if (pathname !== '/' || hasSeenPopup) {
            return;
        }

        const showPopup = () => {
            if (triggerRef.current) return;
            triggerRef.current = true;
            setIsOpen(true);
            window.removeEventListener('scroll', handleScroll);
        };

        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage >= 60) {
                showPopup();
            }
        };

        const timer = setTimeout(showPopup, 15000); // טריגר זמן: 15 שניות
        window.addEventListener('scroll', handleScroll, { passive: true }); // טריגר גלילה: 60%

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    const closePopup = () => {
        localStorage.setItem('seenNewsletterPopup', 'true');
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setStatus('error');
            setMessage('אנא הזן/י כתובת מייל תקינה.');
            return;
        }
        setStatus('submitting');
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, listId: 'newsletter' }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'אופס, משהו השתבש.');
            }
            setStatus('success');
            setMessage('נרשמת בהצלחה! קופון ההנחה יישלח למייל שלך בקרוב.');
            setEmail('');
            setTimeout(closePopup, 3000);
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[200]"
                    onClick={closePopup}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col items-center text-center p-8 sm:p-12"
                        dir="rtl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* כפתור סגירה */}
                        <button onClick={closePopup} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full" aria-label="סגור פופ-אפ"> {/* <-- שינוי left-4 ל-right-4 */}
                            <Icon name="x" className="w-6 h-6 text-slate-500" />
                        </button>
                        
                        <Icon name="gift" className="w-16 h-16 text-brand-cyan" />

                        <h3 className="mt-4 text-3xl font-bold text-brand-dark text-right w-full">רגע לפני שממשיכים...</h3> {/* <-- הוספת text-right ו-w-full */}
                        <p className="mt-2 text-2xl sm:text-4xl font-bold text-brand-cyan text-right w-full">10% הנחה במתנה!</p> {/* <-- שינוי text-4xl ל-text-2xl sm:text-4xl, הוספת text-right ו-w-full */}
                        <p className="mt-4 text-lg text-brand-slate max-w-md text-right w-full"> {/* <-- הוספת text-right ו-w-full */}
                            הצטרפו לניוזלטר שלנו וקבלו קופון הנחה חד-פעמי לערב ההפקה הקרוב, יחד עם עדכונים, טיפים וכלים שיעזרו לכם בדרך לחופה.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="כתובת המייל שלך"
                                    required
                                    className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan text-right" // <-- הוספת text-right
                                />
                                <button type="submit" disabled={status === 'submitting'} className="btn-dark whitespace-nowrap">
                                    {status === 'submitting' ? 'שולח...' : 'קבלת קופון'}
                                </button>
                            </div>
                            {message && (
                                <p className={`mt-3 text-sm font-semibold ${status === 'success' ? 'text-green-600' : 'text-red-600'} text-right`}> {/* <-- הוספת text-right */}
                                    {message}
                                </p>
                            )}
                        </form>
                        <p className="mt-4 text-xs text-slate-400 text-right w-full">אנו מכבדים את פרטיותך. ניתן להסיר את עצמך בכל עת.</p> {/* <-- הוספת text-right ו-w-full */}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
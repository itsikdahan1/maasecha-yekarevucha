'use client';
import React, { useState, FC, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from "@/components/ui/Icon";
import { AIChat } from "@/components/features/AIChat";
import { AccessibilityMenu } from "@/components/features/AccessibilityMenu";
import { MobileMenuContext } from '@/app/RootLayoutClient';

export const FloatingButtons: FC = () => {
    const { isMobileMenuOpen } = useContext(MobileMenuContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const whatsappText = encodeURIComponent('שלום, הגעתי דרך האתר ויש לי שאלה');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleScroll = () => {
            setShowScrollToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const mainButtonVariants = {
        open: { rotate: 45 },
        closed: { rotate: 0 },
    };

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.3 },
        },
        closed: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.2 },
        },
    };

    const buttons = [
        ...(showScrollToTop ? [{ label: "גלול למעלה", icon: "arrowUp", action: scrollToTop, bgColor: "bg-brand-dark" }] : []),
        { label: "פתח צ'אט עם יועץ AI", icon: "aiChat", action: () => { setIsChatOpen(true); setIsMenuOpen(false); }, bgColor: "bg-brand-cyan" },
        { label: "צור קשר בוואטסאפ", icon: "whatsappBubble", action: () => { window.open(`https://wa.me/972553080685?text=${whatsappText}`, '_blank'); setIsMenuOpen(false); }, bgColor: "bg-green-500" },
    ];

    return (
        <>
            <AnimatePresence>
                {isChatOpen && <AIChat toggle={() => setIsChatOpen(false)} />}
                {isAccessibilityOpen && <AccessibilityMenu toggle={() => setIsAccessibilityOpen(false)} />}
            </AnimatePresence>

            <AnimatePresence>
                {!isMobileMenuOpen && (
                    <motion.div
                        className="fixed bottom-6 left-6 z-[100] md:bottom-8 md:left-8"
                        initial={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
                    >
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    className="absolute left-0 flex flex-col-reverse items-end gap-y-3 sm:gap-y-4"
                                    style={{ bottom: `calc(3.5rem + 1rem)` }}
                                >
                                    {buttons.map((button, i) => (
                                        <motion.button
                                            key={button.label}
                                            onClick={button.action}
                                            className={`flex items-center justify-center h-12 w-12 rounded-full text-white font-semibold shadow-lg ${button.bgColor} md:h-14 md:w-14`}
                                            variants={itemVariants}
                                            custom={i}
                                            aria-label={button.label}
                                            title={button.label}
                                        >
                                            <Icon name={button.icon} className="w-6 h-6 md:w-7 md:h-7" />
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center justify-center h-14 w-14 rounded-full text-white font-semibold shadow-xl bg-brand-dark hover:bg-slate-700 transition-colors relative z-10 md:h-16 md:w-16"
                            animate={isMenuOpen ? "open" : "closed"}
                            variants={mainButtonVariants}
                            aria-label={isMenuOpen ? "סגור תפריט פעולות" : "פתח תפריט פעולות"}
                        >
                            <Icon name={isMenuOpen ? "x" : "sparkles"} className="w-7 h-7 md:w-8 md:h-8" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!isMobileMenuOpen && (
                    <motion.button
                        onClick={() => setIsAccessibilityOpen(true)}
                        className="fixed bottom-6 right-6 z-[100] flex items-center justify-center rounded-full text-white font-semibold shadow-xl bg-brand-cyan hover:bg-cyan-600 transition-colors h-14 w-14 md:h-16 md:w-16"
                        aria-label="פתח תפריט נגישות"
                        title="פתח תפריט נגישות"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.3, ease: "easeOut" as const } }}
                        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                    > 
                        <Icon name="accessibilityNew" className="w-8 h-8 md:w-9 md:h-9" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};
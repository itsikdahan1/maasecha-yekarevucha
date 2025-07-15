'use client';
import React, { useState, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from "@/components/ui/Icon";
import { AIChat } from "@/components/features/AIChat";
import { AccessibilityMenu } from "@/components/features/AccessibilityMenu";

export const FloatingButtons: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    
    const whatsappText = encodeURIComponent('שלום, הגעתי דרך האתר ויש לי שאלה');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const mainButtonVariants = {
        open: { rotate: 45 },
        closed: { rotate: 0 },
    };

    const itemVariants = {
        open: (i: number) => ({
            y: -((i + 1) * 65),
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        }),
        closed: {
            y: 0,
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    const buttons = [
        { label: "למעלה", icon: "arrowUp", action: scrollToTop, bgColor: "bg-brand-dark" },
        { label: "נגישות", icon: "accessibilityNew", action: () => setIsAccessibilityOpen(true), bgColor: "bg-slate-700" },
        { label: "יועץ AI", icon: "aiLetters", action: () => setIsChatOpen(true), bgColor: "bg-brand-cyan" },
        { label: "וואטסאפ", icon: "whatsappSolid", action: () => window.open(`https://wa.me/972553080685?text=${whatsappText}`, '_blank'), bgColor: "bg-green-500" },
    ];

    return (
        <>
            <AnimatePresence>
                {isChatOpen && <AIChat toggle={() => setIsChatOpen(false)} />}
                {isAccessibilityOpen && <AccessibilityMenu toggle={() => setIsAccessibilityOpen(false)} />}
            </AnimatePresence>
            
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
                <AnimatePresence>
                    {isOpen && buttons.map((button, i) => (
                        <motion.button
                            key={button.label}
                            onClick={() => { button.action(); setIsOpen(false); }}
                            className={`flex items-center justify-center h-14 w-14 rounded-full text-white font-semibold shadow-lg ${button.bgColor} mb-4`}
                            variants={itemVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            custom={i}
                            aria-label={button.label}
                            title={button.label}
                        >
                            <Icon name={button.icon} className="w-7 h-7" />
                        </motion.button>
                    ))}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center h-16 w-16 rounded-full text-white font-semibold shadow-xl bg-brand-dark hover:bg-slate-700 transition-colors"
                    animate={isOpen ? "open" : "closed"}
                    variants={mainButtonVariants}
                    aria-label={isOpen ? "סגור תפריט עזר" : "פתח תפריט עזר"}
                >
                    <Icon name={isOpen ? "x" : "sparkles"} className="w-8 h-8"/>
                </motion.button>
            </div>
        </>
    );
};
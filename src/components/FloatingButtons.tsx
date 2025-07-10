// src/components/FloatingButtons.tsx
'use client';
import React, { useState, FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { AIChat } from './AIChat'; 
import { AccessibilityMenu } from './AccessibilityMenu';

export const FloatingButtons: FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    
    const whatsappText = encodeURIComponent('שלום, הגעתי דרך האתר ויש לי שאלה');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const buttons = [
        { 
            label: "וואטסאפ", 
            icon: "whatsappSolid", 
            action: () => window.open(`https://wa.me/972553080685?text=${whatsappText}`, '_blank'), 
            isLink: true,
            bgColor: "bg-green-500 hover:bg-green-600",
            ariaLabel: "יצירת קשר בוואטסאפ"
        },
        { 
            label: "יועץ AI", 
            icon: "aiLetters", // ⬇️ התיקון כאן: החלפנו לאייקון 'aiLetters' ⬇️
            action: () => setIsChatOpen(true), 
            isLink: false,
            bgColor: "bg-brand-cyan hover:bg-cyan-600",
            ariaLabel: "פתיחת צ'אט עם יועץ חכם"
        },
        { 
            label: "נגישות", 
            icon: "accessibilityNew", 
            action: () => setIsAccessibilityOpen(true), 
            isLink: false,
            bgColor: "bg-slate-700 hover:bg-slate-800",
            ariaLabel: "פתיחת תפריט נגישות"
        },
        { 
            label: "למעלה", 
            icon: "arrowUp", 
            action: scrollToTop, 
            isLink: false,
            bgColor: "bg-brand-dark hover:bg-slate-700",
            ariaLabel: "חזרה לראש העמוד"
        },
    ];

    return (
        <>
            <AnimatePresence>
                {isChatOpen && <AIChat toggle={() => setIsChatOpen(false)} />}
                {isAccessibilityOpen && <AccessibilityMenu toggle={() => setIsAccessibilityOpen(false)} />}
            </AnimatePresence>
            
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
                {buttons.map((button) => {
                    const commonClasses = "flex items-center justify-center h-14 w-14 md:w-auto md:px-4 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105";
                    
                    const buttonContent = (
                        <>
                            {/* שינינו את גודל האייקון כדי להתאים אותו לטקסט */}
                            <Icon name={button.icon} className="w-8 h-8 md:w-7 md:h-7 flex-shrink-0"/>
                            <span className="text-sm hidden md:inline mr-2">{button.label}</span>
                        </>
                    );
                    
                    if (button.isLink) {
                        return ( <a key={button.label} href="#" onClick={(e) => { e.preventDefault(); button.action(); }} className={`${commonClasses} ${button.bgColor}`} title={button.label} aria-label={button.ariaLabel}>{buttonContent}</a> );
                    }

                    return ( <button key={button.label} onClick={button.action} className={`${commonClasses} ${button.bgColor}`} aria-label={button.ariaLabel} title={button.label}>{buttonContent}</button> );
                })}
            </div>
        </>
    );
};
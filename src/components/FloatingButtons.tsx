// src/components/FloatingButtons.tsx
'use client';
import React, { useState, FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { AIChat } from './AIChat'; 
import { AccessibilityMenu } from './AccessibilityMenu'; // הייבוא מעודכן לשם החדש

export const FloatingButtons: FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    
    const whatsappText = encodeURIComponent('שלום, הגעתי דרך האתר ויש לי שאלה');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <AnimatePresence>
                {isChatOpen && <AIChat toggle={() => setIsChatOpen(false)} />}
                {isAccessibilityOpen && <AccessibilityMenu toggle={() => setIsAccessibilityOpen(false)} />}
            </AnimatePresence>
            
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
                <a 
                    href={`https://wa.me/972553080685?text=${whatsappText}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300" 
                    aria-label="יצירת קשר בוואטסאפ"
                    title="יצירת קשר בוואטסאפ"
                >
                    <Icon name="whatsappSolid" className="w-8 h-8"/>
                </a>
                
                <button 
                    onClick={() => setIsChatOpen(true)} 
                    className="group relative w-16 h-16 rounded-full bg-brand-cyan text-white flex items-center justify-center shadow-lg hover:bg-cyan-600 hover:scale-110 transition-all duration-300" 
                    aria-label="פתיחת צ'אט עם יועץ חכם"
                    title="צ'אט עם יועץ AI"
                >
                    <Icon name="sparkles" className="w-8 h-8"/>
                </button>

                <button 
                    onClick={() => setIsAccessibilityOpen(true)} 
                    className="group relative w-16 h-16 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-lg hover:bg-slate-800 hover:scale-110 transition-all duration-300" 
                    aria-label="פתיחת תפריט נגישות"
                    title="תפריט נגישות"
                >
                    <Icon name="accessibilityNew" className="w-8 h-8"/>
                </button>

                <button 
                    onClick={scrollToTop} 
                    className="group relative w-14 h-14 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-lg hover:bg-slate-700 hover:scale-110 transition-all duration-300" 
                    aria-label="חזרה לראש העמוד"
                    title="חזרה לראש העמוד"
                >
                    <Icon name="arrowUp" className="w-7 h-7"/>
                </button>
            </div>
        </>
    );
};
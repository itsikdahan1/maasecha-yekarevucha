import React from 'react';
import { Icon } from './Icon'; // Make sure to import Icon component

export const FloatingButtons = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
             <a href="https://wa.me/972553080685" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Chat on WhatsApp">
                <Icon name="whatsapp" className="w-8 h-8"/>
            </a>
            <button onClick={scrollToTop} className="w-14 h-14 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Back to top">
                <Icon name="arrowUp" className="w-7 h-7"/>
            </button>
        </div>
    );
};
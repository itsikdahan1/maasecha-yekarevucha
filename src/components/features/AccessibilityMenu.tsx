'use client';
import React, { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

export const AccessibilityMenu: FC<{ toggle: () => void }> = ({ toggle }) => {
  const [fontSize, setFontSize] = useState(1);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 0.1, 2.0));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 0.1, 0.8));

  const resetAllSettings = () => {
    setFontSize(1);
    document.documentElement.classList.remove('high-contrast', 'readable-font', 'underline-links');
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
    return () => { document.documentElement.style.fontSize = '100%'; };
  }, [fontSize]);

  const accessibilityOptions = [
    { label: 'ניגודיות גבוהה', action: () => document.documentElement.classList.toggle('high-contrast'), id: 'high-contrast' },
    { label: 'פונט קריא', action: () => document.documentElement.classList.toggle('readable-font'), id: 'readable-font' },
    { label: 'קו תחתון לקישורים', action: () => document.documentElement.classList.toggle('underline-links'), id: 'underline-links' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={toggle}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <h4 className="font-bold text-slate-800">תפריט נגישות</h4>
          <button onClick={toggle} className="p-1 hover:bg-slate-200 rounded-full" aria-label="סגור תפריט נגישות">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </header>
        <div className="p-6 space-y-4">
          {accessibilityOptions.map((option) => (
            <button key={option.label} onClick={option.action} className="w-full text-right px-4 py-3 bg-slate-100 hover:bg-brand-cyan hover:text-white rounded-lg transition-colors duration-200 font-semibold text-slate-700">
              {option.label}
            </button>
          ))}
          <div className="pt-4 border-t">
            <p className="text-right font-semibold text-slate-700 mb-3">שנה גודל טקסט</p>
            <div className="flex gap-x-4">
              <button onClick={decreaseFontSize} className="btn-dark flex-1">א-</button>
              <button onClick={increaseFontSize} className="btn-dark flex-1">א+</button>
            </div>
          </div>
          <div className="pt-4 border-t">
             <button onClick={resetAllSettings} className="w-full text-center px-4 py-3 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 font-semibold">
                אפס את כל ההגדרות
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
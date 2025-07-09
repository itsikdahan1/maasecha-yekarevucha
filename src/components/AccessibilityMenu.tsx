// src/components/AccessibilityMenu.tsx
'use client';
import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

interface AccessibilityMenuProps {
  toggle: () => void;
}

export const AccessibilityMenu: FC<AccessibilityMenuProps> = ({ toggle }) => {
  
  const accessibilityOptions = [
    {
      label: 'ניגודיות גבוהה',
      action: () => document.documentElement.classList.toggle('high-contrast'),
    },
    {
      label: 'פונט קריא',
      action: () => document.documentElement.classList.toggle('readable-font'),
    },
    {
      label: 'קו תחתון לקישורים',
      action: () => document.documentElement.classList.toggle('underline-links'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
      onClick={toggle} // מאפשר סגירה בלחיצה על הרקע
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col"
        dir="rtl"
        onClick={(e) => e.stopPropagation()} // מונע סגירה בלחיצה על התפריט עצמו
      >
        <header className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <h4 className="font-bold text-slate-800">תפריט נגישות</h4>
          <button onClick={toggle} className="p-1 hover:bg-slate-200 rounded-full" aria-label="סגור תפריט נגישות">
            <Icon name="x" className="w-5 h-5" />
          </button>
        </header>
        <div className="p-6 space-y-4">
          {accessibilityOptions.map((option) => (
            <button
              key={option.label}
              onClick={option.action}
              className="w-full text-right px-4 py-3 bg-slate-100 hover:bg-brand-cyan hover:text-white rounded-lg transition-colors duration-200 font-semibold text-slate-700"
            >
              {option.label}
            </button>
          ))}
        </div>
        <footer className="p-4 text-center text-xs text-slate-400">
            השינויים נשמרים אוטומטית.
        </footer>
      </div>
    </motion.div>
  );
};
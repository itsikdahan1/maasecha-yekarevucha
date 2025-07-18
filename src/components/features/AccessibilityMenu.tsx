// src/components/features/AccessibilityMenu.tsx
'use client';
import React, { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

export const AccessibilityMenu: FC<{ toggle: () => void }> = ({ toggle }) => {
  const [fontSize, setFontSize] = useState(1);
  const [activeSettings, setActiveSettings] = useState<{[key: string]: boolean}>({});

  const accessibilityClassNames = ['high-contrast', 'readable-font', 'underline-links'];

  useEffect(() => {
    // טען מצב הגדרות מפדב"א כשנפתח
    if (typeof window === 'undefined' || !document.documentElement) return;

    const loadedSettings: {[key: string]: boolean} = {};
    accessibilityClassNames.forEach(cls => {
      loadedSettings[cls] = document.documentElement.classList.contains(cls);
    });
    setActiveSettings(loadedSettings);

    const currentFontSize = parseFloat(document.documentElement.style.fontSize || '100%') / 100;
    setFontSize(currentFontSize);
  }, []);

  // עדכן גודל פונט DOM
  useEffect(() => {
    if (typeof window === 'undefined' || !document.documentElement) return;
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
  }, [fontSize]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 0.1, 2.0));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 0.1, 0.8));

  const toggleSetting = (settingId: string) => {
    if (typeof window === 'undefined' || !document.documentElement) return;
    document.documentElement.classList.toggle(settingId);
    setActiveSettings(prev => ({ ...prev, [settingId]: !prev[settingId] }));
  };

  const resetAllSettings = () => {
    if (typeof window === 'undefined' || !document.documentElement) return;
    setFontSize(1);
    accessibilityClassNames.forEach(cls => {
      document.documentElement.classList.remove(cls);
    });
    setActiveSettings({});
  };

  const accessibilityOptions = [
    { label: 'ניגודיות גבוהה', id: 'high-contrast', icon: 'moon' },
    { label: 'פונט קריא (Arial)', id: 'readable-font', icon: 'bookOpen' },
    { label: 'קו תחתון לקישורים', id: 'underline-links', icon: 'link' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[200]" // p-4 לשוליים מסביב למודל
      onClick={toggle}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        // שינויים: max-w-xs (צרה יותר למובייל), max-h, overflow-y-auto, flex-col
        className="relative w-full max-w-xs md:max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-y-auto"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header של המודל - flex-shrink-0 כדי שלא יתכווץ */}
        <header className="p-4 sm:p-5 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl flex-shrink-0">
          <h4 className="font-bold text-lg text-slate-800">תפריט נגישות</h4>
          <button onClick={toggle} className="p-2 hover:bg-slate-200 rounded-full" aria-label="סגור תפריט נגישות">
            <Icon name="x" className="w-6 h-6 text-slate-600" />
          </button>
        </header>

        {/* תוכן המודל - flex-grow כדי שימלא את השטח הפנוי ויאפשר גלילה */}
        <div className="p-4 sm:p-6 space-y-4 flex-grow">
          {accessibilityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleSetting(option.id)}
              className={`w-full text-right px-4 py-3 rounded-lg transition-all duration-300 font-semibold flex justify-between items-center shadow-sm ${
                activeSettings[option.id]
                  ? 'bg-brand-cyan text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon name={option.icon as any} className="w-5 h-5 text-current" />
                {option.label}
              </span>
              {activeSettings[option.id] && <Icon name="checkCircle" className="w-6 h-6 ml-2 text-white" />}
            </button>
          ))}
          <div className="pt-4 sm:pt-6 border-t border-slate-200 mt-4 sm:mt-6">
            <p className="text-right font-semibold text-slate-700 mb-3">שנה גודל טקסט</p>
            <div className="flex gap-x-4 justify-end">
              <button onClick={decreaseFontSize} className="btn-dark flex-1 px-4 py-3 shadow-sm" aria-label="הקטן גודל טקסט">
                <Icon name="minus" className="w-6 h-6 mx-auto" />
              </button>
              <button onClick={increaseFontSize} className="btn-dark flex-1 px-4 py-3 shadow-sm" aria-label="הגדל גודל טקסט">
                <Icon name="plus" className="w-6 h-6 mx-auto" />
              </button>
            </div>
            <p className="text-center text-slate-600 mt-2 text-sm">גודל נוכחי: {Math.round(fontSize * 100)}%</p>
          </div>
        </div>

        {/* Footer של המודל (כפתור האיפוס) - flex-shrink-0 כדי שלא יתכווץ */}
        <div className="p-4 sm:p-6 border-t border-slate-200 flex-shrink-0">
             <button onClick={resetAllSettings} className="w-full text-center px-4 py-3 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200 font-semibold shadow-sm" aria-label="אפס את כל הגדרות הנגישות">
                אפס את כל ההגדרות
             </button>
          </div>
      </motion.div>
    </motion.div>
  );
};
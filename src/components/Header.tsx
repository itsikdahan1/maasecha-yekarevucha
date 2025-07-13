// src/components/Header.tsx
'use client';

import React, { useState, FC } from 'react';
import { Icon } from './Icon';
import Link from 'next/link';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // החזרנו את "כלי עזר" והפכנו את הניווט לקישורי Link
  const navLinks = [
    { name: "החוויה", href: "/#the-experience" },
    { name: "קהילה", href: "/#community" },
    { name: "כלי עזר", href: "/#ai-tools" },
    { name: "מומחים", href: "/#experts" },
    { name: "בלוג", href: "/blog" },
    { name: "שאלות ותשובות", href: "/faq" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-3" aria-label="חזרה לדף הבית">
            <img src="/images/LOGO.svg" alt="לוגו מעשיך יקרבוך" className="h-14 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-x-10">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-brand-slate hover:text-brand-cyan text-lg font-semibold transition-colors duration-300">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link href="/register" className="btn-dark">
              התחלת המסע
            </Link>
          </div>
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="p-2 inline-flex items-center justify-center text-brand-slate hover:text-brand-cyan rounded-lg" aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}>
              {isMenuOpen ? <Icon name="x" className="w-8 h-8"/> : <Icon name="menu" className="w-8 h-8"/>}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-brand-slate hover:bg-brand-light-gray hover:text-brand-cyan block px-3 py-3 rounded-md text-base font-medium transition-colors">
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-2">
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="btn-dark w-full block text-center">
                התחלת המסע
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
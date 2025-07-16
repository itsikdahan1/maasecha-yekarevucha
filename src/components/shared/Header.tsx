'use client';
import React, { useState, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from "@/components/ui/Icon";
import Link from 'next/link';

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "החוויה", href: "/#the-experience" },
    { name: "קהילה", href: "/#community" },
    { name: "מומחים", href: "/#experts" },
    { name: "בלוג", href: "/blog" },
    { name: "ממליצים", href: "/testimonials" },
    { name: "שאלות ותשובות", href: "/faq" },
    { name: "היועץ החכם", href: "/#ai-tools" },
  ];

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.05, ease: "easeOut" },
    }),
  };

  return (
    // שינוי מבני: עטיפה ב-Fragment כדי להפריד את ה-Header מהתפריט הנפתח
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl shadow-sm" dir="rtl">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* לוגו בצד ימין */}
            <div className="lg:flex-1">
              <Link href="/" aria-label="חזרה לדף הבית">
                <img src="/images/LOGO.svg" alt="לוגו מעשיך יקרבוך" className="h-14 w-auto" />
              </Link>
            </div>
            
            {/* ניווט אמצעי (דסקטופ) */}
            <nav className="hidden lg:flex items-center justify-center gap-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-brand-slate hover:text-brand-cyan text-base font-semibold transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* כפתור בצד שמאל (דסקטופ) */}
            <div className="hidden lg:flex flex-1 justify-end">
              <Link href="/how-it-works" className="btn-dark">איך מתחילים?</Link>
            </div>

            {/* כפתור תפריט מובייל */}
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(true)} className="p-2" aria-label="פתח תפריט">
                <Icon name="menu" className="w-8 h-8 text-brand-dark" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* תפריט מובייל במסך מלא (מחוץ ל-header) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-brand-cream z-50 flex flex-col items-center justify-center p-6 lg:hidden"
          >
            <div className="absolute top-6 right-6">
                <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="סגור תפריט">
                    <Icon name="x" className="w-8 h-8 text-brand-dark" />
                </button>
            </div>
            
            <nav className="flex flex-col items-center text-center gap-y-8">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} custom={i} variants={linkVariants}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold text-brand-dark hover:text-brand-cyan transition-colors">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div custom={navLinks.length} variants={linkVariants} className="mt-8">
                <Link href="/how-it-works" onClick={() => setIsMenuOpen(false)} className="btn-primary text-xl">
                  איך מתחילים?
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
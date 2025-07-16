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
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="z-[101]" aria-label="חזרה לדף הבית">
            <img src="/images/LOGO.svg" alt="לוגו מעשיך יקרבוך" className="h-14 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-x-10">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-brand-slate hover:text-brand-cyan text-lg font-semibold transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Link href="/how-it-works" className="btn-dark">איך מתחילים?</Link>
          </div>
          <div className="lg:hidden z-[101]">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}>
              <Icon name={isMenuOpen ? "x" : "menu"} className="w-8 h-8 text-brand-dark" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-brand-cream z-[100] flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-y-8">
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
    </header>
  );
};
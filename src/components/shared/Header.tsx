// src/components/shared/Header.tsx
'use client';

import React, { FC, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from "@/components/ui/Icon";
import { ActiveSectionContext, MobileMenuContext } from '@/app/RootLayoutClient';

export const Header: FC = () => {
    const pathname = usePathname();
    const { activeSectionId, setActiveSectionId } = useContext(ActiveSectionContext);
    const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(MobileMenuContext);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            if (window.scrollY < lastScrollY) {
                setIsVisible(true);
            }
            else if (window.scrollY > lastScrollY && window.scrollY > 100) {
                setIsVisible(false);
            }
            else if (window.scrollY <= 100) {
                setIsVisible(true);
            }
            
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const lastPathnameRef = React.useRef(pathname);
    useEffect(() => {
        if (isMobileMenuOpen && (pathname !== lastPathnameRef.current || !pathname.includes('#'))) {
            setIsMobileMenuOpen(false);
        }
        lastPathnameRef.current = pathname;
    }, [pathname, isMobileMenuOpen, setIsMobileMenuOpen]);


    const navLinks = [
        { name: "החוויה", href: "/#the-experience" },
        { name: "קהילה", href: "/#community" },
        { name: "מומחים", href: "/#experts" },
        { name: "גלריה", href: "/gallery" },
        { name: "בלוג", href: "/blog" },
        { name: "ממליצים", href: "/testimonials" },
        { name: "שאלות ותשובות", href: "/faq" },
        { name: "היועץ החכם", href: "/ai-tools", icon: "sparkles" },
    ];

    // תיקונים של 'ease' בכל הווריאנטים
    const mobileMenuVariants = {
        hidden: { opacity: 0, y: "-100%" },
        visible: {
            opacity: 1,
            y: "0%",
            transition: {
                duration: 0.4,
                ease: "easeOut" as const, // תיקון ה-ease
                when: "beforeChildren",
                staggerChildren: 0.06,
            },
        },
        exit: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.3, ease: "easeIn" as const }, // תיקון ה-ease
        },
    };

    const mobileLinkVariants = {
        hidden: { x: -30, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } }, // תיקון ה-ease
    };

    const ctaMobileVariant = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { delay: navLinks.length * 0.06 + 0.1, duration: 0.4, ease: "easeOut" as const } }, // תיקון ה-ease
    };

    const isActiveLink = (href: string) => {
        if (href.includes('#')) {
            const [basePath, fragment] = href.split('#');
            return (pathname === basePath || (pathname === '/' && basePath === '')) && activeSectionId === fragment;
        }
        return pathname === href;
    };


    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm transition-transform duration-300 ease-out w-full ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
                dir="rtl"
            >
                <div className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between relative">
                    <div className="flex-shrink-0 z-20">
                        <Link href="/" aria-label="חזרה לדף הבית">
                            <Image 
                                src="/images/LOGO.svg" 
                                alt="לוגו מעשיך יקרבוך" 
                                width={160}
                                height={40}
                                className="h-10 md:h-14 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    <nav className="hidden md:absolute md:inset-x-0 md:flex md:justify-center md:items-center h-full z-10">
                        <ul className="flex space-x-8 space-x-reverse">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`group relative text-base font-semibold transition-colors duration-300 flex items-center whitespace-nowrap
                                            ${isActiveLink(link.href)
                                                ? 'text-brand-cyan'
                                                : 'text-brand-slate hover:text-brand-cyan'
                                            }
                                        `}
                                        onClick={(e) => {
                                            if (link.href.includes('#')) {
                                                const [basePath, fragment] = link.href.split('#');
                                                if (pathname === basePath || (pathname === '/' && basePath === '')) {
                                                    e.preventDefault();
                                                    window.location.hash = fragment;
                                                    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
                                                    setActiveSectionId(fragment);
                                                }
                                            }
                                        }}
                                    >
                                        {link.icon && (
                                            <Icon name={link.icon as any} className="inline-block w-4 h-4 ml-1 -mt-1" />
                                        )}
                                        {link.name}
                                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-cyan origin-left transition-transform duration-200 ease-out
                                            ${isActiveLink(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                                        `}></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden md:flex flex-shrink-0 z-20">
                        <Link href="/how-it-works#events" className="btn-dark whitespace-nowrap">איך מתחילים?</Link>
                    </div>

                    <div className="md:hidden flex-shrink-0 z-20">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 text-brand-dark hover:text-brand-cyan transition-colors"
                            aria-label="פתח תפריט מובייל"
                        >
                            <Icon name="menu" className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={mobileMenuVariants}
                        className="fixed inset-0 bg-brand-cream z-[200] flex flex-col pt-4 pb-12 px-6 overflow-y-auto min-h-screen h-full" // Z-index מתוקן
                        dir="rtl"
                    >
                        <div className="w-full flex justify-between items-center h-20 mb-4">
                            <div className="flex-shrink-0">
                                <Link href="/" aria-label="חזרה לדף הבית" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Image 
                                        src="/images/LOGO.svg" 
                                        alt="לוגו מעשיך יקרבוך" 
                                        width={140}
                                        height={35}
                                        className="h-10 w-auto" 
                                    />
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-brand-dark hover:text-brand-cyan transition-colors"
                                aria-label="סגור תפריט מובייל"
                            >
                                <Icon name="x" className="w-8 h-8" />
                            </button>
                        </div>

                        <nav className="flex flex-col items-end gap-y-2 w-full">
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={mobileLinkVariants} className="w-full text-right">
                                    <Link
                                        href={link.href}
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false);
                                            if (link.href.includes('#')) {
                                                const [basePath, fragment] = link.href.split('#');
                                                if (pathname === basePath || (pathname === '/' && basePath === '')) {
                                                    e.preventDefault();
                                                    window.location.hash = fragment;
                                                    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
                                                    setActiveSectionId(fragment);
                                                }
                                            }
                                        }}
                                        className="block py-2 text-lg font-bold text-brand-dark hover:text-brand-cyan transition-colors"
                                    >
                                        {link.icon && (
                                            <Icon name={link.icon as any} className="inline-block w-5 h-5 mr-2 -mt-1" />
                                        )}
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={ctaMobileVariant} className="w-full flex justify-start mt-6">
                                <Link
                                    href="/how-it-works#events"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="btn-primary w-auto inline-block text-base"
                                >
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
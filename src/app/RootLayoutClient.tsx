'use client';

import React, { createContext, useState, useEffect, Suspense, Dispatch, SetStateAction } from 'react';
import Gtm from "@/components/utility/Gtm";
import { motion, AnimatePresence } from 'framer-motion';

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import PageTransition from "@/components/shared/PageTransition";
import { NewsletterPopup } from "@/components/features/NewsletterPopup";

export const ActiveSectionContext = createContext<{
  activeSectionId: string | null;
  setActiveSectionId: Dispatch<SetStateAction<string | null>>;
}>({ activeSectionId: null, setActiveSectionId: () => {} });

export const MobileMenuContext = createContext<{
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}>({ isMobileMenuOpen: false, setIsMobileMenuOpen: () => {} });


export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      setActiveSectionId(initialHash);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
    }
  }, [isMobileMenuOpen]);


  return (
    <ActiveSectionContext.Provider value={{ activeSectionId, setActiveSectionId }}>
        <MobileMenuContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
            <Suspense fallback={null}>
                {process.env.NEXT_PUBLIC_GTM_ID && <Gtm />}
            </Suspense>

            <Header />
            <AnimatePresence mode="wait">
              <div key="page-transition-wrapper" className="flex-grow flex flex-col">
                <PageTransition>
                  <main className="flex-grow flex flex-col">{children}</main>
                </PageTransition>
              </div>
            </AnimatePresence>
            <Footer />
            <FloatingButtons />
            <NewsletterPopup />

        </MobileMenuContext.Provider>
    </ActiveSectionContext.Provider>
  );
}
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { Suspense } from 'react';

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import PageTransition from "@/components/shared/PageTransition";
import Gtm from "@/components/utility/Gtm";
import { NewsletterPopup } from "@/components/features/NewsletterPopup"; // <-- 1. ייבוא הרכיב החדש

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "מעשיך יקרבוך | מיזם שידוכים חדשני",
  description: "הגיע הזמן להכיר באמת. פלטפורמה חכמה עם פרופילי וידאו אותנטיים וקהילה תומכת, להיכרות אמיתית, עמוקה ומכבדת.",
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.className} bg-brand-cream`}>
        <Suspense fallback={null}>
          {process.env.NEXT_PUBLIC_GTM_ID && <Gtm />}
        </Suspense>
        
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <FloatingButtons />
        <NewsletterPopup /> {/* <-- 2. הוספת הרכיב כאן */}
      </body>
    </html>
  );
}
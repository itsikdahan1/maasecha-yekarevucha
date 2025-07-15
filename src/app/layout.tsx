import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import PageTransition from "@/components/shared/PageTransition";
import Analytics from "@/components/utility/Analytics"; // ייבוא הרכיב החדש

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
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <FloatingButtons />
        {/* הוספת רכיב האנליטיקס */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <Analytics />
        )}
      </body>
    </html>
  );
}
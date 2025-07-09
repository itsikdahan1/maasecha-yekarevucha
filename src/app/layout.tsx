// src/app/layout.tsx
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

// Import components
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "מעשיך יקרבוך | מיזם שידוכים חדשני",
  description: "הגיע הזמן להכיר באמת. פלטפורמה חכמה עם פרופילי וידאו אותנטיים וקהילה תומכת, להיכרות אמיתית, עמוקה ומכבדת.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={assistant.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
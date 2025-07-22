// src/app/layout.tsx
import { Assistant } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./RootLayoutClient";
import type { Metadata } from 'next'; // 1. ייבוא סוג Metadata

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

// 2. הוספת אובייקט metadata גלובלי
export const metadata: Metadata = {
  title: {
    default: 'מעשיך יקרבוך - פלטפורמת השידוכים החדשה',
    template: '%s | מעשיך יקרבוך',
  },
  description: 'מעשיך יקרבוך היא פלטפורמה חדשנית לשידוכים, המשלבת טכנולוגיה מתקדמת עם ליווי אישי וקהילה תומכת למציאת הזיווג הנכון.',
  keywords: ['שידוכים', 'זוגיות', 'דייטים', 'קהילה', 'פרופיל וידאו'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 3. תגית ה-<html> נשארת, אך ללא ה-<head> הידני
    <html lang="he" dir="rtl" className={assistant.className}>
      <body>
        <RootLayoutClient>
            {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
// src/app/layout.tsx
// אין כאן 'use client'; זהו Server Component!

import { Assistant } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./RootLayoutClient";

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

// RootLayout הופך להיות Server Component.
// הוא אחראי להגדרות ה-HTML הבסיסיות, head, וטעינת נתונים אם צריך.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={assistant.className}>
      <head>
        {/* ======================= התיקון כאן ======================= */}
        {/*
          מחזירים את הגדרות ה-viewport לסטנדרט המומלץ.
          זה יאפשר זום וימנע את ה"באג" של הגדלה בלחיצה כפולה.
        */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* ===================== סוף התיקון ======================= */}
        
        {/* אם אתה רוצה להוסיף metadata אחרת (title, description), זה המקום */}
        {/* <title>מעשיך יקרבוך</title> */}
        {/* <meta name="description" content="תיאור האתר שלך" /> */}
      </head>
      <body>
        <RootLayoutClient>
            {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
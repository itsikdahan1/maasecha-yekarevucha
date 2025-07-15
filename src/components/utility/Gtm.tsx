// src/components/utility/Gtm.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

const pageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
  } else {
    console.log({
      event: 'pageview',
      page: url,
    })
  }
}

export default function Gtm() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      pageview(pathname)
    }
  }, [pathname, searchParams])

  if (!GTM_ID) {
    return null
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `,
        }}
      />
    </>
  )
}```

---

**שלב 4: הטמעת הרכיב החדש ב-Layout**

כעת, נחליף את רכיב האנליטיקס הישן ברכיב ה-GTM החדש.

**החלף את כל תוכן הקובץ `src/app/layout.tsx` בקוד הבא:**

```typescript
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { FloatingButtons } from "@/components/shared/FloatingButtons";
import PageTransition from "@/components/shared/PageTransition";
import Gtm from "@/components/utility/Gtm"; // ייבוא הרכיב החדש

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
        {/* הוספת קוד ה-noscript של GTM מיד אחרי פתיחת ה-body */}
        {process.env.NEXT_PUBLIC_GTM_ID && <Gtm />}
        
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
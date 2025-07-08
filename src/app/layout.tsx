import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-assistant',
});

export const metadata: Metadata = {
  title: "מעשיך יקרבוך | הדרך לחופה מתחילה כאן",
  description: "מיזם שידוכים חדשני המשלב טכנולוגיה, קהילה וחוויה אישית.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} font-sans bg-brand-cream`}>{children}</body>
    </html>
  );
}
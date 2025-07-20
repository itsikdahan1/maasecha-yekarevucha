// src/app/layout.tsx
import { Assistant } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "./RootLayoutClient";

const assistant = Assistant({
  subsets: ["hebrew"],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={assistant.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <RootLayoutClient>
            {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
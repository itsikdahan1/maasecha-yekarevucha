// C:\Users\USER\maasecha-v2\src\app\faq\page.tsx
// אין כאן 'use client'; זהו Server Component!

import { getFaqs } from "@/lib/sanity";
import { Faq } from "@/types";
// ייבוא הקומפוננטה הלקוחית מהמיקום החדש שלה:
import { FaqPageClient } from "@/components/faq/FaqPageClient"; 

// זהו Server Component ולכן יכול להיות async ולבצע await
export default async function FaqPage() {
  const faqs: Faq[] = await getFaqs(); // שליפת הנתונים בשרת

  return <FaqPageClient faqs={faqs} />; // העברת הנתונים לקומפוננטת הלקוח
}

// אופציונלי: Metadata עבור העמוד (מומלץ להוסיף)
// import { Metadata } from 'next';
// export const metadata: Metadata = {
//   title: "שאלות ותשובות | מעשיך יקרבוך",
//   description: "כל מה שרציתם לשאול על המיזם, התהליך והדרך לחופה.",
// };
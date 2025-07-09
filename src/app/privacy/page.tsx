// src/app/privacy/page.tsx
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <main className="flex-grow container mx-auto px-6 py-16 text-right min-h-[70vh]" dir="rtl">
          <h1 className="text-4xl font-bold mb-8">מדיניות פרטיות</h1>
          <div className="prose prose-lg max-w-none">
              <p>אנו ב"מעשיך יקרבוך" מחויבים לשמירה על פרטיותך. מסמך זה מפרט את המידע שאנו אוספים וכיצד אנו משתמשים בו.</p>
              <h2 className="text-2xl font-bold mt-6">2. שימוש במידע</h2>
              <p>המידע שנאסף משמש אותנו אך ורק לצורך התאמת הצעות, תפעול המערכת, יצירת קשר, ושיפור השירות. אנו לא חולקים את המידע שלך עם צדדים שלישיים ללא הסכמתך המפורשת, למעט במקרים הנדרשים על פי חוק.</p>
              <p>[...כאן יבוא התוכן המלא של מדיניות הפרטיות...]</p>
              <Link href="/" className="mt-12 inline-block text-brand-cyan hover:underline">
                  חזרה לעמוד הבית
              </Link>
          </div>
      </main>
    </div>
  );
}
// src/app/terms/page.tsx
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-white">
      <main className="flex-grow container mx-auto px-6 py-16 text-right min-h-[70vh]" dir="rtl">
          <h1 className="text-4xl font-bold mb-8">תקנון האתר</h1>
          <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p>ברוכים הבאים לאתר "מעשיך יקרבוך". השימוש באתר ובשירותיו כפוף לתנאים המפורטים להלן.</p>
              <h2 className="text-2xl font-bold mt-6">1. כללי</h2>
              <p>התקנון מנוסח בלשון זכר מטעמי נוחות בלבד, אך מיועד לשני המינים. השימוש באתר מהווה הסכמה לתנאי התקנון.</p>
              <h2 className="text-2xl font-bold mt-6">2. השירות</h2>
              <p>האתר מציע פלטפורמה להיכרויות למטרת נישואין במגזר הדתי והחרדי, הכוללת ערבי הפקה, פרופילי וידאו, וקהילה תומכת.</p>
              <p>[...כאן יבוא התוכן המלא של התקנון...]</p>
              <Link href="/" className="mt-12 inline-block text-brand-cyan hover:underline">
                  חזרה לעמוד הבית
              </Link>
          </div>
      </main>
    </div>
  );
}
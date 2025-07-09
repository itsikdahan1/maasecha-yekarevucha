// src/app/not-found.tsx
import Link from 'next/link';
// הנתיב נכון, אין צורך בשינוי אם Icon.tsx נמצא ישירות תחת /components
import { Icon } from '@/components/Icon'; 

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6" dir="rtl">
      <div className="max-w-md">
        <h1 className="text-8xl font-bold text-slate-900">404</h1>
        <p className="mt-4 text-3xl font-semibold text-slate-800">אופס, נראה שהלכתם לאיבוד</p>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            העמוד שחיפשתם לא נמצא. יכול להיות שהוא הוזז, נמחק, או שאולי פשוט הייתה טעות קטנה בכתובת.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-x-2 px-6 py-3 text-lg font-semibold text-white bg-slate-900 rounded-lg shadow-md hover:bg-slate-700 transition-colors"
          >
            <Icon name="arrowLeft" className="w-5 h-5 transform -scale-x-100" />
            <span>חזרה לעמוד הבית</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
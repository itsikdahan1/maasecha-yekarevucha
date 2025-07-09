import Link from 'next/link';

export default function AccessibilityPage() {
  return (
    <div className="bg-white">
        <main className="flex-grow container mx-auto px-6 lg:px-8 py-16 md:py-24" dir="rtl">
            <div className="max-w-4xl mx-auto text-right">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-8">
                    הצהרת נגישות
                </h1>
                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                    <p>
                        אנו ב"מעשיך יקרבוך" רואים חשיבות עליונה במתן שירות שוויוני לכלל האוכלוסייה, ובכלל זה לגולשים עם מוגבלויות. אנו משקיעים מאמצים ומשאבים רבים כדי להפוך את אתר האינטרנט שלנו לנגיש, על מנת לאפשר חווית גלישה נוחה, קלה ומהנה לכולם.
                    </p>
                    <h2 className="text-2xl font-bold mt-10 mb-4">תאימות לתקן</h2>
                    <p>
                        האתר נבנה בהתאם להנחיות הנגישות של התקן הישראלי ת"י 5568 ובהתבסס על הנחיות WCAG 2.1 הבינלאומיות, ברמה AA.
                    </p>
                    <h2 className="text-2xl font-bold mt-10 mb-4">פנייה בנושא נגישות</h2>
                    <p>
                        אנו ממשיכים לפעול לשיפור מתמיד של נגישות האתר. אם נתקלתם בבעיה או בקשיים בגלישה, או אם יש לכם הצעות לשיפור, נשמח מאוד לשמוע. ניתן לפנות אלינו באמצעות המייל: <a href="mailto:SHIDUCHIM.MY@GMAIL.COM">SHIDUCHIM.MY@GMAIL.COM</a>.
                    </p>
                    <div className="mt-16">
                        <Link href="/" className="text-brand-cyan font-semibold hover:underline">
                            חזרה לעמוד הבית
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
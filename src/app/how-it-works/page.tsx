// src/app/how-it-works/page.tsx
import { Icon } from "@/components/Icon";
import Link from 'next/link';
import { getUpcomingEvents } from '@/lib/sanity';
import type { Event } from '@/types';
import { PortableText } from '@portabletext/react';

export const metadata = {
  title: "איך זה עובד? | מעשיך יקרבוך",
  description: "הצצה אל מאחורי הקלעים של התהליך הייחודי שלנו - מהרישום החכם, דרך ערב ההפקה ועד לקהילה התומכת.",
};

const processSteps = [
    {
      icon: "bot",
      title: "שלב 1: הרישום החכם",
      description: "הכל מתחיל בשיחה עם הבוט החכם שלנו בוואטסאפ. הוא ישאל את השאלות הנכונות, יבין מי אתם, ויבנה לכם פרופיל ראשוני מדויק. בלי טפסים ארוכים ומייגעים."
    },
    {
      icon: "camera",
      title: "שלב 2: ערב ההפקה",
      description: "זהו לב המיזם. יום מרוכז וחוויתי הכולל סדנאות מעשיות עם מומחים, צילום פרופיל וידאו מקצועי, ופגישות איכותיות באווירה נעימה ומכבדת."
    },
    {
      icon: "users",
      title: "שלב 3: הקהילה והפלטפורמה",
      description: "לאחר ערב ההפקה, אתם מצטרפים לפלטפורמה הסגורה שלנו ולקהילה התומכת. כאן תקבלו הצעות מותאמות, תשתתפו בוובינרים ותקבלו ליווי עד לחופה."
    }
];

const StatusBadge = ({ status }: { status: Event['status'] }) => {
    const statusMap = {
      open: { text: "ההרשמה פתוחה", color: "bg-green-100 text-green-800", icon: "check" },
      closed: { text: "ההרשמה נסגרה", color: "bg-red-100 text-red-800", icon: "x" },
      soon: { text: "בקרוב", color: "bg-blue-100 text-blue-800", icon: "clock" },
      finished: { text: "האירוע הסתיים", color: "bg-slate-100 text-slate-500", icon: "archive" },
    };
    const currentStatus = statusMap[status] || statusMap.soon;
    return (
      <span className={`inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-sm font-medium ${currentStatus.color}`}>
        <Icon name={currentStatus.icon} className="h-4 w-4" />
        {currentStatus.text}
      </span>
    );
};
  
export default async function HowItWorksPage() {
    const events: Event[] = await getUpcomingEvents();
  
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem'
      };
      return new Date(dateString).toLocaleDateString('he-IL', options);
    };
  
    return (
      <div className="bg-slate-50" dir="rtl">
        <main className="container mx-auto px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark tracking-tight">
              המסע שלך לחתונה מתחיל כאן
            </h1>
            <p className="mt-6 text-xl text-brand-dark/70 leading-relaxed">
              בנינו תהליך ייחודי המשלב טכנולוגיה, מפגש אנושי וליווי קהילתי. כך זה עובד, שלב אחר שלב:
            </p>
          </div>
  
          <div className="relative mt-20 max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-200" aria-hidden="true"></div>
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={index} className="relative flex items-center">
                  <div className={`flex w-full items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <div className="hidden md:flex flex-shrink-0 bg-brand-cyan text-white w-28 h-28 rounded-full items-center justify-center shadow-lg z-10">
                      <Icon name={step.icon} className="w-14 h-14" />
                    </div>
                    <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200/80">
                      <div className="flex items-center gap-4 md:hidden mb-4">
                          <div className="flex-shrink-0 bg-brand-cyan text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                            <Icon name={step.icon} className="w-8 h-8" />
                          </div>
                          <h2 className="text-2xl font-bold text-brand-dark">{step.title}</h2>
                      </div>
                      <h2 className="hidden md:block text-3xl font-bold text-brand-dark">{step.title}</h2>
                      <p className="mt-2 text-lg text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div id="events" className="max-w-4xl mx-auto text-center mt-24 pt-12">
            <h2 className="text-4xl font-bold text-brand-dark mb-10">לוח ההפקות הקרוב</h2>
            
            <div className="space-y-8">
              {events && events.length > 0 ? (
                events.map(event => (
                  <div key={event._id} className="bg-white p-8 rounded-2xl border border-slate-200 text-right shadow-lg transition-all duration-300 hover:shadow-cyan-500/10 hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-brand-dark">{event.title}</h3>
                        <p className="mt-2 text-lg text-slate-700">{formatDate(event.date)}</p>
                        {event.location && <p className="text-slate-500 mt-1">{event.location}</p>}
                      </div>
                      <div className="flex-shrink-0 mt-4 sm:mt-0">
                        <StatusBadge status={event.status} />
                      </div>
                    </div>
                    {event.registrationUrl && event.status === 'open' && (
                        <div className="mt-6 border-t border-slate-200 pt-6">
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-block px-8 py-3 font-semibold text-white bg-brand-cyan rounded-lg hover:bg-cyan-600 transition-all shadow-md">
                            להרשמה ותשלום מאובטח
                          </a>
                        </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-10 bg-slate-100 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-700">לא פורסמו אירועים חדשים</h3>
                  <p className="mt-2 text-slate-500">מוזמנים לעקוב אחרינו בקהילה ולהתעדכן ראשונים!</p>
                </div>
              )}
            </div>
  
            {/* // ======================================================= // */}
            {/* // <-- תיקון 1: העיצוב של התיבה "שימו לב" עודכן כאן --> // */}
            {/* // ======================================================= // */}
            <div className="mt-12 bg-slate-100 border-r-4 border-slate-300 text-slate-800 p-6 rounded-lg text-right shadow-sm">
              <p className="font-bold text-lg">שימו לב:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>ההרשמה לכל אירוע הפקה הינה מראש וחובה.</li>
                <li>לא תתאפשר הרשמה במקום.</li>
                <li>ההרשמה נסגרת שבוע ימים לפני מועד האירוע.</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-20 p-10 bg-brand-cream/60 rounded-2xl shadow-inner">
              <h3 className="text-3xl font-bold text-brand-dark">דמי הצטרפות להפקה</h3>
              <p className="text-5xl font-bold text-brand-dark my-4">400 ₪</p>

              {/* // ============================================================== // */}
              {/* // <-- תיקון 2: העיצוב של התיבה "חבר מביא חבר" עודכן כאן --> // */}
              {/* // ============================================================== // */}
              <div className="mt-6 p-6 bg-cyan-50 border-2 border-dashed border-cyan-500 rounded-lg max-w-2xl mx-auto animate-pulse-slow">
                  <Icon name="gift" className="w-10 h-10 mx-auto text-brand-cyan mb-2"/>
                  <p className="font-bold text-xl text-brand-dark">מבצע "חבר מביא חבר"!</p>
                  <p className="text-slate-700 mt-1">
                    "כל המתפלל על חברו... הוא נענה תחילה". בואו יחד וכל אחד מכם יקבל <strong className="text-2xl">40% הנחה</strong>!
                  </p>
                  <p className="mt-3 text-2xl font-bold text-brand-dark">
                    <span className="line-through text-slate-500 text-lg">400 ₪</span> 240 ₪ בלבד!
                  </p>
              </div>
          </div>
        </main>
      </div>
    );
}
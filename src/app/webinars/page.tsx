// src/app/webinars/page.tsx

import { getWebinars } from "@/lib/sanity";
import Icon from "@/components/ui/Icon";
import Link from "next/link";

// הגדרת המטא-דאטה הספציפית לעמוד הוובינרים
export const metadata = {
  title: "וובינרים ועדכונים | מעשיך יקרבוך",
  description: "הצטרפו למפגשים עם נבחרת המומחים שלנו וקבלו כלים מעשיים לדרך לחופה.",
};

// זהו רכיב שרת, הוא יכול להיות אסינכרוני ולא צריך 'use client'
export default async function WebinarsPage() {
    // אחזור הנתונים מתבצע כאן, בצד השרת
    const webinars = await getWebinars();

    const formatWebinarDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('he-IL', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Jerusalem' }).format(date);
    };
    
    const liveOrNextWebinar = webinars.find(w => w.status === 'live') || webinars[0];
    const upcomingWebinars = webinars.filter(w => w.id !== liveOrNextWebinar?.id);

    return (
        <section className="py-24 sm:py-32 bg-white min-h-screen">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">וובינרים ועדכונים</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">הצטרפו למפגשים עם נבחרת המומחים שלנו, קבלו כלים מעשיים, וקחו את הצעד הבא בדרך לחופה.</p>
                </div>
                
                {liveOrNextWebinar ? (
                    <div className="mt-16 max-w-4xl mx-auto bg-[#FFFBF5] p-8 md:p-12 rounded-2xl border-2 border-[#06b6d4]">
                        {liveOrNextWebinar.status === 'live' && (
                            <div className="flex items-center gap-2 mb-4">
                                <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
                                <span className="text-red-500 font-bold">LIVE עכשיו</span>
                            </div>
                        )}
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{liveOrNextWebinar.title}</h2>
                        <p className="text-slate-600 mt-2 text-lg">עם {liveOrNextWebinar.speaker}</p>
                        <p className="font-semibold text-slate-800 mt-4">{formatWebinarDate(liveOrNextWebinar.date)}</p>
                        <p className="text-slate-700 mt-4 leading-relaxed">{liveOrNextWebinar.description}</p>
                        <Link href={liveOrNextWebinar.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-700 transition-colors shadow-lg">
                           {liveOrNextWebinar.status === 'live' ? 'הצטרפות לשידור' : 'להרשמה וקבלת תזכורת'}
                        </Link>
                    </div>
                ) : (
                    <p className="text-center mt-16 text-slate-500">לא נמצאו וובינרים קרובים. נעדכן בקרוב!</p>
                )}

                {upcomingWebinars.length > 0 && (
                    <div className="mt-20 max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">מפגשים קרובים נוספים</h3>
                        <div className="space-y-6">
                            {upcomingWebinars.map(webinar => (
                                <div key={webinar.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800">{webinar.title}</h4>
                                        <p className="text-slate-500">{formatWebinarDate(webinar.date)}</p>
                                    </div>
                                    <Link href={webinar.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-5 py-2.5 font-semibold bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">הרשמה</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
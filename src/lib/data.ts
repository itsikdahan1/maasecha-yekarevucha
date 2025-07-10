// src/lib/data.ts
import type { Expert } from '@/types';

export const productionEvening = {
  info: {
    title: "החוויה שממנה מתחילים",
    subtitle: "ערב הפקה. לא עוד דמי רישום",
    description: "אנו מאמינים שהדרך לחתונה מתחילה בהשקעה אמיתית. לכן, יצרנו ערב הפקה יוקרתי ומעצים, המעניק כלים מעשיים, חוויה מקצועית, ופרופיל וידאו אותנטי שמחליף אלף תמונות.",
    
    timeline: [
        { name: "קבלת פנים ובר מפנק", icon: "coffee", description: "מתחילים באווירה נינוחה עם כיבוד עשיר ונטוורקינג איכותי." },
        { name: "הרצאות העשרה", icon: "mic", description: "סדנאות ממוקדות וכלים פרקטיים מפי נבחרת המומחים שלנו." },
        { name: "צילום פרופיל וידאו", icon: "camera", description: "צילום דיסקרטי ואישי באווירה תומכת, שמבליט את האותנטיות שלכם." },
        { name: "מתנת פרימיום", icon: "gift", description: "כל משתתף ומשתתפת יוצאים עם מתנה יוקרתית מאיתנו." },
    ],

    workshops: {
      women: {
        title: "סדנאות לנשים",
        items: [
          { title: "ביטחון עצמי והחלטות", expert: "שיחה עם יועצת זוגית", icon: "check" },
          { title: "סטיילינג ושידור מסר", expert: "סטייליסטית ויועצת תדמית", icon: "check" },
          { title: "מאמנת מנטלית", expert: "כלים וביטחון לצילום אוטנטי", icon: "gift" }
        ]
      },
      men: {
        title: "סדנאות לגברים",
        items: [
          { title: "הכנה רוחנית ומעשית", expert: "שיחה עם רב ויועץ זוגי", icon: "check" },
          { title: "כלים לניהול שיחה", expert: "מומחה לתקשורת בין-אישית", icon: "check" },
          { title: "מאמן מנטלי", expert: "כלים וביטחון לצילום אוטנטי", icon: "gift" }
        ]
      }
    }
  }
};

export const experts: Expert[] = [
    // הוספנו _id לכל מומחה
    { _id: "1", name: "רב ויועץ זוגי", role: "הכנה רוחנית ומעשית", imageUrl: "https://placehold.co/128x128/e0f2f7/083344?text=R" },
    { _id: "2", name: "מומחה לתקשורת", role: "כלים פרקטיים לשיחה", imageUrl: "https://placehold.co/128x128/e0f2f7/083344?text=M" },
    { _id: "3", name: "סטייליסטית", role: "שידור המסר הנכון", imageUrl: "https://placehold.co/128x128/e0f2f7/083344?text=S" },
];

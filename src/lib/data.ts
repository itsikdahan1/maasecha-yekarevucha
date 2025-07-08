export const productionEvening = {
    subtitle: "החוויה שלנו",
    title: "ערב הפקה, סדנאות והיכרות",
    description: "במקום תמונה שטחית, אנו יוצרים ערב חווייתי שמתחיל את מסע ההיכרות ברגל ימין. בערב זה נצלם פרופיל וידאו אותנטי, נספק סדנאות כלים פרקטיים וניצור אווירה נעימה להיכרות ראשונית.",
    timeline: [
        { name: "הצטרפות למחזור", description: "נרשמים למחזור באזור מגוריכם ומתחילים את המסע.", icon: "check" },
        { name: "ערב הפקה וצילומים", description: "מגיעים לערב חווייתי, מצטלמים לווידאו ומשתתפים בסדנאות.", icon: "camera" },
        { name: "העלאת הפרופיל", description: "אנו עורכים את הווידאו ומעלים את הפרופיל המלא שלכם למאגר.", icon: "mic" },
        { name: "הצעות מותאמות", description: "מתחילים לקבל ולשלוח הצעות מותאמות אישית, מבוססות וידאו.", icon: "coffee" },
    ],
    workshops: {
        men: {
            title: "סדנאות לגברים",
            items: [
                { title: "הכנה רוחנית ומעשית", expert: "רב / יועץ זוגי", icon: "check" },
                { title: "ניהול שיחה בפגישה", expert: "מומחה לתקשורת", icon: "check" },
                { title: "אותנטיות מול מצלמה", expert: "מאמן מנטלי", icon: "check" },
                { title: "בונוס: בושם יוקרתי", expert: "מתנה קטנה מאיתנו", icon: "gift" },
            ]
        },
        women: {
            title: "סדנאות לנשים",
            items: [
                { title: "ביטחון עצמי וקבלת החלטות", expert: "יועצת זוגית", icon: "check" },
                { title: "סטיילינג והעברת מסרים", expert: "סטייליסטית", icon: "check" },
                { title: "אותנטיות מול מצלמה", expert: "מאמנת מנטלית", icon: "check" },
                { title: "בונוס: טאצ'-אפ איפור", expert: "להרגשה מושלמת בצילומים", icon: "gift" },
            ]
        }
    }
};

export const experts = [
    { name: "הרב יוני לביא", role: "יועץ רוחני וזוגי", imageUrl: "/images/expert1.jpg" },
    { name: "מיכל וולשטיין", role: "יועצת זוגית ומומחית תקשורת", imageUrl: "/images/expert2.jpg" },
    { name: "יעל אליצור", role: "סטייליסטית ומיתוג אישי", imageUrl: "/images/expert3.jpg" },
];

// הערה: עליך ליצור תיקיית public/images ולהוסיף תמונות בשמות המתאימים.
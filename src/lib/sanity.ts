// src/lib/sanity.ts

// For demonstration purposes, we'll keep the mock functions
const mockPosts = [
    { title: "חשיבות האותנטיות בפגישה ראשונה", excerpt: "איך להביא את עצמכם לידי ביטוי באופן אמיתי וכנה מהרגע הראשון.", category: "טיפים", author: "צוות המיזם", slug: "authenticity-first-date", content: [{_key: '1', children: [{_key: '11', text: 'בעולם הדייטים המהיר של היום, קל ללכת לאיבוד בניסיון להרשים...'}]}] },
    { title: "סיפור הצלחה: איך יעל ודוד נפגשו", excerpt: "הצצה מרגשת לסיפורם של זוג שהכיר דרך המיזם ומתחתן החודש.", category: "סיפורי הצלחה", author: "יצחק דהן", slug: "success-story-yael-david", content: [{_key: '2', children: [{_key: '21', text: 'סיפורם של יעל ודוד הוא דוגמה מושלמת...'}]}] },
    { title: "הכנה רוחנית לחתונה: 3 נקודות למחשבה", excerpt: "מעבר ללוגיסטיקה, איך מכינים את הנפש לקראת בניית בית נאמן בישראל.", category: "רוחניות", author: "יועץ חיצוני", slug: "spiritual-preparation", content: [{_key: '3', children: [{_key: '31', text: 'ההכנה לחתונה היא הרבה יותר מארגון אולם וקייטרינג...'}]}] },
];

const mockWebinars = [
    { id: 1, title: 'סודות התקשורת בדייט הראשון (והשני)', speaker: 'ד"ר יעל כהן, מומחית לתקשורת', date: '2024-09-15T20:00:00', status: 'live', description: 'בואו ללמוד איך לשבור את הקרח, ליצור כימיה, ולהימנע ממלכודות נפוצות בשיחה הראשונה. כלים פרקטיים לשימוש מיידי.', link: '#' },
    { id: 2, title: 'מ"אני" ל"אנחנו": בניית בסיס לזוגיות יציבה', speaker: 'הרב יוסי לוי', date: '2024-09-22T20:00:00', status: 'upcoming', description: 'הצטרפו לשיחה מעמיקה על ויתור, הכלה, והגדרת מטרות משותפות כבסיס לבניית בית נאמן בישראל.', link: '#' },
    { id: 3, title: 'פרופיל מנצח: איך להציג את עצמך באמת?', speaker: 'צוות "מעשיך יקרבוך"', date: '2024-09-29T21:00:00', status: 'upcoming', description: 'סדנה מעשית בה נלמד איך לכתוב, לצלם, ולהציג את עצמכם בצורה אותנטית ומושכת.', link: '#' },
];

export async function getPosts() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts;
}

export async function getPost(slug: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts.find(p => p.slug === slug);
}

export async function getWebinars() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockWebinars;
}
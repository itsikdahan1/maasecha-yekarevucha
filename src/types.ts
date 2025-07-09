// src/types.ts

// טיפוסים קיימים
export interface Post {
  // ... שדות של פוסט
}

export interface Expert {
  // ... שדות של מומחה
}

// --- הוסף את ה-interface החדש הזה ---
export interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
  status: 'open' | 'closed' | 'finished' | 'soon';
  registrationUrl?: string;
}

// ... בסוף הקובץ src/types.ts
export interface Faq {
  _id: string;
  question: string;
  answer: any[]; // 'any' כי זה תוכן עשיר (block content)
}
// ... בסוף הקובץ src/types.ts
export interface Testimonial {
  _id: string;
  authorName: string;
  authorRole: string;
  quote: string;
  imageUrl?: string;
}
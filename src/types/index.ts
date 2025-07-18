// FILENAME: src/types/index.ts

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  authorName: string; 
  categoryName?: string; // קטגוריה יכולה להיות אופציונלית
  excerpt: string;
  content: any[];
  mainImage?: { asset: { _id: string; url: string; }; }; // תמונה ראשית יכולה להיות אופציונלית
  publishedAt?: string;
  _updatedAt?: string;
}

export interface Expert {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string; // ביוגרפיה יכולה להיות אופציונלית
  order?: number;
}

export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string; // תפקיד יכול להיות אופציונלי
  imageUrl?: string; // תמונה יכולה להיות אופציונלית
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  location: string; // מיקום הפך לשדה חובה
  status: 'open' | 'closed' | 'finished' | 'soon';
  registrationUrl?: string; // קישור הרשמה הוא אופציונלי אך חובה בתנאים מסוימים (ולידציה בסכמה)
  imageUrl?: string; // תמונה לאירוע
}

export interface Faq {
  _id: string;
  question: string;
  answer: any[];
  order?: number;
}

export interface Webinar {
  _id: string;
  title: string;
  date: string;
  speaker: string;
  description: string;
  link?: string;
  status: 'live' | 'upcoming' | 'ended';
}

export interface GalleryItem {
  _id: string;
  title: string;
  itemType: 'image' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  order?: number;
}

export interface Category { // הוספת טיפוס Category
  _id: string;
  name: string;
  description?: string;
}
// FILENAME: src/types/index.ts

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  authorName: string; 
  categoryName?: string;
  excerpt: string;
  content: any[];
  mainImage?: { asset: { _id: string; url: string; }; };
  publishedAt?: string;
  _updatedAt: string; // <-- התיקון הקריטי: הסרנו את סימן השאלה. השדה הזה הוא חובה.
}

export interface Expert {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
  order?: number;
}

// ... שאר הטיפוסים נשארים זהים ...
export interface Testimonial {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  imageUrl?: string;
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  status: 'open' | 'closed' | 'finished' | 'soon';
  registrationUrl?: string;
  imageUrl?: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: any[];
  category?: string;
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

export interface Category {
  _id: string;
  name: string;
  description?: string;
}
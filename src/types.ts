// src/types.ts
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: any;
  category: string;
  excerpt: string;
  content: any[];
}

export interface Expert {
  _id: string; // מומלץ להוסיף מזהה ייחודי
  name: string;
  role: string;
  imageUrl?: string; // <-- הוספנו את השדה החסר
}

export interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
  status: 'open' | 'closed' | 'finished' | 'soon';
  registrationUrl?: string;
}

export interface Webinar {
  _id: string;
  title: string;
  date: string;
  speaker: string;
  description: string;
  link?: string;
  status: 'live' | 'upcoming' | 'finished';
}

export interface Faq {
  _id: string;
  question: string;
  answer: any[];
}

export interface Testimonial {
  _id:string;
  authorName: string;
  authorRole: string;
  quote: string;
  imageUrl?: string;
}

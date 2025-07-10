// src/types.ts

// עדכנו את הטיפוס Post
export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  authorName: string; // <-- שינינו את זה מ-author
  categoryName: string; // <-- שינינו את זה מ-category
  excerpt: string;
  content: any[];
}

// שאר הטיפוסים נשארים זהים
export interface Expert {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
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


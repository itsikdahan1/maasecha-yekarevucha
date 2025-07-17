// FILENAME: src/types/index.ts
export interface Post { _id: string; title: string; slug: { current: string }; authorName: string; categoryName: string; excerpt: string; content: any; mainImage: { asset: { _id: string; url: string; }; }; publishedAt?: string; _updatedAt?: string; }
export interface Expert { _id: string; name: string; role: string; imageUrl?: string; bio: string; }
export interface Testimonial { _id: string; quote: string; authorName: string; authorRole: string; imageUrl?: string; }
export interface Event { _id: string; title: string; date: string; location?: string; status: 'open' | 'closed' | 'finished' | 'soon'; registrationUrl?: string; }
export interface Faq { _id:string; question: string; answer: any; }
export interface Webinar { _id: string; title: string; date: string; speaker: string; description: string; status: 'live' | 'upcoming' | 'ended'; link?: string; }
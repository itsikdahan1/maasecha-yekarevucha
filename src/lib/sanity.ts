// src/lib/sanity.ts
import { createClient } from "next-sanity";
import type { Post, Event } from "@/types";

const client = createClient({
    // הדבק כאן את ה-ID האמיתי שלך
    projectId: "libeyywa", 
    dataset: "production",
    apiVersion: "2024-01-01", // השאר תאריך זה, הוא מציין את גרסת ה-API
    useCdn: false, // `false` אם אתה משתמש ב-fetch בצד השרת (מומלץ)
});

export async function getPosts(): Promise<Post[]> {
    const query = `*[_type == "post"]{_id, title, slug, author, category, excerpt, content}`;
    return client.fetch(query);
}

export async function getPost(slug: string): Promise<Post> {
    const query = `*[_type == "post" && slug.current == $slug][0]{_id, title, slug, author, category, excerpt, content}`;
    return client.fetch(query, { slug });
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const query = `*[_type == "event" && date > now()] | order(date asc) [0...3] {
    _id,
    title,
    date,
    location,
    status,
    registrationUrl
  }`;
  const events = await client.fetch(query);
  return events;
}

// ... בסוף הקובץ src/lib/sanity.ts
export async function getFaqs(): Promise<Faq[]> {
  const query = `*[_type == "faq"] | order(_createdAt asc) {
    _id,
    question,
    answer
  }`;
  return client.fetch(query);
}
// ... בסוף הקובץ src/lib/sanity.ts
export async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    authorName,
    authorRole,
    quote,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query);
}
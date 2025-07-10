// src/lib/sanity.ts
import { createClient } from "@sanity/client";
import type { Post, Event, Faq, Testimonial, Webinar, Expert } from "@/types";

const client = createClient({
    projectId: "libeyywa", 
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});

// --- שאר הפונקציות נשארות זהות ---

export async function getPosts(): Promise<Post[]> {
    const query = `*[_type == "post"]{
      _id,
      title,
      slug,
      excerpt,
      content,
      "authorName": author->name,
      "categoryName": category->name
    }`;
    return client.fetch(query);
}

export async function getPost(slug: string): Promise<Post> {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        excerpt,
        content,
        "authorName": author->name,
        "categoryName": category->name,
        mainImage
    }`;
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
  return client.fetch(query);
}

export async function getWebinars(): Promise<Webinar[]> {
  const query = `*[_type == "webinar"] | order(date desc) {
    _id,
    title,
    date,
    speaker,
    description,
    link,
    status
  }`;
  return client.fetch(query);
}

// --- הפונקציה הזו עודכנה ---
export async function getFaqs(): Promise<Faq[]> {
  const query = `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }`;
  return client.fetch(query);
}

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

export async function getExperts(): Promise<Expert[]> {
  const query = `*[_type == "expert"] | order(order asc) {
    _id,
    name,
    role,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query);
}

// FILENAME: src/lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { Post, Expert, Testimonial, Event, Faq, Webinar } from '@/types';
export const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!, apiVersion: "2024-07-16", useCdn: process.env.NODE_ENV === 'production', });
const builder = imageUrlBuilder(client); export function urlFor(source: SanityImageSource) { return builder.image(source); }
export async function getPost(slug: string): Promise<Post | null> { return client.fetch<Post>( `*[_type == "post" && slug.current == $slug][0]{ _id, title, slug, "authorName": author->name, "categoryName": category->name, publishedAt, excerpt, content, mainImage, _updatedAt }`, { slug } ); }
export async function getPosts(): Promise<Post[]> { return client.fetch<Post[]>(`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, "authorName": author->name, "categoryName": category->name, publishedAt, excerpt, mainImage, content, _updatedAt }`); }
export async function getAllPostsForSitemap(): Promise<Pick<Post, 'slug' | '_updatedAt'>[]> { return client.fetch(`*[_type == "post"]{ slug, _updatedAt }`); }
export async function getExperts(): Promise<Expert[]> { return client.fetch<Expert[]>(`*[_type == "expert"] | order(order asc) { _id, name, role, "imageUrl": image.asset->url, bio }`); }
export async function getTestimonials(): Promise<Testimonial[]> { return client.fetch<Testimonial[]>(`*[_type == "testimonial"]{ _id, quote, authorName, authorRole, "imageUrl": image.asset->url }`); }
export async function getFaqs(): Promise<Faq[]> { return client.fetch<Faq[]>(`*[_type == "faq"] | order(order asc) {_id, question, answer}`); }
export async function getUpcomingEvents(): Promise<Event[]> { return client.fetch<Event[]>(`*[_type == "event" && date > now()] | order(date asc)`); }
export async function getWebinars(): Promise<Webinar[]> { return client.fetch<Webinar[]>(`*[_type == "webinar"] | order(date desc)`); }
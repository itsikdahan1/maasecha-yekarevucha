// src/types/index.ts

export type Post = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  author: string;
  content?: any[]; // For the full blog post content
};

export type Expert = {
  name: string;
  role: string;
  imageUrl: string;
};

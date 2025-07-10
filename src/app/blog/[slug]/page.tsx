// src/app/blog/[slug]/page.tsx
import React from 'react';
import { Icon } from '@/components/Icon';
import { getPost } from '@/lib/sanity';
import type { Post } from '@/types';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = params;
    const post: Post | null = await getPost(slug);

    if (!post) {
        return (
            <div className="text-center py-40 text-brand-dark">
                <h1 className="text-2xl font-bold">שגיאה: המאמר לא נמצא.</h1>
                <Link href="/blog" className="text-brand-cyan hover:underline mt-4 inline-block">
                    חזרה לכל המאמרים
                </Link>
            </div>
        );
    }

    return (
        <article className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-12">
                    <Link href="/blog" className="text-brand-cyan hover:text-cyan-800 font-semibold inline-flex items-center gap-2">
                        <Icon name="arrowLeft" className="w-4 h-4 transform -scale-x-100" />
                        חזרה לכל המאמרים
                    </Link>
                    {/* התיקון כאן: השתמשנו ב-categoryName */}
                    <p className="mt-8 text-lg font-semibold text-brand-cyan">{post.categoryName}</p>
                    <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark">{post.title}</h1>
                    {/* התיקון כאן: השתמשנו ב-authorName */}
                    <p className="mt-6 text-lg text-brand-dark/60">נכתב על ידי: {post.authorName}</p>
                </div>
                <div className="prose prose-lg lg:prose-xl mx-auto text-brand-dark/90 leading-relaxed text-right">
                    {post.content?.map((block: any) => (
                        <p key={block._key}>{block.children.map((span: any) => span.text).join('')}</p>
                    ))}
                </div>
            </div>
        </article>
    );
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: 'מאמר לא נמצא',
    };
  }
  return {
    title: `${post.title} | מעשיך יקרבוך`,
    description: post.excerpt,
  };
}
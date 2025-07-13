// src/app/blog/[slug]/page.tsx
import React from 'react';
import { Icon } from '@/components/Icon';
import { getPost } from '@/lib/sanity';
import type { Post } from '@/types';
import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { LeadMagnetForm } from '@/components/LeadMagnetForm';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mt-4 space-y-3 prose-p:my-0">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mt-4 space-y-3 prose-p:my-0">{children}</ol>,
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-4 text-brand-dark">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-brand-dark">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-r-4 border-brand-cyan bg-slate-50 p-4 my-6 text-xl italic">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : ''} className="text-brand-cyan hover:underline">{children}</a>;
    },
  },
  types: {
    image: ({ value }) => (
        <img 
            src={value.asset.url} 
            alt={value.alt || 'תמונה מתוך המאמר'} 
            className="my-8 rounded-lg shadow-md"
        />
    ),
  }
};

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
                    <p className="mt-8 text-lg font-semibold text-brand-cyan">{post.categoryName}</p>
                    <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark">{post.title}</h1>
                    <p className="mt-6 text-lg text-brand-dark/60">נכתב על ידי: {post.authorName}</p>
                </div>
                
                <div className="prose prose-lg lg:prose-xl mx-auto text-brand-dark/90 prose-p:leading-relaxed prose-headings:text-brand-dark prose-a:text-brand-cyan text-right">
                    {post.content && <PortableText value={post.content} components={portableTextComponents} />}
                </div>

                <div className="mt-16 border-t border-gray-200 pt-10">
                    <LeadMagnetForm 
                        title="רוצה עוד כלים כאלה?"
                        description="הורד/י עכשיו בחינם את המדריך המלא 'איך להפוך תסכול בדייטים להזדמנות' וקבל/י אסטרטגיות מעשיות לשינוי אמיתי."
                        buttonText="שלח לי את המדריך"
                        listId="159568255472633180" // יש להחליף ב-ID האמיתי של הרשימה שלך ממערכת הדיוור
                    />
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
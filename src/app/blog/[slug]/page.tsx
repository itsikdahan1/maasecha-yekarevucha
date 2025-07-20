import React from 'react';
import { getPost, urlFor } from '@/lib/sanity';
import { Post } from '@/types'; // ודא שזה הייבוא הנכון
import Link from 'next/link';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { Icon } from '@/components/ui/Icon';
import { LeadMagnetForm } from '@/components/features/LeadMagnetForm';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const portableTextComponents: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside mt-6 space-y-3 rtl:mr-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside mt-6 space-y-3 rtl:mr-6">{children}</ol>,
  },
  block: {
    normal: ({ children }) => <p className="text-xl md:text-2xl leading-relaxed my-6">{children}</p>,
    h2: ({ children }) => <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-4 text-brand-dark">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-brand-dark">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl md:text-2xl font-bold mt-8 mb-3 text-brand-dark">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="border-r-4 border-brand-cyan bg-slate-50/70 p-6 my-8 text-xl md:text-2xl italic">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
    highlight: ({ children }) => <span className="bg-brand-cyan/20 px-1 py-0.5 rounded">{children}</span>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : ''} className="text-brand-cyan hover:underline">{children}</a>;
    },
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img 
            src={urlFor(value).width(800).auto('format').url()}
            alt={value.alt || 'תמונה מתוך המאמר'} 
            className="my-8 rounded-lg shadow-lg"
            loading="lazy"
        />
      );
    },
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post: Post | null = await getPost(params.slug);

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
                <div className="text-center mb-16">
                    <Link href="/blog" className="text-brand-cyan hover:text-cyan-800 font-semibold inline-flex items-center gap-2">
                        <Icon name="arrowLeft" className="w-4 h-4 transform -scale-x-100" />
                        חזרה לכל המאמרים
                    </Link>
                    {post.categoryName && <p className="mt-8 text-lg font-semibold text-brand-cyan">{post.categoryName}</p>}
                    <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark">{post.title}</h1>
                    <div className="mt-6 text-lg text-brand-slate/80 flex items-center justify-center gap-4">
                        <span>נכתב על ידי: {post.authorName}</span>
                        {post.publishedAt && (
                          <>
                            <span>•</span>
                            <span>{new Date(post.publishedAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </>
                        )}
                    </div>
                </div>
                
                <div className="prose prose-lg lg:prose-xl max-w-none text-brand-dark/90 prose-headings:text-brand-dark prose-a:text-brand-cyan text-right"> 
                    {post.content && <PortableText value={post.content} components={portableTextComponents} />}
                </div>

                <div className="mt-20 pt-16 border-t border-slate-200">
                    <LeadMagnetForm 
                        title="רוצה עוד כלים כאלה?"
                        description="הורד/י עכשיו בחינם את המדריך המלא 'איך להפוך תסכול בדייטים להזדמנות' וקבל/י אסטרטגיות מעשיות לשינוי אמיתי."
                        buttonText="לקבלת המדריך למייל"
                        listId="YOUR_LIST_ID_HERE"
                    />
                </div>
            </div>
        </article>
    );
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
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
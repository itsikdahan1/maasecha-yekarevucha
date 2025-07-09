'use client';
import React, { FC } from 'react';
import { Icon } from './Icon';
import type { Post } from '@/types';
import Link from 'next/link';

interface BlogSectionProps {
  posts: Post[];
}

export const BlogSection: FC<BlogSectionProps> = ({ posts }) => (
  <section id="blog" className="py-24 sm:py-32 bg-white" dir="rtl">
    <div className="container mx-auto px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">תוכן וקהילה</h2>
        <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
          מהבלוג שלנו
        </p>
        <p className="max-w-xl mt-6 mx-auto text-lg text-brand-dark/70 leading-relaxed">
          מאמרים, כלים וסיפורי השראה מנבחרת המומחים שלנו, שיעזרו לכם בדרך למציאת זוגיות
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
        {posts && posts.length > 0 ? posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block text-right bg-brand-cream/70 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100"
          >
            <div className="p-8">
              <p className="text-sm font-medium text-brand-cyan group-hover:text-cyan-500">
                {post.category || 'כללי'}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-brand-dark group-hover:text-brand-cyan">
                {post.title}
              </h3>
              <p className="mt-4 text-base text-brand-dark/70">{post.excerpt}</p>
            </div>
            <div className="px-8 py-4 bg-white/70 flex justify-between items-center">
              <p className="text-sm font-medium text-brand-dark">מאת: {post.author || 'צוות האתר'}</p>
              <span className="text-brand-cyan group-hover:translate-x-[-4px] transition-transform">
                <Icon name="arrowLeft" className="w-5 h-5"/>
              </span>
            </div>
          </Link>
        )) : (
          <p className="col-span-3 text-center text-brand-dark/60 text-lg">טוען מאמרים אחרונים...</p>
        )}
      </div>
    </div>
  </section>
);
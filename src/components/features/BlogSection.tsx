// FILENAME: src/components/features/BlogSection.tsx
'use client';
import React, { FC } from 'react';
import { Icon } from '@/components/ui/Icon';
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
        <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">מהבלוג שלנו</p>
        <p className="max-w-xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">מאמרים, כלים וסיפורי השראה מנבחרת המומחים שלנו, שיעזרו לכם בדרך למציאת זוגיות</p>
      </div>
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
        {posts && posts.length > 0 ? posts.map((post) => (
          // העטיפה החדשה: כל ה-div עכשיו הוא קישור
          <Link 
            key={post._id} 
            href={`/blog/${post.slug.current}`} 
            className="group flex flex-col text-right bg-brand-cream/70 rounded-2xl shadow-lg overflow-hidden 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100 
                       block no-underline" // הוספנו block ו-no-underline
            passHref // חשוב לוודא שה-href עובר ל-<a> הפנימי
          >
            {/* כל התוכן של הפוסט נמצא כעת בתוך ה-Link */}
            <div className="p-8 flex-grow">
              <p className="text-sm font-medium text-brand-cyan group-hover:text-brand-cyan-light">{post.categoryName || 'כללי'}</p>
              {/* הסרנו את ה-Link הפנימי מכיוון שה-div החיצוני כבר קישור */}
              <span className="block mt-2">
                <span className="text-2xl font-bold text-brand-dark group-hover:text-brand-cyan">{post.title}</span>
              </span>
              <p className="mt-4 text-base text-brand-slate line-clamp-3">{post.excerpt}</p>
            </div>
            <div className="px-8 py-4 bg-white/70 flex justify-between items-center mt-auto">
              <p className="text-sm font-medium text-brand-dark">מאת: {post.authorName || 'צוות האתר'}</p>
              {/* כפתור החץ נשאר כאינדיקציה ויזואלית, אך הוא אינו קישור נפרד יותר */}
              <span className="text-brand-cyan group-hover:translate-x-[-4px] transition-transform">
                <Icon name="arrowLeft" className="w-5 h-5"/>
              </span>
            </div>
          </Link> // סגירת ה-Link
        )) : ( 
          <p className="col-span-3 text-center text-brand-slate text-lg">טוען מאמרים אחרונים...</p> 
        )}
      </div>
       <div className="mt-16 text-center">
          <Link href="/blog" className="btn-dark">לכל המאמרים</Link>
      </div>
    </div>
  </section>
);
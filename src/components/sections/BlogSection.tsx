import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
// ... הגדרות Types נשארות זהות ...

export default function BlogSection({ posts }: any) {
    return (
        <section id="blog" className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-[var(--color-primary)] tracking-wider uppercase">תוכן וקהילה</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold">מהבלוג שלנו</p>
                    <p className="max-w-2xl mt-6 mx-auto text-lg text-[var(--color-ink-light)] leading-relaxed">
                        מאמרים, כלים וסיפורי השראה מנבחרת המומחים שלנו, שיעזרו לכם בדרך למציאת זוגיות.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
                    {posts && posts.length > 0 ? (
                        posts.map((post: any) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block bg-[var(--color-bg-cream)] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2">
                                <div className="p-8">
                                    <p className="text-sm font-semibold text-[var(--color-primary)] group-hover:text-cyan-600">
                                        {post.category || 'כללי'}
                                    </p>
                                    <h3 className="mt-2 text-2xl font-bold text-slate-900 group-hover:text-cyan-700">
                                        {post.title}
                                    </h3>
                                    <p className="mt-4 text-base text-[var(--color-ink-light)] line-clamp-3">{post.excerpt}</p>
                                </div>
                                <div className="px-8 py-4 bg-white/60 border-t border-slate-200/60 flex justify-between items-center">
                                    <p className="text-sm font-medium text-[var(--color-ink)] whitespace-nowrap">מאת: {post.author || 'צוות האתר'}</p>
                                    <span className="text-[var(--color-primary)] group-hover:translate-x-[-4px] transition-transform">
                                        <Icon name="arrowLeft" className="w-5 h-5" />
                                    </span>
                                </div>
                            </Link>
                        ))
                    ) : ( <p className="col-span-3 text-center text-slate-500 text-lg">טוען מאמרים אחרונים...</p> )}
                </div>
            </div>
        </section>
    );
}
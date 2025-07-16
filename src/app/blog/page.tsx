import Link from 'next/link';
import { getPosts } from '@/lib/sanity';
import type { Post } from '@/types';
import { Icon } from '@/components/ui/Icon';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מאמרים וכלים להצלחה בדרך לחתונה | מעשיך יקרבוך',
  description: 'מאגר התוכן המלא של "מעשיך יקרבוך". מאמרים, טיפים, וכלים מנבחרת המומחים שלנו שיעזרו לכם במסע למציאת זוגיות.',
};

export default async function BlogPage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="bg-white py-24 sm:py-32" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
            הבלוג שלנו
          </h1>
          <p className="mt-6 text-xl text-brand-slate leading-relaxed">
            מאמרים, כלים וסיפורי השראה מנבחרת המומחים שלנו, שילוו אתכם בדרך לחופה.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`} // <-- התיקון הקריטי כאן
                className="group flex flex-col text-right bg-brand-cream/70 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-slate-100"
              >
                <div className="p-8 flex-grow">
                  <p className="text-sm font-medium text-brand-cyan group-hover:text-brand-cyan-light">{post.categoryName || 'כללי'}</p>
                  <h3 className="mt-2 text-2xl font-bold text-brand-dark group-hover:text-brand-cyan h-16">{post.title}</h3>
                  <p className="mt-4 text-base text-brand-slate line-clamp-3 flex-grow">{post.excerpt}</p>
                </div>
                <div className="px-8 py-4 bg-white/70 flex justify-between items-center mt-auto">
                  <p className="text-sm font-medium text-brand-dark">מאת: {post.authorName || 'צוות האתר'}</p>
                  <span className="text-brand-cyan group-hover:translate-x-[-4px] transition-transform">
                    <Icon name="arrowLeft" className="w-5 h-5"/>
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-brand-slate text-lg">
              עדיין לא פורסמו מאמרים. מוזמנים לחזור בקרוב!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
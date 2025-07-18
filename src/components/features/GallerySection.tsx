// src/components/features/GallerySection.tsx
'use client'; // <-- וודא שזה קיים!

import React, { FC } from 'react';
import type { GalleryItem } from '@/types';
import { motion } from 'framer-motion';

// Helper to extract video ID for embed URLs - תיקון לוגיקה ל-YouTube
const getEmbedUrl = (url: string) => {
    let embedUrl = '';
    // YouTube standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // YouTube short URL: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // Vimeo URL: https://vimeo.com/VIDEO_ID
    else if (url.includes('vimeo.com/')) {
        const videoId = url.split('/').pop();
        if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    return embedUrl;
};

export const GallerySection: FC<{ items: GalleryItem[] }> = ({ items }) => {
    // בדיקה לוודא ש-items קיים ושהוא מערך
    if (!items || !Array.isArray(items) || items.length === 0) {
        return (
            <section className="py-24 sm:py-32 bg-white" dir="rtl">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                        רגעים מההפקות שלנו
                    </h2>
                    <p className="max-w-xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">
                        אין פריטים בגלריה כרגע.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                        רגעים מההפקות שלנו
                    </h2>
                    <p className="max-w-xl mt-6 mx-auto text-lg text-brand-slate leading-relaxed">
                        הצצה לאווירה, לאנשים, ולחוויה שהיא "מעשיך יקרבוך".
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id}
                            className="relative aspect-square w-full h-full overflow-hidden rounded-xl shadow-lg group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                            {item.itemType === 'image' && item.imageUrl && (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            )}
                            {item.itemType === 'video' && item.videoUrl && (
                                <iframe
                                    src={getEmbedUrl(item.videoUrl)}
                                    title={item.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            )}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <p className="absolute bottom-4 left-4 text-white font-semibold text-lg text-right w-full px-4">
                                {item.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
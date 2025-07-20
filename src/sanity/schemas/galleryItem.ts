// src/sanity/schema/galleryItem.ts
import { defineField, defineType } from 'sanity';
import { GalleryItem } from '../../types'; // <--- וודא שזה הנתיב הנכון ל-src/types/index.ts

export default defineType({
  name: 'galleryItem',
  title: 'פריט גלריה',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת/תיאור קצר',
      type: 'string',
      description: 'לדוגמה: "סדנת סטיילינג, הפקת יולי 2025"',
      validation: Rule => Rule.required().error('כותרת/תיאור חובה לכל פריט גלריה.'),
    }),
    defineField({
      name: 'itemType',
      title: 'סוג פריט',
      type: 'string',
      options: {
        list: [
          { title: 'תמונה', value: 'image' },
          { title: 'וידאו', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: Rule => Rule.required().error('סוג פריט חובה.'),
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => (parent as GalleryItem)?.itemType !== 'image', // וודא Cast גם כאן
      validation: Rule => Rule.custom((image, context) => {
        const galleryItem = context.parent as GalleryItem; // <--- הוספה זו פותרת את שגיאת הטיפוסים
        if (galleryItem?.itemType === 'image' && !image) {
          return 'תמונה חובה עבור פריט מסוג "תמונה".';
        }
        return true;
      }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'קישור לוידאו (YouTube/Vimeo)',
      type: 'url',
      description: 'ודא שהקישור הוא ל-YouTube או Vimeo. לדוגמה: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      hidden: ({ parent }) => (parent as GalleryItem)?.itemType !== 'video', // וודא Cast גם כאן
      validation: Rule => Rule.custom((url, context) => {
        const galleryItem = context.parent as GalleryItem; // <--- הוספה זו פותרת את שגיאת הטיפוסים
        if (galleryItem?.itemType === 'video' && !url) {
          return 'קישור וידאו חובה עבור פריט מסוג "וידאו".';
        }
        if (url && !/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/.test(url)) {
          return 'הקישור חייב להיות מ-YouTube או Vimeo.';
        }
        return true;
      }),
    }),
    defineField({
      name: 'order',
      title: 'מספר סידורי',
      type: 'number',
      description: 'לקביעת סדר התצוגה (מספר נמוך יופיע ראשון).',
      validation: Rule => Rule.integer().min(0).error('מספר סידורי חייב להיות מספר שלם וחיובי.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      itemType: 'itemType'
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.itemType === 'image' ? 'תמונה' : 'וידאו',
        media: selection.itemType === 'image' ? selection.media : undefined,
      }
    }
  }
})
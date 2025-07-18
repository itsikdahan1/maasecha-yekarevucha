// src/sanity/schema/post.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'מאמר (Post)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת',
      type: 'string',
      validation: Rule => Rule.required().error('כותרת המאמר היא שדה חובה.'), // הוספת הודעת שגיאה מפורטת
    }),
    defineField({
      name: 'slug',
      title: 'Slug (כתובת ייחודית)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required().error('Slug הוא שדה חובה.'), // הוספת הודעת שגיאה מפורטת
      description: 'כתובת ייחודית וקצרה של המאמר. נוצר אוטומטית מהכותרת.' // הוספת description
    }),
    defineField({
      name: 'author',
      title: 'מחבר/ה',
      type: 'reference',
      to: {type: 'expert'},
      validation: Rule => Rule.required().error('מחבר/ת המאמר הוא שדה חובה.'), // הוספת הודעת שגיאה מפורטת
      description: 'בחר/י את המומחה/ית שכתב/ה את המאמר.' // הוספת description
    }),
    defineField({
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'תמונה בולטת שתוצג בראש המאמר וברשימת המאמרים.', // הוספת description
      validation: Rule => Rule.required().error('תמונה ראשית היא שדה חובה.'), // הוספת validation
    }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'reference',
      to: {type: 'category'},
      description: 'קטגוריית המאמר (לדוגמה: "טיפים", "השראה", "סיפורי הצלחה").', // הוספת description
      validation: Rule => Rule.required().error('קטגוריה היא שדה חובה.'), // הוספת validation
    }),
    defineField({
      name: 'publishedAt',
      title: 'תאריך פרסום',
      type: 'datetime',
      description: 'תאריך ושעת פרסום המאמר. ישפיע על סדר התצוגה.', // הוספת description
      validation: Rule => Rule.required().error('תאריך פרסום הוא שדה חובה.'),
    }),
    defineField({
      name: 'excerpt',
      title: 'תקציר (Excerpt)',
      type: 'text',
      rows: 3,
      description: 'תקציר קצר שיוצג ברשימות המאמרים (עד 200 תווים).',
      validation: Rule => Rule.required().error('תקציר הוא שדה חובה.').max(200).error('התקציר ארוך מדי (מקסימום 200 תווים).'), // איחוד ולידציות
    }),
    defineField({
      name: 'content',
      title: 'תוכן המאמר',
      type: 'blockContent',
      description: 'התוכן המלא של המאמר. השתמש בעורך הטקסט המועשר.', // הוספת description
      validation: Rule => Rule.required().error('תוכן המאמר הוא שדה חובה.'), // הוספת validation
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt', // הוספת publishedAt ל-select כדי להשתמש בו ב-prepare
    },
    prepare(selection) {
      const {author, publishedAt} = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('he-IL') : 'תאריך לא ידוע';
      return {...selection, subtitle: author ? `מאת ${author} | פורסם ב: ${date}` : `פורסם ב: ${date}`} // סאב-טייטל עשיר יותר
    },
  },
})
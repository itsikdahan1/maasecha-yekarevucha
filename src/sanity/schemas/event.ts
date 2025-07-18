// src/sanity/schema/event.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'event',
  title: 'אירוע הפקה',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת האירוע',
      type: 'string',
      description: 'לדוגמה: "ערב הפקה לגילאי 25-35 בירושלים"',
      validation: Rule => Rule.required().error('כותרת האירוע היא שדה חובה.'),
    }),
    defineField({
      name: 'date',
      title: 'תאריך ושעת האירוע',
      type: 'datetime',
      description: 'התאריך והשעה המדויקים של האירוע.', // הוספת description
      validation: Rule => Rule.required().error('תאריך ושעת האירוע הם שדה חובה.'),
    }),
    defineField({
      name: 'location',
      title: 'מיקום',
      type: 'string',
      description: 'לדוגמה: "אולם האירועים בית וגן, ירושלים"',
      validation: Rule => Rule.required().error('מיקום האירוע הוא שדה חובה.'),
    }),
    defineField({
      name: 'status',
      title: 'סטטוס הרשמה',
      type: 'string',
      options: {
        list: [
          {title: 'פתוח להרשמה', value: 'open'},
          {title: 'ההרשמה נסגרה', value: 'closed'},
          {title: 'האירוע הסתיים', value: 'finished'},
          {title: 'בקרוב', value: 'soon'},
        ],
        layout: 'radio',
      },
      initialValue: 'soon',
      validation: Rule => Rule.required().error('סטטוס הרשמה הוא שדה חובה.'),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'קישור להרשמה ותשלום',
      type: 'url',
      description: 'הדבק כאן את הקישור לדף הסליקה של Morning. חובה אם הסטטוס הוא "פתוח להרשמה".',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }).custom((url, context) => {
        if (context.parent?.status === 'open' && !url) {
          return 'קישור הרשמה חובה כאשר סטטוס ההרשמה "פתוח להרשמה".';
        }
        return true;
      }),
    }),
    defineField({
      name: 'imageUrl',
      title: 'תמונת האירוע',
      type: 'image',
      options: { hotspot: true },
      description: 'תמונה מייצגת עבור האירוע (תוצג בעמוד "איך זה עובד?").',
      validation: Rule => Rule.required().error('תמונת האירוע היא שדה חובה.'), // הוספת ולידציה לתמונה
    })
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      status: 'status',
      media: 'imageUrl'
    },
    prepare(selection) {
      const {title, date, status, media} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('he-IL') : 'אין תאריך'
      const statusText = {
          'open': 'פתוח להרשמה',
          'closed': 'הרשמה נסגרה',
          'finished': 'הסתיים',
          'soon': 'בקרוב',
      }[status] || status;

      return {
        title: title,
        subtitle: `${formattedDate} | סטטוס: ${statusText}`,
        media: media,
      }
    },
  },
})
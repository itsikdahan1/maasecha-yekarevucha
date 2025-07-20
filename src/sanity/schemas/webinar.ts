// src/sanity/schema/webinar.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'webinar',
  title: 'וובינר (Webinar)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת הוובינר',
      type: 'string',
      validation: Rule => Rule.required().error('כותרת הוובינר היא שדה חובה.'),
    }),
    defineField({
      name: 'date',
      title: 'תאריך ושעת הוובינר',
      type: 'datetime',
      description: 'התאריך והשעה המדויקים של הוובינר.',
      validation: Rule => Rule.required().error('תאריך ושעת הוובינר הם שדה חובה.'),
    }),
    defineField({
      name: 'speaker',
      title: 'מרצה',
      type: 'string',
      description: 'שם המרצה/ים בוובינר.',
      validation: Rule => Rule.required().error('שם המרצה הוא שדה חובה.'),
    }),
    defineField({
      name: 'description',
      title: 'תיאור קצר',
      type: 'text',
      rows: 3,
      description: 'תיאור קצר של נושא הוובינר ומה המשתתפים יקבלו ממנו.',
      validation: Rule => Rule.required().error('תיאור הוובינר הוא שדה חובה.'),
    }),
    defineField({
      name: 'link',
      title: 'קישור לוובינר (Live/Recording)',
      type: 'url',
      description: 'הקישור לשידור החי, או לוובינר המוקלט לאחר מכן.',
    }),
    defineField({
      name: 'status',
      title: 'סטטוס הוובינר',
      type: 'string',
      options: {
        list: [
          {title: 'שידור חי', value: 'live'},
          {title: 'בקרוב', value: 'upcoming'},
          {title: 'הסתיים (הוקלט)', value: 'ended'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: Rule => Rule.required().error('סטטוס הוובינר הוא שדה חובה.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      speaker: 'speaker',
      status: 'status',
    },
    prepare(selection) {
      const {title, date, speaker, status} = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString('he-IL') : 'אין תאריך';
      
      // הגדרת טיפוס מפורש למפתח סטטוס
      type WebinarStatusKey = 'live' | 'upcoming' | 'ended';
      
      // ביצוע type assertion על מנת לוודא ש-status הוא WebinarStatusKey
      const statusKey = status as WebinarStatusKey;
      
      // הגדרת מפה של סטטוסי טקסט עם טיפוס מפורש
      const statusTextMap: Record<WebinarStatusKey, string> = {
          'live': '🔴 בשידור חי',
          'upcoming': '🔜 בקרוב',
          'ended': '✅ הסתיים',
      };
      
      const statusText = statusTextMap[statusKey] || statusKey; // שימוש במפה המתוקנת

      return {
        title: title,
        subtitle: `${formattedDate} | מרצה: ${speaker} | סטטוס: ${statusText}`,
      };
    },
  },
})
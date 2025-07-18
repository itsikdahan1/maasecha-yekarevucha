// src/sanity/schema/expert.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'expert',
  title: 'מומחה (Expert)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'שם המומחה',
      type: 'string',
      validation: Rule => Rule.required().error('שם המומחה הוא שדה חובה.'),
    }),
    defineField({
      name: 'role',
      title: 'תפקיד/כותרת',
      type: 'string',
      description: 'למשל: "יועצת זוגיות מוסמכת"',
      validation: Rule => Rule.required().error('תפקיד הוא שדה חובה.'),
    }),
    defineField({
      name: 'image',
      title: 'תמונת פרופיל',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'תמונת פרופיל של המומחה.', // הוספת description
    }),
    defineField({
      name: 'bio',
      title: 'ביוגרפיה קצרה',
      type: 'text',
      rows: 4,
      description: 'כמה משפטים המתארים את הרקע והמומחיות של המומחה.', // הוספת description
    }),
    defineField({
      name: 'order',
      title: 'מספר סידורי',
      type: 'number',
      description: 'לקביעת סדר התצוגה. מספר נמוך יופיע ראשון.',
      validation: Rule => Rule.integer().min(0).error('מספר סידורי חייב להיות מספר שלם וחיובי.'), // הוספת validation
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
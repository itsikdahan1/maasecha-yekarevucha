// src/sanity/schema/category.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'קטגוריה (Category)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'שם הקטגוריה',
      type: 'string',
      validation: Rule => Rule.required().error('שם קטגוריה הוא שדה חובה.'),
      description: 'שם הקטגוריה יופיע בבלוג (לדוגמה: "טיפים", "השראה").'
    }),
    defineField({
      name: 'description',
      title: 'תיאור קצר',
      type: 'text',
      rows: 2,
      description: 'תיאור קצר לשימוש פנימי או למידע נוסף על הקטגוריה.'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
})
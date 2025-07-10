// maasecha-project/schemaTypes/testimonial.ts

import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'testimonial',
  title: 'המלצה',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'authorName',
      title: 'שם הממליצ/ה',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'תפקיד/סטטוס',
      type: 'string',
      description: 'לדוגמה: "זוג שנישא", "רב קהילה", "יועץ זוגי"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'ציטוט ההמלצה',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'תמונה (אופציונלי)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'authorRole',
      media: 'image',
    },
  },
})
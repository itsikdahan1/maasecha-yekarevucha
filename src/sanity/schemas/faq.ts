// src/sanity/schemas/faq.ts

import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faq',
  title: 'שאלות ותשובות',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'שאלה',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'תשובה',
      type: 'blockContent', 
      validation: (Rule) => Rule.required(),
    }),
    // --- הוספנו את השדה הבא ---
    defineField({
      name: 'order',
      title: 'מספר סידורי',
      type: 'number',
      description: 'מספר נמוך יותר יופיע ראשון. מאפשר לקבוע את סדר השאלות באתר.',
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
})

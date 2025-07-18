// src/sanity/schema/faq.ts

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
      validation: (Rule) => Rule.required().error('השאלה היא שדה חובה.'), // הוספת הודעת שגיאה מפורטת
    }),
    defineField({
      name: 'answer',
      title: 'תשובה',
      type: 'blockContent', 
      description: 'התשובה המלאה לשאלה. השתמש בעורך הטקסט המועשר.', // הוספת description
      validation: (Rule) => Rule.required().error('התשובה היא שדה חובה.'), // הוספת הודעת שגיאה מפורטת
    }),
    defineField({
      name: 'order',
      title: 'מספר סידורי',
      type: 'number',
      description: 'מספר נמוך יותר יופיע ראשון. מאפשר לקבוע את סדר השאלות באתר.',
      validation: Rule => Rule.integer().min(0).error('מספר סידורי חייב להיות מספר שלם וחיובי.'), // הוספת validation
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
})
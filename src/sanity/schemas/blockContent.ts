// src/sanity/schema/blockContent.ts
import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Highlight', value: 'highlight'},
        ],
        annotations: [
          defineField({
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              defineField({
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({ scheme: ['http', 'https'] }).error('כתובת URL לא תקינה.'),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'טקסט אלטרנטיבי (Alt Text)',
          type: 'string',
          description: 'תיאור קצר של התמונה עבור מנועי חיפוש ונגישות.',
          validation: Rule => Rule.required().error('טקסט אלטרנטיבי חובה לתמונה.'),
        }),
        defineField({
          name: 'caption',
          title: 'כותרת תמונה (Caption)',
          type: 'string',
          description: 'כיתוב שיופיע מתחת לתמונה (אופציונלי).',
        }),
      ],
    }),
  ],
})
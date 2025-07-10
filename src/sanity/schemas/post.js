export default {
    name: 'post',
    title: 'מאמר (Post)',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'כותרת',
        type: 'string',
        validation: Rule => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug (כתובת ייחודית)',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: Rule => Rule.required(),
      },
      {
        name: 'author',
        title: 'מחבר',
        type: 'reference',
        to: {type: 'expert'},
      },
      {
        name: 'mainImage',
        title: 'תמונה ראשית',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'category',
        title: 'קטגוריה',
        type: 'reference',
        to: {type: 'category'},
      },
      {
        name: 'publishedAt',
        title: 'תאריך פרסום',
        type: 'datetime',
        validation: Rule => Rule.required(),
      },
      {
        name: 'excerpt',
        title: 'תקציר',
        type: 'text',
        rows: 3,
        description: 'תקציר קצר שיוצג ברשימות המאמרים (עד 200 תווים)',
        validation: Rule => Rule.max(200),
      },
      {
        name: 'content',
        title: 'תוכן המאמר',
        type: 'blockContent', // שימוש ב-blockContent שיצרנו
      },
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'mainImage',
      },
      prepare(selection) {
        const {author} = selection
        return {...selection, subtitle: author && `מאת ${author}`}
      },
    },
  }
  
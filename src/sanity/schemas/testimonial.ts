// src/sanity/schema/testimonial.ts
import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'testimonial',
    title: 'המלצה (Testimonial)',
    type: 'document',
    fields: [
        defineField({
            name: 'quote',
            title: 'ציטוט / המלצה',
            type: 'text',
            rows: 5,
            description: 'הציטוט המלא או ההמלצה מפי הממליצ/ה.', // הוספת description
            validation: Rule => Rule.required().error('ציטוט / המלצה הם שדה חובה.'), // הוספת הודעת שגיאה מפורטת
        }),
        defineField({
            name: 'authorName',
            title: 'שם הממליצ/ה',
            type: 'string',
            validation: Rule => Rule.required().error('שם הממליצ/ה הוא שדה חובה.'), // הוספת הודעת שגיאה מפורטת
        }),
        defineField({
            name: 'authorRole',
            title: 'תפקיד / סטטוס הממליצ/ה',
            type: 'string',
            description: 'לדוגמה: "בוגרת מחזור ג\'", "מאמן אישי", "כלה מרוצה".', // עדכון description
        }),
        defineField({
            name: 'image',
            title: 'תמונת הממליצ/ה', // שינוי title לבהירות
            type: 'image',
            description: 'תמונת פרופיל של הממליצ/ה.', // הוספת description
        }),
    ],
    preview: {
        select: {
          title: 'authorName',
          subtitle: 'quote',
          media: 'image',
        },
        prepare(selection) { // שיפור preview להצגת תקציר הציטוט
          const {title, subtitle, media} = selection
          const truncatedQuote = subtitle ? `${subtitle.substring(0, 50)}...` : '';
          return {
            title: title,
            subtitle: truncatedQuote,
            media: media,
          }
        },
    },
})
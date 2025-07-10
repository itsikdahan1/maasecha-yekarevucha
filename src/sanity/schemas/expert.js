// maasecha-project/sanity/schemaTypes/expert.js
export default {
    name: 'expert',
    title: 'מומחה (Expert)',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'שם המומחה',
        type: 'string',
      },
      {
        name: 'role',
        title: 'תפקיד/כותרת',
        type: 'string',
        description: 'למשל: "יועצת זוגיות מוסמכת"',
      },
      {
        // שינוי 1: שינינו את שם השדה ל-image כדי שיתאים לקוד באתר
        name: 'image',
        title: 'תמונת פרופיל',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'bio',
        title: 'ביוגרפיה קצרה',
        type: 'text',
      },
      {
        // שינוי 2: הוספנו שדה לסידור המומחים
        name: 'order',
        title: 'מספר סידורי',
        type: 'number',
        description: 'מספר נמוך יותר יופיע ראשון. מאפשר לקבוע את סדר המומחים באתר.',
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'role',
        media: 'image', // ודאנו שגם כאן השם הוא image
      },
    },
  }

// maasecha-project/schemaTypes/event.js

export default {
  name: 'event',
  title: 'אירוע הפקה',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'כותרת האירוע',
      type: 'string',
      description: 'לדוגמה: "ערב הפקה לגילאי 25-35 בירושלים"',
    },
    {
      name: 'date',
      title: 'תאריך ושעת האירוע',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'מיקום',
      type: 'string',
      description: 'לדוגמה: "אולם האירועים בית וגן, ירושלים"',
    },
    {
      name: 'status',
      title: 'סטטוס הרשמה',
      type: 'string',
      options: {
        list: [
          {title: 'פתוח להרשמה', value: 'open'},
          {title: 'ההרשמה נסגרה', value: 'closed'},
          {title: 'האירוע הסתיים', value: 'finished'},
          {title: 'בקרוב', value: 'soon'},
        ],
        layout: 'radio',
      },
      initialValue: 'soon',
    },
    {
      name: 'registrationUrl',
      title: 'קישור להרשמה ותשלום',
      type: 'url',
      description: 'הדבק כאן את הקישור לדף הסליקה של Morning',
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const {title, date} = selection
      const formattedDate = date ? new Date(date).toLocaleDateString('he-IL') : 'אין תאריך'
      return {
        title: title,
        subtitle: formattedDate,
      }
    },
  },
}
// sanity.config.ts
// הקובץ הזה חוזר/נשאר בנתיב: C:\Users\USER\maasecha-v2\sanity.config.ts

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// ✅ תיקון קריטי: ייבוא ייצוא ברירת המחדל מקובץ index.ts
import schemas from './src/sanity/schemas/index' // <--- שינוי כאן: ייבוא כברירת מחדל, שינוי שם ל-schemas

export default defineConfig({
  name: 'default',
  title: 'Maasecha Project',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool()],

  schema: {
    types: schemas, // <--- שינוי כאן: שימוש בשם schemas (שם ברירת המחדל שיובא)
  },
})
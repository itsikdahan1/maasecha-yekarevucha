// src/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// --- ייבוא כל ה-Schemas שלך ---
// ⬇️ כאן נמצא התיקון: הסרנו את הסיומות .js ו- .ts ⬇️
import blockContent from './sanity/schemas/blockContent'
import category from './sanity/schemas/category'
import post from './sanity/schemas/post'
import expert from './sanity/schemas/expert'
import event from './sanity/schemas/event'
import faq from './sanity/schemas/faq'
import testimonial from './sanity/schemas/testimonial'


// --- הוספת ה-Schemas למערך ---
const schemas = [
  post, 
  event, 
  expert, 
  category, 
  blockContent, 
  faq, 
  testimonial
]

export default defineConfig({
  basePath: '/admin',
  projectId: 'libeyywa', // ודא שזה ה-ID הנכון
  dataset: 'production',   // ודא שזה ה-dataset הנכון
  schema: {
    types: schemas,
  },
  plugins: [
    deskTool(),
  ],
})
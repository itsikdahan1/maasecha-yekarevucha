// src/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// --- ייבוא כל ה-Schemas שלך ---
// ודא שהקבצים האלה קיימים בתיקייה: src/sanity/schemas
import blockContent from './sanity/schemas/blockContent.js'
import category from './sanity/schemas/category.js'
import post from './sanity/schemas/post.js'
import expert from './sanity/schemas/expert.js'
import event from './sanity/schemas/event.js'
import faq from './sanity/schemas/faq.ts'
import testimonial from './sanity/schemas/testimonial.ts'


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

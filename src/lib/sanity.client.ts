// src/lib/sanity.client.ts
import { createClient } from 'next-sanity'

// אלה הם פרטי החיבור הבסיסיים
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = '2024-07-16'

// יוצרים client בסיסי שניתן להשתמש בו ברכיבי שרת
// ובמקומות שבהם next-sanity אינו זמין
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // בדרך כלל בטוח להשתמש ב-CDN בצד הלקוח
})
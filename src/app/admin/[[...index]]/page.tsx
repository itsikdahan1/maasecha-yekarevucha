// src/app/admin/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
// התיקון: שימוש בקיצור הדרך הסטנדרטי (@) שפונה לתיקיית src
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

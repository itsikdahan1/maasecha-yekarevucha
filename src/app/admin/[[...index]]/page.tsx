// src/app/admin/[[...index]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
// ✅ תיקון קריטי: ייבוא באמצעות כינוי הנתיב (Path Alias)
import config from 'sanity.config' // <--- שינוי כאן!

export default function StudioPage() {
  return <NextStudio config={config} />
}
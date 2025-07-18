// src/sanity/schemas/index.ts
// (וודא שקובץ זה נמצא בתיקייה src/sanity/schemas)

import { SchemaTypeDefinition } from 'sanity' 

import blockContent from './blockContent'
import category from './category'
import post from './post'
import expert from './expert'
import event from './event'
import faq from './faq'
import testimonial from './testimonial'
import galleryItem from './galleryItem'
import webinar from './webinar' 

const schemas: SchemaTypeDefinition[] = [
  post, 
  event, 
  expert, 
  category, 
  blockContent, 
  faq, 
  testimonial,
  galleryItem,
  webinar 
]

export default schemas
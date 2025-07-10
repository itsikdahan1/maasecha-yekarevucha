// maasecha-project/schemaTypes/index.js

import blockContent from './blockContent'
import category from './category'
import post from './post'
import expert from './expert'
import event from './event'
import faq from './faq'
import testimonial from './testimonial' // <-- הוסף ייבוא זה

export const schemaTypes = [post, event, expert, category, blockContent, faq, testimonial] // <-- הוסף לרשימה
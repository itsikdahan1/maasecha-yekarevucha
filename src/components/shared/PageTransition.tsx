// src/components/shared/PageTransition.tsx
'use client'; // וודא שזה קיים, וזה קיים בקוד שלך

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation'; // ייבוא usePathname

const pageVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -5,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate', // AnimatePresence לעיתים מתקשה עם ease אגרסיבי כמו anticipate
  duration: 0.4,
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); // קבל את הנתיב הנוכחי

  return (
    <motion.div
      key={pathname} // 💡 שינוי קריטי: הוספת key מבוסס על הנתיב
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
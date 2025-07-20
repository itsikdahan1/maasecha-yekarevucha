'use client';
import React, { FC } from 'react';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 70,
      damping: 10,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 150, damping: 10 } },
};

export const ContactSection: FC = () => {
  return (
    <motion.section
      id="contact"
      className="bg-brand-dark relative overflow-hidden py-24 sm:py-32"
      dir="rtl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6 py-0 text-center relative z-10">
        <motion.div variants={iconVariants} className="mb-8 flex justify-center">
            <Icon name="gem" className="w-20 h-20 text-brand-cyan drop-shadow-lg" />
        </motion.div>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
          variants={itemVariants}
        >
          הצעד הראשון שלך לחופה מתחיל כאן
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto mt-4 text-lg text-slate-300 leading-relaxed"
          variants={itemVariants}
        >
          הדרך לזוגיות מתחילה בצעד אחד. גלו את התהליך הייחודי שלנו, שמחבר בין טכנולוגיה, קהילה וליווי אישי.
        </motion.p>
        <motion.div
          className="mt-12"
          variants={itemVariants}
        >
          <Link href="/how-it-works" className="btn-primary text-xl px-12 py-5 shadow-2xl hover:shadow-cyan-500/40 transform hover:-translate-y-1">
            כן, אני רוצה להתחיל!
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
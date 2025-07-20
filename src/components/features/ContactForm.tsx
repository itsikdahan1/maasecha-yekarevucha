
// src/components/features/ContactForm.tsx
'use client'

import React, { useState } from 'react';

// ======================= התיקון כאן =======================
// הוספנו את המילה 'export' לפני הפונקציה, כדי שקבצים אחרים יוכלו לייבא אותה.
export function ContactForm() {
// ===================== סוף התיקון =======================
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'אירעה שגיאה');
      }

      setStatus('success');
      setMessage(result.message);
      (e.target as HTMLFormElement).reset();

    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  const inputStyles = "block w-full rounded-md border-0 px-3.5 py-2 text-brand-dark shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6 transition-colors duration-200";

  return (
    <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">שלחו לנו הודעה</h2>
        <form onSubmit={handleSubmit} className="mt-10 text-right">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-brand-dark">שם מלא</label>
                    <div className="mt-2.5">
                        <input type="text" name="name" id="name" required className={inputStyles} />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-brand-dark">כתובת מייל</label>
                    <div className="mt-2.5">
                        <input type="email" name="email" id="email" required className={inputStyles} />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-brand-dark">ההודעה שלכם</label>
                    <div className="mt-2.5">
                        <textarea name="message" id="message" rows={4} required className={inputStyles}></textarea>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <button type="submit" disabled={status === 'submitting'} className="btn-dark w-full block text-center">
                    {status === 'submitting' ? 'שולח...' : 'שליחה'}
                </button>
            </div>
            {message && (
                <p className={`mt-4 text-sm font-semibold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </form>
    </div>
  );
}
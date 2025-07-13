// src/components/ContactForm.tsx
'use client'

import React, { useState } from 'react';

export function ContactForm() {
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
        throw new Error(result.message || 'אופס, משהו השתבש. נסו שוב.');
      }

      setStatus('success');
      setMessage("קיבלנו! תודה על פנייתך, נדבר בקרוב.");
      (e.target as HTMLFormElement).reset();

    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">שלחו לנו הודעה</h2>
        <p className="mt-2 text-lg leading-8 text-gray-700">אנחנו כאן כדי להקשיב, לענות וללוות.</p>
        <form onSubmit={handleSubmit} className="mt-10 text-right">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">שם פרטי, שנכיר</label>
                    <div className="mt-2.5">
                        <input type="text" name="name" id="name" required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600" />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">כתובת מייל לחזרה</label>
                    <div className="mt-2.5">
                        <input type="email" name="email" id="email" required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600" />
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">ההודעה שלכם</label>
                    <div className="mt-2.5">
                        <textarea name="message" id="message" rows={4} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600"></textarea>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <button type="submit" disabled={status === 'submitting'} className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 disabled:opacity-50">
                    {status === 'submitting' ? 'שולח...' : 'צעד ראשון בדרך לקשר'}
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
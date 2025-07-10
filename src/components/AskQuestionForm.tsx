// src/components/AskQuestionForm.tsx
'use client'

import React, { useState } from 'react';

export function AskQuestionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'אירעה שגיאה');
      }

      setStatus('success');
      setMessage(data.message);
      setName('');
      setEmail('');
      setQuestion('');

    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">יש לכם שאלה נוספת?</h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        נשמח לענות. שלחו לנו את שאלתכם ואולי נוסיף אותה למאגר.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 text-right">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">שם מלא</label>
            <div className="mt-2.5">
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">כתובת מייל</label>
            <div className="mt-2.5">
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="question" className="block text-sm font-semibold leading-6 text-gray-900">השאלה שלכם</label>
            <div className="mt-2.5">
              <textarea name="question" id="question" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button type="submit" disabled={status === 'submitting'} className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:opacity-50">
            {status === 'submitting' ? 'שולח...' : 'שלח שאלה'}
          </button>
        </div>
        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

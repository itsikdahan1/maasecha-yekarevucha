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
      if (!response.ok) throw new Error(data.message || 'אירעה שגיאה');
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

  const inputStyles = "block w-full rounded-md border-0 px-3.5 py-2 text-brand-dark shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-cyan sm:text-sm sm:leading-6";

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold tracking-tight text-brand-dark">יש לך שאלה נוספת?</h3>
      <p className="mt-2 text-lg leading-8 text-brand-slate">
        נשמח לענות. שלח/י לנו את שאלתך ואולי נוסיף אותה למאגר.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 text-right">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-brand-dark">שם מלא</label>
            <div className="mt-2.5">
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputStyles} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-brand-dark">כתובת מייל</label>
            <div className="mt-2.5">
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyles} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="question" className="block text-sm font-semibold leading-6 text-brand-dark">השאלה שלך</label>
            <div className="mt-2.5">
              <textarea name="question" id="question" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} required className={inputStyles}></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full block text-center disabled:opacity-50">
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
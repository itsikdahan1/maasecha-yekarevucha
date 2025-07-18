'use client'

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';

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

  const inputStyles = "block w-full rounded-md border-0 px-3.5 py-3 text-brand-dark shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-cyan sm:text-sm sm:leading-6";

  return (
    <div className="text-center">
      <Icon name="chat" className="w-12 h-12 mx-auto text-brand-cyan" />
      <h3 className="mt-2 text-3xl font-bold tracking-tight text-brand-dark">יש לך שאלה נוספת?</h3>
      <p className="mt-2 text-lg leading-8 text-brand-slate">
        נשמח לענות. שלח/י לנו את שאלתך ואולי נוסיף אותה למאגר.
      </p>
      <form onSubmit={handleSubmit} className="mt-10 text-right">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-brand-dark mb-1">שם מלא</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputStyles} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-brand-dark mb-1">כתובת מייל</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputStyles} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="question" className="block text-sm font-semibold leading-6 text-brand-dark mb-1">השאלה שלך</label>
            <textarea name="question" id="question" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} required className={inputStyles}></textarea>
          </div>
        </div>
        <div className="mt-10">
          <button type="submit" disabled={status === 'submitting'} className="btn-dark w-full block text-center disabled:opacity-50">
            {status === 'submitting' ? 'שולח...' : 'שליחת השאלה'}
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
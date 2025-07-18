'use client';
import React, { useState, FC } from 'react';
import { Icon } from '@/components/ui/Icon';

interface LeadMagnetFormProps {
  title: string;
  description: string;
  buttonText: string;
  listId: string;
}

export const LeadMagnetForm: FC<LeadMagnetFormProps> = ({ title, description, buttonText, listId }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('אנא הזן/י כתובת מייל תקינה.');
      return;
    }
    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'אופס, משהו השתבש.');
      }
      setStatus('success');
      setMessage('נשלח! בדוק/י את תיבת המייל שלך כדי לקבל את המדריך.');
      setEmail('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    // תיקון: הסרת שורות ריקות או הערות ששיבשו את התחביר
    <div className="bg-brand-cream/70 p-8 rounded-2xl shadow-lg border border-slate-200 my-12 text-right" dir="rtl">
      <Icon name="gem" className="w-12 h-12 text-brand-cyan mb-4 mx-auto rtl:mr-auto rtl:ml-0" />
      <h3 className="text-2xl font-bold text-brand-dark">{title}</h3>
      <p className="text-brand-slate mt-2 mb-6 max-w-lg mx-auto">{description}</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="כתובת המייל שלך"
          required
          className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan text-right placeholder:text-right"
        />
        <button type="submit" disabled={status === 'submitting'} className="btn-dark">
          {status === 'submitting' ? 'שולח...' : buttonText}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm font-semibold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};
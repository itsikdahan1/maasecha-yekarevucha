'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';

const Step = ({ currentStep, stepNumber, title, children }: { currentStep: number, stepNumber: number, title: string, children: React.ReactNode }) => {
    if (currentStep !== stepNumber) return null;
    return (
        <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-2 text-center">שלב {stepNumber}: {title}</h3>
            <div className="mt-6">{children}</div>
        </div>
    );
};

export const RegistrationWizard = () => {
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({ email: '', password: '', about: '' });
    const [aiSuggestion, setAiSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerateAiSuggestion = async () => {
        if (!userData.about.trim()) {
            setAiSuggestion("כדי שהיועץ החכם יוכל לעזור, יש לכתוב כמה מילים על עצמך.");
            return;
        }
        setIsLoading(true);
        setAiSuggestion('היועץ החכם חושב לרגע...');
        
        const prompt = `אתה "היועץ החכם" של "מעשיך יקרבוך". תפקידך לקחת את הטקסט הגולמי הבא שמשתמש/ת כתב/ה על עצמו/ה, ולנסח אותו מחדש כפסקת פרופיל אישית, חמה, מזמינה ומחמיאה. הדגש את התכונות החיוביות שעולות מהטקסט. הטקסט הגולמי: "${userData.about}"`;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (response.ok) {
                setAiSuggestion(data.result);
            } else {
                throw new Error(data.error || "משהו השתבש, נסו שוב.");
            }
        } catch (error) {
            setAiSuggestion('אופס, משהו השתבש. נסה שוב מאוחר יותר.');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const renderFormattedText = (text: string) => {
        return { __html: text.replace(/\n/g, '<br />') };
    };

    return (
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-slate-200/80" dir="rtl">
            <Step currentStep={step} stepNumber={1} title="יצירת חשבון">
                <p className="text-center text-brand-slate mb-6">נתחיל עם הפרטים הבסיסיים. הפרטים שלך בטוחים איתנו.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">כתובת מייל</label>
                        <input type="email" name="email" value={userData.email} onChange={handleInputChange} className="w-full mt-1 p-3 border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">סיסמה</label>
                        <input type="password" name="password" value={userData.password} onChange={handleInputChange} className="w-full mt-1 p-3 border border-slate-300 rounded-lg" />
                    </div>
                </div>
                <button onClick={nextStep} className="w-full mt-8 btn-dark">המשך לשלב הבא</button>
            </Step>

            <Step currentStep={step} stepNumber={2} title="ספר/י לנו עליך">
                <p className="text-center text-brand-slate mb-6">בלי לחץ, פשוט כתוב/י בכמה מילים מה חשוב לך, מה את/ה אוהב/ת, ומה את/ה מחפש/ת.</p>
                <textarea name="about" value={userData.about} onChange={handleInputChange} rows={6} className="w-full p-3 border border-slate-300 rounded-lg" placeholder="לדוגמה: אוהב/ת ללמוד, לטייל בארץ, חשוב לי בית עם שמחה ופתיחות..."></textarea>
                <div className="flex justify-between mt-8">
                    <button onClick={prevStep} className="text-slate-600 font-semibold">חזרה</button>
                    <button onClick={nextStep} className="btn-dark">המשך לשלב הבא</button>
                </div>
            </Step>

            <Step currentStep={step} stepNumber={3} title="הקסם של היועץ החכם">
                <p className="text-center text-brand-slate mb-6">זהו הערך המוסף שלנו. לחץ/י על הכפתור וראה/י איך היועץ החכם שלנו הופך את הטקסט שלך לפרופיל מרגש.</p>
                <button onClick={handleGenerateAiSuggestion} disabled={isLoading} className="w-full btn-primary flex items-center justify-center gap-2">
                    <Icon name="sparkles" className="w-5 h-5"/>
                    {isLoading ? 'חושב...' : 'הפק לי הצעה לפרופיל'}
                </button>
                {aiSuggestion && (
                    <div className="mt-6 p-4 bg-brand-cream/60 rounded-lg border border-slate-200">
                        <h4 className="font-bold text-brand-dark">ההצעה שלנו:</h4>
                        <p dangerouslySetInnerHTML={renderFormattedText(aiSuggestion)} className="mt-2 text-brand-slate"></p>
                    </div>
                )}
                <div className="flex justify-between mt-8">
                    <button onClick={prevStep} className="text-slate-600 font-semibold">חזרה</button>
                    <button onClick={nextStep} className="btn-dark">המשך לשלב הסופי</button>
                </div>
            </Step>

            <Step currentStep={step} stepNumber={4} title="הפרופיל שלך כמעט מוכן!">
                <div className="text-center">
                    <Icon name="check" className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full p-3 mb-4"/>
                    <p className="text-lg text-brand-slate leading-relaxed">
                        יצרת בהצלחה פרופיל ראשוני. הצעד האחרון והמשמעותי ביותר להפעלת הפרופיל, קבלת הצעות וגישה מלאה לקהילה, הוא השתתפות בערב ההפקה שלנו.
                    </p>
                    <p className="mt-4 font-semibold text-brand-dark">זוהי הדרך שלנו להבטיח קהילה איכותית, רצינית ומחויבת.</p>
                    <Link href="/how-it-works#events" className="inline-block mt-8 btn-primary text-lg">
                        לפרטים והרשמה לערב ההפקה הקרוב
                    </Link>
                </div>
            </Step>
        </div>
    );
};
'use client';
import React, { useState, FC } from 'react';
import { Icon } from '@/components/ui/Icon';

const renderFormattedText = (text: string) => {
    let html = text
        .replace(/### (.*$)/gim, '<h4 class="font-bold text-lg text-brand-dark mb-2 mt-4">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/(\d)\. (.*)/g, '<p class="flex items-start"><span class="mr-2 text-brand-cyan font-bold">$1.</span>$2</p>')
        .replace(/\n/g, '<br />');
    return <div className="text-brand-slate space-y-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
};

const profileQuestions = [
    { id: 'q1', text: 'איך נראה ערב שישי אידיאלי עבורך?' },
    { id: 'q2', text: 'מהי התכונה החשובה ביותר שאת/ה מחפש/ת בבן/בת זוג?' },
    { id: 'q3', text: 'ספר/י על רגע של נחת שהיה לך לאחרונה.' },
];

export const AiToolsSection: FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileAnswers, setProfileAnswers] = useState<{ [key: string]: string }>({});
    const [profileSuggestion, setProfileSuggestion] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [dateRegion, setDateRegion] = useState('ירושלים');
    const [dateBudget, setDateBudget] = useState('נמוך');
    const [dateAtmosphere, setDateAtmosphere] = useState('רגועה');
    const [dateIdeas, setDateIdeas] = useState('');
    const [isDateLoading, setIsDateLoading] = useState(false);
    const [starterInterests, setStarterInterests] = useState('');
    const [conversationStarters, setConversationStarters] = useState('');
    const [isStarterLoading, setIsStarterLoading] = useState(false);
    
    const callApi = async (prompt: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setResult: React.Dispatch<React.SetStateAction<string>>) => {
        setLoading(true);
        setResult('היועץ החכם חושב לרגע...');
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (response.ok) {
                setResult(data.result);
            } else {
                throw new Error(data.error || "משהו השתבש, נסו שוב.");
            }
        } catch (error) {
            setResult('אופס, משהו השתבש. נסה שוב מאוחר יותר.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId: string, answer: string) => {
        setProfileAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleGenerateProfileAnalysis = () => {
        const allAnswered = profileQuestions.every(q => profileAnswers[q.id]?.trim());
        if (!allAnswered) {
            setProfileSuggestion('כדי לקבל ניתוח מדויק, אנא ענה/י על כל השאלות.');
            return;
        }
        const answersText = profileQuestions.map(q => `שאלה: ${q.text}\nתשובה: ${profileAnswers[q.id]}`).join('\n\n');
        const prompt = `אתה "היועץ החכם" של "מעשיך יקרבוך". תפקידך לנתח את התשובות הבאות של משתמש/ת וליצור סיכום אישיות חם, מזמין ומחמיא עבור פרופיל ההיכרויות שלו/ה. התמקד בתכונות החיוביות שעולות מהתשובות. התשובה צריכה להיות פסקה אחת קצרה (2-3 משפטים). התשובות הן:\n${answersText}\n\nסיכום היועץ החכם:`;
        callApi(prompt, setIsProfileLoading, setProfileSuggestion);
    };

    const handleGenerateDateIdeas = () => {
        const prompt = `הצע רעיון מקורי אחד לפגישה ראשונה עבור זוג. הרעיון צריך להתאים לקריטריונים הבאים: אזור בארץ - ${dateRegion}, תקציב - ${dateBudget}, אווירה - ${dateAtmosphere}. הצג את התשובה בפורמט הבא: ### **שם הרעיון** \n **תיאור:** (תיאור קצר) \n **למה זו פגישה טובה:** (הסבר קצר)`;
        callApi(prompt, setIsDateLoading, setDateIdeas);
    };

    const handleGenerateStarters = () => {
        if (!starterInterests.trim()) { setConversationStarters('אנא הזן לפחות תחום עניין אחד.'); return; }
        const prompt = `צור 3 שאלות מקוריות לפתיחת שיחה עם מישהו/י שתחומי העניין שלו/ה הם: "${starterInterests}". הצג את התשובות בפורמט של רשימה ממוספרת.`;
        callApi(prompt, setIsStarterLoading, setConversationStarters);
    };

    const tabs = [
        { id: 'profile', label: 'יועץ הפרופיל החכם' },
        { id: 'dateIdeas', label: 'רעיונות לפגישה' },
        { id: 'starters', label: 'פתיחת שיחה' },
    ];
    
    return (
        <section id="ai-tools" className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">כלי עזר חכמים להצלחה</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">היועץ החכם שלכם להצלחה</p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex justify-center border-b border-slate-200">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-6 font-medium text-lg transition-colors duration-300 ${activeTab === tab.id ? 'border-b-2 border-brand-cyan text-brand-cyan' : 'text-brand-slate hover:text-brand-dark'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="bg-brand-cream/60 p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200/50">
                        {activeTab === 'profile' && (
                            <div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-4">✨ יועץ הפרופיל החכם</h3>
                                <p className="text-brand-slate mb-6">ענו על מספר שאלות קצרות, והיועץ החכם שלנו יפיק עבורכם סיכום אישיותי שיאיר את התכונות הטובות ביותר שלכם.</p>
                                <div className="space-y-6">
                                    {profileQuestions.map(q => (
                                        <div key={q.id}>
                                            <label className="block text-md font-semibold text-brand-dark/90 mb-2">{q.text}</label>
                                            <textarea onChange={(e) => handleAnswerChange(q.id, e.target.value)} placeholder="התשובה שלך..." className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition bg-white" />
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleGenerateProfileAnalysis} disabled={isProfileLoading} className="mt-6 btn-dark w-full flex items-center justify-center gap-2">
                                    {isProfileLoading ? 'מנתח את תשובותיך...' : '✨ הפק סיכום יועץ חכם'}
                                </button>
                                {profileSuggestion && (
                                    <div className="mt-6 p-6 bg-white rounded-lg border border-slate-200">
                                        <h4 className="font-bold text-brand-dark flex items-center gap-2"><Icon name="sparkles" className="w-5 h-5 text-brand-cyan"/> סיכום היועץ החכם:</h4>
                                        <div className="mt-2">{renderFormattedText(profileSuggestion)}</div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === 'dateIdeas' && (
                           <div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-6">✨ מחולל רעיונות לפגישה</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-brand-slate mb-1">אזור</label>
                                        <select value={dateRegion} onChange={(e) => setDateRegion(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white"><option>ירושלים</option> <option>תל אביב והמרכז</option> <option>הצפון</option> <option>הדרום</option></select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-slate mb-1">תקציב</label>
                                        <select value={dateBudget} onChange={(e) => setDateBudget(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white"><option>נמוך</option> <option>בינוני</option> <option>גבוה</option></select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-brand-slate mb-1">אווירה</label>
                                        <select value={dateAtmosphere} onChange={(e) => setDateAtmosphere(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white"><option>רגועה</option> <option>אקטיבית</option> <option>תרבותית</option></select>
                                    </div>
                                </div>
                                <button onClick={handleGenerateDateIdeas} disabled={isDateLoading} className="btn-dark w-full flex items-center justify-center gap-2">
                                    {isDateLoading ? 'חושב על רעיון...' : '✨ קבל הצעות לפגישה'}
                                </button>
                                {dateIdeas && <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">{renderFormattedText(dateIdeas)}</div>}
                            </div>
                        )}
                        {activeTab === 'starters' && (
                            <div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-4">✨ מחולל פתיחים לשיחה</h3>
                                <p className="text-brand-slate mb-6">מהם תחומי העניין של הצד השני? הזינו אותם וקבלו רעיונות למשפטי פתיחה</p>
                                <input type="text" value={starterInterests} onChange={(e) => setStarterInterests(e.target.value)} placeholder="לדוגמה: טיולים, מוזיקה חסידית, בישול" className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white"/>
                                <button onClick={handleGenerateStarters} disabled={isStarterLoading} className="mt-4 btn-dark w-full flex items-center justify-center gap-2">
                                    {isStarterLoading ? 'מנסח משפטים...' : '✨ קבל רעיונות לפתיחה'}
                                </button>
                                {conversationStarters && <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">{renderFormattedText(conversationStarters)}</div>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
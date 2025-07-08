'use client';
import React, { useState } from 'react';
import { Icon } from './ui/Icon';

export const AiToolsSection = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [dateRegion, setDateRegion] = useState('ירושלים');
    const [dateBudget, setDateBudget] = useState('נמוך');
    const [dateAtmosphere, setDateAtmosphere] = useState('רגועה');
    const [dateIdeas, setDateIdeas] = useState('');
    const [isDateLoading, setIsDateLoading] = useState(false);
    const [starterInterests, setStarterInterests] = useState('');
    const [conversationStarters, setConversationStarters] = useState('');
    const [isStarterLoading, setIsStarterLoading] = useState(false);
    const [profileKeywords, setProfileKeywords] = useState('');
    const [profileSuggestion, setProfileSuggestion] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    // This is a mock function. In a real app, it would call the Gemini API.
    const callApi = async (prompt, setLoading, setResult) => {
        setLoading(true);
        setResult('חושב על רעיון מבריק...');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        setResult('זוהי תשובה לדוגמה מה-AI. הטקסט שיתקבל יהיה מותאם לבקשה שלך.');
        setLoading(false);
    };
    
    const handleGenerateProfile = () => {
        if (!profileKeywords.trim()) { setProfileSuggestion('אנא הזן כמה מילים על עצמך.'); return; }
        callApi(`...`, setIsProfileLoading, setProfileSuggestion);
    };

    const handleGenerateDateIdeas = () => {
        callApi(`...`, setIsDateLoading, setDateIdeas);
    };

    const handleGenerateStarters = () => {
        if (!starterInterests.trim()) { setConversationStarters('אנא הזן לפחות תחום עניין אחד.'); return; }
        callApi(`...`, setIsStarterLoading, setConversationStarters);
    };
    
    const tabs = [
        { id: 'profile', label: 'עוזר ניסוח פרופיל' },
        { id: 'dateIdeas', label: 'רעיונות לדייט' },
        { id: 'starters', label: 'פתיחת שיחה' },
    ];

    return (
        <section id="ai-tools" className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-brand-cyan tracking-wider uppercase">כלי עזר חכמים להצלחה</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">
                        היועץ החכם שלכם להצלחה
                    </p>
                    <p className="max-w-3xl mt-6 mx-auto text-lg text-brand-dark/70 leading-relaxed">
                        כדי לתת לכם יתרון, שילבנו כלים חכמים שיעזרו לכם לנסח פרופיל מנצח, לשבור את הקרח וליזום פגישות בלתי נשכחות.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex justify-center border-b border-slate-200">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-6 font-medium text-lg transition-colors duration-300 ${activeTab === tab.id ? 'border-b-2 border-brand-cyan text-brand-cyan' : 'text-brand-dark/60 hover:text-brand-dark'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-brand-cream/60 p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200/50">
                        {activeTab === 'profile' && (
                            <div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-4">✨ עוזר ניסוח פרופיל אישי</h3>
                                <p className="text-brand-dark/70 mb-6">כתבו כמה מילים על עצמכם, וה-AI ינסח עבורכם הצעה לפסקה שתציג אתכם בצורה הטובה ביותר.</p>
                                <textarea value={profileKeywords} onChange={(e) => setProfileKeywords(e.target.value)} placeholder="לדוגמה: אוהב לטייל בארץ, ללמוד דף יומי, חשוב לי בית עם שמחה..." className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition bg-white" />
                                <button onClick={handleGenerateProfile} disabled={isProfileLoading} className="mt-4 w-full bg-brand-dark text-white px-6 py-3.5 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400">
                                    {isProfileLoading ? 'מנסח פרופיל...' : '✨ נסח לי פרופיל'}
                                </button>
                                {profileSuggestion && <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200"><p className="text-brand-dark/80 leading-relaxed">{profileSuggestion}</p></div>}
                            </div>
                        )}
                        {/* Other tabs will be added here */}
                    </div>
                </div>
            </div>
        </section>
    );
};
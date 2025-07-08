// src/components/sections/AiToolsSection.tsx

'use client';

import React, { useState } from 'react';
// נייבא את תתי-הרכיבים, כעת הם יכילו גם את לוגיקת הטעינה
import ProfileWriterTool from './ProfileWriterTool';
import DateIdeaGenerator from './DateIdeaGenerator';
import ConversationStarterTool from './ConversationStarterTool';

export default function AiToolsSection() {
    const [activeTab, setActiveTab] = useState('profile');
    
    const tabs = [
        { id: 'profile', label: 'עוזר ניסוח פרופיל' },
        { id: 'dateIdeas', label: 'רעיונות לדייט' },
        { id: "starters", label: "פתיחת שיחה" },
    ];

    return (
        <section id="ai-tools" className="py-24 sm:py-32 bg-white" dir="rtl">
            <div className="container mx-auto px-6 lg:px-8">
                {/* --- 1. עדכון הכותרות והטקסטים --- */}
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-[#06b6d4] tracking-wider uppercase">כלי עזר חכמים להצלחה</h2>
                    <p className="mt-2 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                        הייעוץ החכם שלכם להצלחה
                    </p>
                    <p className="max-w-3xl mt-6 mx-auto text-lg text-slate-600 leading-relaxed">
                        כדי לתת לכם יתרון, שילבנו כלים חכמים שיעזרו לכם לנסח פרופיל מנצח, לשבור את הקרח וליזום פגישות בלתי נשכחות.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex justify-center border-b border-stone-200">
                        {tabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-6 font-medium text-lg transition-colors duration-300 ${activeTab === tab.id ? 'border-b-2 border-[#06b6d4] text-[#06b6d4]' : 'text-slate-500 hover:text-slate-800'}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="bg-[#F9FAFB] p-8 sm:p-10 rounded-2xl shadow-xl border border-stone-200/50 min-h-[450px]">
                        {activeTab === 'profile' && <ProfileWriterTool />}
                        {activeTab === 'dateIdeas' && <DateIdeaGenerator />}
                        {activeTab === 'starters' && <ConversationStarterTool />}
                    </div>
                </div>
            </div>
        </section>
    );
}


// --- 2. הוספת סקלטין למצב טעינה ---
// רכיב זה יכול להיות בקובץ נפרד (למשל ui/ToolSkeleton.tsx)
const ToolSkeleton = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-7 bg-slate-300 rounded-md w-3/4"></div>
        <div className="h-5 bg-slate-200 rounded-md w-full"></div>
        <div className="h-5 bg-slate-200 rounded-md w-5/6"></div>
        <div className="pt-8 space-y-4">
            <div className="h-24 bg-slate-200 rounded-lg"></div>
            <div className="h-12 bg-slate-300 rounded-lg"></div>
        </div>
    </div>
);

// --- 3. עדכון תתי-הרכיבים כך שישתמשו בסקלטין ---
// עליך להחליף את הקוד בקבצים הקיימים של תתי-הרכיבים בקוד הבא

// לדוגמה, בקובץ ProfileWriterTool.tsx
// (הקוד עבור DateIdeaGenerator ו-ConversationStarterTool יהיה דומה מאוד)
/*
'use client';
import React, { useState } from 'react';
// ... import של רכיבים נוספים

const callApi = async (prompt, setLoading, setResult) => {
    setLoading(true);
    setResult('');
    await new Promise(res => setTimeout(res, 2000)); // הדמיית טעינה ארוכה יותר
    setResult("זוהי תשובה מה-API המדומה...");
    setLoading(false);
};

export default function ProfileWriterTool() {
    const [keywords, setKeywords] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
        if (!keywords.trim()) {
            setSuggestion('אנא הזן כמה מילים על עצמך.');
            return;
        }
        callApi(`profile: ${keywords}`, setIsLoading, setSuggestion);
    };

    return (
        <div>
            {isLoading ? (
                <ToolSkeleton />
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">✨ עוזר ניסוח פרופיל אישי</h3>
                    <p className="text-slate-600 mb-6">כתבו כמה מילים על עצמכם, וה-AI ינסח עבורכם הצעה לפסקה שתציג אתכם בצורה הטובה ביותר.</p>
                    <textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="לדוגמה: אוהב לטייל בארץ, ללמוד דף יומי, חשוב לי בית עם שמחה..." className="w-full h-32 p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4] transition" />
                    <button onClick={handleGenerate} disabled={isLoading} className="mt-4 w-full bg-slate-900 text-white px-6 py-3.5 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400">
                        ✨ נסח לי פרופיל
                    </button>
                    {suggestion && (
                        <div className="mt-6 p-6 bg-white rounded-lg border border-stone-200">
                            <p>{suggestion}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
*/
// src/components/sections/ProfileWriterTool.tsx

'use client';
import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import ToolSkeleton from '@/components/ui/ToolSkeleton';

// פונקציית API מדומה
const callApi = async (setLoading: Function, setResult: Function) => {
    setLoading(true);
    setResult('');
    await new Promise(res => setTimeout(res, 1500));
    setResult("זוהי הצעה לפרופיל אישי, מבוססת על המילים שהזנת. תוכל לערוך אותה ולהשתמש בה באתרים שונים. בהצלחה!");
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
        callApi(setIsLoading, setSuggestion);
    };

    return (
        <div>
            {isLoading ? (
                <ToolSkeleton />
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">✨ עוזר ניסוח פרופיל אישי</h3>
                    <p className="text-slate-600 mb-6">כתבו כמה מילים על עצמכם, וה-AI ינסח עבורכם הצעה לפסקה שתציג אתכם בצורה הטובה ביותר.</p>
                    <textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="לדוגמה: אוהב לטייל בארץ, ללמוד דף יומי..." className="w-full h-32 p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4] transition" />
                    <button onClick={handleGenerate} disabled={isLoading} className="mt-4 w-full bg-slate-900 text-white px-6 py-3.5 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400">
                        נסח לי פרופיל
                    </button>
                    {suggestion && (
                        <div className="mt-6 p-6 bg-white rounded-lg border border-stone-200">
                            <p className="leading-relaxed">{suggestion}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
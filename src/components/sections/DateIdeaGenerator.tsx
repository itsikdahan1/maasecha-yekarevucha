// src/components/sections/DateIdeaGenerator.tsx

'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/Icon';
import ToolSkeleton from '@/components/ui/ToolSkeleton';

const callApi = async (setLoading: Function, setResult: Function) => {
    setLoading(true);
    setResult('');
    await new Promise(res => setTimeout(res, 1500));
    setResult("### סיור טעימות בשוק מחנה יהודה\n**תיאור:** פעילות כיפית המאפשרת שיחה קלילה.\n\n### טיול שקיעה בטיילת ארמון הנציב\n**תיאור:** אווירה רומנטית ושקטה עם נוף מרהיב.");
    setLoading(false);
};

const FormattedApiResponse = ({ text }: { text: string }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (<div className="text-slate-700 space-y-3 leading-relaxed">{lines.map((line, index) => { if (line.startsWith('### ')) { return <h4 key={index} className="font-bold text-lg text-slate-800 mb-1 mt-3">{line.substring(4)}</h4>; } return <p key={index}>{line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>; })}</div>);
};


export default function DateIdeaGenerator() {
    const [region, setRegion] = useState('ירושלים');
    const [budget, setBudget] = useState('נמוך');
    const [atmosphere, setAtmosphere] = useState('רגועה');
    const [ideas, setIdeas] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
        callApi(setIsLoading, setIdeas);
    };

    return (
        <div>
            {isLoading ? (
                <ToolSkeleton />
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">✨ מחולל רעיונות לדייט</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                         <div><label className="block text-sm font-medium text-slate-700 mb-1">אזור</label><select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4]"><option>ירושלים</option><option>תל אביב</option></select></div>
                         <div><label className="block text-sm font-medium text-slate-700 mb-1">תקציב</label><select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4]"><option>נמוך</option><option>בינוני</option></select></div>
                         <div><label className="block text-sm font-medium text-slate-700 mb-1">אווירה</label><select value={atmosphere} onChange={(e) => setAtmosphere(e.target.value)} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4]"><option>רגועה</option><option>אקטיבית</option></select></div>
                    </div>
                    <button onClick={handleGenerate} disabled={isLoading} className="w-full bg-slate-900 text-white px-6 py-3.5 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400">
                        קבל הצעות לדייט
                    </button>
                    {ideas && <div className="mt-6 p-6 bg-white rounded-lg border border-stone-200"><FormattedApiResponse text={ideas}/></div>}
                </>
            )}
        </div>
    );
}
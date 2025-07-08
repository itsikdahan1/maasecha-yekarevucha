// src/components/sections/ConversationStarterTool.tsx

'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/Icon';
import ToolSkeleton from '@/components/ui/ToolSkeleton';

const callApi = async (setLoading: Function, setResult: Function) => {
    setLoading(true);
    setResult('');
    await new Promise(res => setTimeout(res, 1500));
    setResult("1. ראיתי שאת/ה אוהב/ת מוזיקה חסידית, איזה אמן ריגש אותך במיוחד לאחרונה?\n2. מה המתכון המנצח שלך שאת/ה הכי אוהב/ת להכין?");
    setLoading(false);
};

const FormattedApiResponse = ({ text }: { text: string }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (<div className="text-slate-700 space-y-3 leading-relaxed">{lines.map((line, index) => (<p key={index} className="flex items-start"><span className="ml-2 text-[#06b6d4] font-bold">{line.substring(0, 2)}</span>{line.substring(2)}</p>))}</div>);
};


export default function ConversationStarterTool() {
    const [interests, setInterests] = useState('');
    const [starters, setStarters] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
        if (!interests.trim()) {
            setStarters('אנא הזן לפחות תחום עניין אחד.');
            return;
        }
        callApi(setIsLoading, setStarters);
    };
    
    return (
        <div>
            {isLoading ? (
                <ToolSkeleton />
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">✨ מחולל פתיחים לשיחה</h3>
                    <p className="text-slate-600 mb-6">מהם תחומי העניין של הצד השני? הזינו אותם וקבלו רעיונות למשפטי פתיחה.</p>
                    <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="לדוגמה: טיולים, מוזיקה חסידית, בישול" className="w-full p-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#06b6d4]"/>
                    <button onClick={handleGenerate} disabled={isLoading} className="mt-4 w-full bg-slate-900 text-white px-6 py-3.5 rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-400">
                        קבל רעיונות לפתיחה
                    </button>
                    {starters && <div className="mt-6 p-6 bg-white rounded-lg border border-stone-200"><FormattedApiResponse text={starters}/></div>}
                </>
            )}
        </div>
    );
}
// src/components/AIChat.tsx
'use client';
import React, { useState, useEffect, useRef, FC } from 'react';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

interface Message {
    id: number;
    text: string;
    sender: 'ai' | 'user';
    isThinking?: boolean;
}

interface AIChatProps { 
    toggle: () => void; 
}

type ChatPhase = 'INITIAL' | 'AWAITING_GENDER' | 'AWAITING_STATUS' | 'CHATTING';

// --- כאן התיקון ---
const renderFormattedMessage = (text: string) => {
    // ממיר גם הדגשות וגם ירידות שורה ל-HTML תקין
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
    return { __html: formattedText };
};

export const AIChat: FC<AIChatProps> = ({ toggle }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "שלום! אני היועץ החכם של 'מעשיך יקרבוך'.", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [chatPhase, setChatPhase] = useState<ChatPhase>('INITIAL');
    const [gender, setGender] = useState<'גבר' | 'אישה' | null>(null);
    const [userContext, setUserContext] = useState<string | null>(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => { 
        if (chatBoxRef.current) { 
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; 
        } 
    }, [messages]);

    const addMessage = (text: string, sender: 'ai' | 'user') => {
        setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, sender }]);
    };
    
    const handleStart = () => {
        addMessage("כדי שאוכל להתאים את התשובות עבורך, אשאל 2 שאלות קצרות. ראשית, מה המגדר שלך?", 'ai');
        setChatPhase('AWAITING_GENDER');
    };

    const handleGenderSelect = (selectedGender: 'גבר' | 'אישה') => {
        addMessage(`אני ${selectedGender}`, 'user');
        setGender(selectedGender);
        setTimeout(() => {
            addMessage("תודה. ומה הסטטוס?", 'ai');
            setChatPhase('AWAITING_STATUS');
        }, 500);
    };

    const handleStatusSelect = (status: string) => {
        addMessage(status, 'user');
        const finalContext = `${gender}, ${status}`;
        setUserContext(finalContext);
        setTimeout(() => {
            addMessage("מעולה, תודה. במה אוכל לעזור לך היום?", 'ai');
            setChatPhase('CHATTING');
        }, 500);
    };

    const handleSend = async () => {
        if (inputValue.trim() === '' || chatPhase !== 'CHATTING') return;
        
        addMessage(inputValue, 'user');
        const currentInput = inputValue;
        setInputValue('');

        setTimeout(() => setMessages(prev => [...prev, { id: Date.now(), text: "...", sender: 'ai', isThinking: true }]), 300);

        const prompt = `בהינתן שההקשר שלי הוא: '${userContext}'. שאלתי היא: "${currentInput}"`;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            setMessages(prev => {
                const thinkingRemoved = prev.filter(m => !m.isThinking);
            const newAiMessage = { id: Date.now(), text: response.ok ? data.result : (data.error || "אופס, משהו השתבש."), sender: 'ai' as const };
                return [...thinkingRemoved, newAiMessage];
            });
        } catch (error) {
            setMessages(prev => {
                const thinkingRemoved = prev.filter(m => !m.isThinking);
                return [...thinkingRemoved, { id: Date.now(), text: "שגיאת רשת, אנא נסה שוב.", sender: 'ai' }];
            });
        }
    };

    const statusOptions = gender === 'גבר' ? ["רווק", "גרוש", "אלמן"] : ["רווקה", "גרושה", "אלמנה"];

    const renderPhaseControls = () => {
        switch (chatPhase) {
            case 'INITIAL':
                return <button onClick={handleStart} className="px-6 py-3 bg-brand-cyan text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors">לחץ/י כאן כדי להתחיל</button>;
            case 'AWAITING_GENDER':
                return (
                    <div className="flex justify-center gap-3">
                        <button onClick={() => handleGenderSelect('גבר')} className="px-5 py-2 bg-brand-cyan text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors">גבר</button>
                        <button onClick={() => handleGenderSelect('אישה')} className="px-5 py-2 bg-brand-cyan text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors">אישה</button>
                    </div>
                );
            case 'AWAITING_STATUS':
                return (
                    <div className="flex flex-wrap justify-center gap-2">
                        {statusOptions.map(status => (
                            <button key={status} onClick={() => handleStatusSelect(status)} className="px-4 py-2 bg-brand-cyan text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors text-sm">{status}</button>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-[90vh] max-h-[700px]" dir="rtl">
                <header className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h4 className="font-bold text-slate-800">צ'אט סיוע מהיר</h4>
                    <button onClick={toggle} className="p-1 hover:bg-slate-200 rounded-full"><Icon name="x" className="w-5 h-5"/></button>
                </header>
                <div ref={chatBoxRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'ai' ? 'bg-slate-200 text-slate-800' : 'bg-brand-dark text-white'}`}>
                                {msg.isThinking ? (
                                    <div className="animate-pulse p-1">...</div> 
                                ) : (
                                    <span dangerouslySetInnerHTML={renderFormattedMessage(msg.text)} />
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center pt-2">{renderPhaseControls()}</div>
                </div>
                <footer className="p-3 border-t bg-white rounded-b-2xl">
                    <div className="flex items-center">
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={e => setInputValue(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' && handleSend()} 
                            placeholder={chatPhase === 'CHATTING' ? "כתוב את שאלתך..." : "אנא השלם/י את השלבים למעלה"}
                            className="flex-1 p-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan disabled:bg-slate-100"
                            disabled={chatPhase !== 'CHATTING'}
                        />
                        <button onClick={handleSend} className="mr-3 bg-brand-cyan text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors disabled:bg-slate-400" disabled={chatPhase !== 'CHATTING'} aria-label="שלח הודעה">
                            <Icon name="send" className="w-5 h-5"/>
                        </button>
                    </div>
                </footer>
            </div>
        </motion.div>
    );
}
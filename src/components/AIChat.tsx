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

export const AIChat: FC<AIChatProps> = ({ toggle }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "שלום! אני עוזר הבינה המלאכותית שלך. איך אפשר לעזור היום?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => { 
        if (chatBoxRef.current) { 
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; 
        } 
    }, [messages]);

    const handleSend = async () => {
        if (inputValue.trim() === '') return;
        
        const userMessage: Message = { id: Date.now(), text: inputValue, sender: 'user' };
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');

        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "...", sender: 'ai', isThinking: true }]);
        }, 300);

        // --- כאן השינוי ---
        // אנחנו שולחים רק את הטקסט של המשתמש. 
        // השרת (route.ts) יוסיף את הוראות המערכת (system prompt).
        const prompt = inputValue;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();

            setMessages(prev => {
                const thinkingRemoved = prev.filter(m => !m.isThinking);
                if (response.ok) {
                    return [...thinkingRemoved, { id: Date.now() + 2, text: data.result, sender: 'ai' }];
                } else {
                    return [...thinkingRemoved, { id: Date.now() + 2, text: "אופס, משהו השתבש.", sender: 'ai' }];
                }
            });

        } catch (error) {
            setMessages(prev => {
                const thinkingRemoved = prev.filter(m => !m.isThinking);
                return [...thinkingRemoved, { id: Date.now() + 2, text: "שגיאת רשת, אנא נסה שוב.", sender: 'ai' }];
            });
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }} 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
        >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col h-[90vh] max-h-[700px]" dir="rtl">
                <header className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h4 className="font-bold text-slate-800">צ'אט סיוע מהיר</h4>
                    <button onClick={toggle} className="p-1 hover:bg-slate-200 rounded-full">
                        <Icon name="x" className="w-5 h-5"/>
                    </button>
                </header>
                <div ref={chatBoxRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'ai' ? 'bg-slate-200 text-slate-800' : 'bg-brand-dark text-white'}`}>
                                {msg.isThinking ? 
                                    <div className="flex items-center space-x-1 justify-center p-1">
                                        <span className="animate-pulse">...</span>
                                    </div> 
                                    : msg.text
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <footer className="p-3 border-t bg-white rounded-b-2xl">
                    <div className="flex items-center">
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="כתוב את שאלתך..." className="flex-1 p-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"/>
                        <button onClick={handleSend} className="mr-3 bg-brand-cyan text-white p-3 rounded-full hover:bg-cyan-600 transition-colors">
                            <Icon name="send" className="w-5 h-5"/>
                        </button>
                    </div>
                </footer>
            </div>
        </motion.div>
    );
}
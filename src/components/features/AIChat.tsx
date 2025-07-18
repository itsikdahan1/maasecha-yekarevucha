'use client';
import React, { useState, useEffect, useRef, FC } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

export const AIChat: FC<{ toggle: () => void }> = ({ toggle }) => {
    const [messages, setMessages] = useState<any[]>([
        { id: 1, text: "שלום! אני היועץ החכם שלך. איך אפשר לעזור היום?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [userContext, setUserContext] = useState<string | null>(null);
    const [isAwaitingContext, setIsAwaitingContext] = useState(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => { 
        if (chatBoxRef.current) { 
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; 
        } 
    }, [messages]);

    const handleContextSelect = (context: string) => {
        setUserContext(context);
        setIsAwaitingContext(false);
        const aiResponse = { id: Date.now(), text: "הבנתי, תודה. אמשיך מכאן עם המידע הזה.", sender: 'ai' };
        setMessages(prev => [...prev, aiResponse]);
    };

    const handleSend = async () => {
        if (inputValue.trim() === '') return;
        
        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "...", sender: 'ai', isThinking: true }]);
        }, 300);

        const prompt = userContext 
            ? `בהינתן שאני ${userContext}, שאלתי היא: "${inputValue}"`
            : inputValue;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();

            setMessages(prev => {
                const thinkingRemoved = prev.filter(m => !m.isThinking);
                let newMessages: any[] = [];

                if (response.ok) {
                    newMessages.push({ id: Date.now() + 2, text: data.result, sender: 'ai' });
                    if (!userContext && !isAwaitingContext) {
                        newMessages.push({ 
                            id: Date.now() + 3, 
                            text: "כדי שאוכל לתת לך תשובות מדויקות יותר בעתיד, ניתן לבחור את הסטטוס שלך:", 
                            sender: 'ai' 
                        });
                        setIsAwaitingContext(true);
                    }
                } else {
                    newMessages.push({ id: Date.now() + 2, text: data.error || "אופס, משהו השתבש.", sender: 'ai' });
                }
                return [...thinkingRemoved, ...newMessages];
            });

        } catch (error) {
            setMessages(prev => {
                const thinkingRemoved = prev.filter(m => !m.isThinking);
                return [...thinkingRemoved, { id: Date.now() + 2, text: "שגיאת רשת, אנא נסה שוב.", sender: 'ai' }];
            });
        }
    };

    const contextOptions = ["אני רווק", "אני רווקה", "אני גרוש", "אני גרושה", "אני אלמן", "אני אלמנה"];

    const renderFormattedMessage = (text: string) => {
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
        return { __html: formattedText };
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
                        <div key={msg.id} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}> {/* justify-start ב-RTL הוא ימין, justify-end הוא שמאל */}
                            <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl text-right ${msg.sender === 'ai' ? 'bg-slate-200 text-slate-800' : 'bg-brand-dark text-white'}`}> {/* הוספת text-right לכל הודעה */}
                                {msg.isThinking ? 
                                    <div className="animate-pulse p-1">...</div> 
                                    : <span dangerouslySetInnerHTML={renderFormattedMessage(msg.text)} />
                                }
                            </div>
                        </div>
                    ))}
                    {isAwaitingContext && (
                        <div className="flex flex-wrap justify-end gap-2 pt-2"> {/* שינוי justify-center ל-justify-end */}
                            {contextOptions.map(context => (
                                <button key={context} onClick={() => handleContextSelect(context)} className="px-4 py-2 bg-brand-cyan text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors text-sm">
                                    {context}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <footer className="p-3 border-t bg-white rounded-b-2xl">
                    <div className="flex items-center">
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={e => setInputValue(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' && handleSend()} 
                            placeholder="כתוב את שאלתך..."
                            className="flex-1 p-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan text-right" /* <-- הוספת text-right */
                        />
                        <button 
                            onClick={handleSend} 
                            className="mr-3 bg-brand-cyan text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                            aria-label="שלח הודעה"
                        >
                            <Icon name="send" className="w-5 h-5"/>
                        </button>
                    </div>
                </footer>
            </div>
        </motion.div>
    );
};
// src/components/features/AiToolsSection.tsx
'use client';
import React, { useState, FC } from 'react';
import { Icon } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';

// אנימציות - ליטוש אנימציות גלובלי
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 70,
            damping: 10,
        },
    },
};

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const tabButtonVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3,
            ease: "easeOut"
        },
    }),
};

const resultBoxVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } },
};


const renderFormattedText = (text: string) => {
    let html = text
        .replace(/### (.*$)/gim, '<h3 class="font-bold text-2xl text-brand-dark mb-3 mt-5">$1</h3>')
        .replace(/#### (.*$)/gim, '<h4 class="font-semibold text-xl text-brand-dark mb-2 mt-4">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/(\d+)\. (.*?)(\n|$)/g, '<p class="flex items-start text-right"><span class="ml-2 font-bold text-brand-cyan flex-shrink-0">$1.</span>$2</p>')
        .replace(/\n/g, '<br />');
    return <div className="text-brand-slate space-y-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
};

const profileQuestions = [
    { id: 'q1', text: 'מהם שלושה דברים שאת/ה נהנה/ית לעשות בזמנך הפנוי?' },
    { id: 'q2', text: 'על איזו תכונה באישיותך לא היית מוותר/ת, ומדוע?' },
    { id: 'q3', text: 'מהו ערך מרכזי אחד שמנחה אותך בחיים?' },
];

export const AiToolsSection: FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileAnswers, setProfileAnswers] = useState<{ [key: string]: string }>({});
    const [profileSuggestion, setProfileSuggestion] = useState('');
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    const [dateRegion, setDateRegion] = useState('מרכז');
    const [dateBudget, setDateBudget] = useState('סביר');
    const [dateAtmosphere, setDateAtmosphere] = useState('שילוב של רגוע ופעיל');
    const [dateCityFreeText, setDateCityFreeText] = useState('');
    const [dateFreeText, setDateFreeText] = useState('');
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
            if (response.ok) { setResult(data.result); }
            else { throw new Error(data.error || "משהו השתבש, נסו שוב."); }
        } catch (error) {
            console.error("API call failed:", error);
            setResult('אופס, משהו השתבש. נסה שוב מאוחר יותר.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateProfileAnalysis = () => {
        const allAnswered = profileQuestions.every(q => profileAnswers?.[q.id]?.trim());
        if (!allAnswered) {
            setProfileSuggestion('כדי לקבל הצעה מותאמת, אנא ענה/י על כל השאלות.');
            return;
        }
        const answersText = profileQuestions.map(q => `- ${q.text}\n  תשובה: ${profileAnswers?.[q.id]}`).join('\n');
        const prompt = `אתה "אשף הפרופיל" של "מעשיך יקרבוך". משימתך היא לנתח את התשובות הבאות ולנסח על בסיסן פסקה קצרה (עד 4 משפטים), חמה, ומזמינה שניתן להעתיק לפרופיל היכרויות. הדגש את הנקודות החיוביות שעולות מהטקסט וצור תיאור אישיותי אותנטי. התשובות הן:\n${answersText}\n\n### הצעה לפרופיל שלך:`;
        callApi(prompt, setIsProfileLoading, setProfileSuggestion);
    };

    const handleGenerateDateIdeas = () => {
        let finalRegion = dateRegion;
        if (dateRegion === 'אחר' && dateCityFreeText.trim()) {
            finalRegion = dateCityFreeText.trim();
        }

        let prompt = `הצע 3 רעיונות מקוריים לפגישה ראשונה עבור זוג מהמגזר הדתי. הרעיונות צריכים להתאים לקריטריונים הבאים: אזור - ${finalRegion}, תקציב - ${dateBudget}, אווירה רצויה - ${dateAtmosphere}.`;
        if (dateFreeText.trim()) {
            prompt += ` קחו בחשבון גם את הפרטים הבאים: "${dateFreeText}".`;
        }
        prompt += ` הצג כל הצעה בפורמט ברור עם כותרת, תיאור, ומדוע זו פגישה טובה. לדוגמא: #### 1. שם הרעיון\nתיאור:...\nלמה זה טוב: ...`;
        callApi(prompt, setIsDateLoading, setDateIdeas);
    };

    const handleGenerateStarters = () => {
        if (!starterInterests.trim()) { setConversationStarters('אנא הזן/י לפחות תחום עניין אחד.'); return; }
        const prompt = `בהינתן שהאדם שאני רוצה לפנות אליו מתעניין ב-"${starterInterests}", צור 3 שאלות מקוריות, פתוחות ומעניינות (לא שאלות של כן/לא) שאפשר לפתוח איתן שיחה. הצג אותן כרשימה ממוספרת.`;
        callApi(prompt, setIsStarterLoading, setConversationStarters);
    };

    const tabs = [
        { id: 'profile', label: 'אשף הפרופיל', icon: "user" },
        { id: 'dateIdeas', label: 'רעיונות לפגישה', icon: "heart" },
        { id: 'starters', label: 'שובר הקרח', icon: "chat" },
    ];

    return (
        <motion.section
            id="ai-tools"
            // *** שינוי מרכזי כאן: צמצום משמעותי של ה-padding העליון והתחתון של הסקשן הראשי ***
            className="py-10 sm:py-16 bg-brand-cream overflow-x-hidden" 
            dir="rtl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-12"> {/* החזרת ה-mb-12 המקורי כדי לשמור על הרווח בין הטקסט לטאבים */}
                    <p className="mt-2 text-4xl sm:text-5xl font-bold text-brand-dark tracking-tight">היועץ החכם לדרך</p>
                    {/* *** שינוי מרכזי כאן: הגדלת max-w ושינוי leading כדי שהפיסקה תישאר בשורה אחת ככל הניתן *** */}
                    {/* חזרתי ל-text-lg המקורי כפי שביקשת, והגדלתי את max-w ואת ה-leading (ריווח שורות) */}
                    <p className="max-w-3xl mt-6 mx-auto text-lg text-brand-slate leading-normal">
                        לא יודעים איך להתחיל? מתלבטים מה לכתוב על עצמכם? קבלו עזרה מהיועץ החכם שלנו.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    {/* Desktop Tabs */}
                    <div className="hidden sm:flex justify-center mb-8 gap-x-6"> {/* חזרתי ל-mb-8 ו-gap-x-6 המקוריים */}
                        {tabs.map((tab, i) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 whitespace-nowrap py-3.5 px-6 rounded-full font-semibold text-lg transition-all duration-300 shadow-md ${
                                    activeTab === tab.id ? 'bg-brand-cyan text-white shadow-brand-cyan/30' : 'bg-white text-brand-slate hover:bg-brand-light-gray'
                                }`}
                                variants={tabButtonVariants}
                                custom={i}
                            >
                                <Icon name={tab.icon} className="w-5 h-5 text-brand-cyan" /> {/* החזרת גודל אייקון מקורי */}
                                <span>{tab.label}</span>
                            </motion.button>
                        ))}
                    </div>
                    {/* Mobile Select Menu */}
                    <div className="sm:hidden mb-6"> {/* חזרתי ל-mb-6 המקורי */}
                        <select onChange={(e) => setActiveTab(e.target.value)} value={activeTab} className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white text-lg shadow-sm"> {/* חזרתי ל-p-4 ו-text-lg מקוריים */}
                            {tabs.map(tab => (
                                <option key={tab.id} value={tab.id}>{tab.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* תוכן הטאב - עיצוב "Glassmorphism" ושיפור ויזואלי */}
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={contentVariants}
                        className="bg-brand-light-gray/70 backdrop-blur-md pt-6 pb-8 px-8 sm:pt-8 sm:pb-10 sm:px-12 rounded-2xl shadow-2xl border border-slate-200/50" // ללא שינוי, בהתאם לבקשתך לא לצמצם רווחים פנימיים באלמנטים
                    >
                        <AnimatePresence mode="wait">
                            {activeTab === 'profile' && (
                                <motion.div key="profile-tab-content" initial="hidden" animate="visible" exit="hidden" variants={contentVariants}>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">
                                        <Icon name="user" className="w-6 h-6 inline-block align-middle ml-2 text-brand-cyan" />
                                        אשף הפרופיל
                                    </h3>
                                    <p className="text-brand-slate mb-6 leading-relaxed">
                                        ענו על 3 שאלות פשוטות, והאשף ינסח עבורכם הצעה לפסקת פרופיל אישית ומושכת.
                                    </p>
                                    <div className="space-y-6">
                                        {profileQuestions.map(q => (
                                            <div key={q.id}>
                                                <label className="block text-md font-semibold text-brand-dark/90 mb-2">{q.text}</label>
                                                <textarea
                                                    onChange={(e) => setProfileAnswers(prev => ({...prev, [q.id]: e.target.value}))}
                                                    placeholder="כתבו בחופשיות, היועץ כבר יסדר את זה..."
                                                    className="w-full h-28 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition bg-white shadow-sm resize-y"
                                                    value={profileAnswers?.[q.id] || ''}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={handleGenerateProfileAnalysis} disabled={isProfileLoading} className="mt-6 btn-dark w-full">
                                        {isProfileLoading ? 'מנסח את הפרופיל...' : 'הפק הצעה לפרופיל'}
                                    </button>
                                    <AnimatePresence>
                                        {profileSuggestion && (
                                            <motion.div
                                                key="profile-result"
                                                variants={resultBoxVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="mt-6 p-6 bg-white/80 rounded-lg border border-slate-200 shadow-inner-sm text-right leading-relaxed"
                                            >
                                                {renderFormattedText(profileSuggestion)}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                            {activeTab === 'dateIdeas' && (
                                <motion.div key="date-ideas-tab-content" initial="hidden" animate="visible" exit="hidden" variants={contentVariants}>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">
                                        <Icon name="heart" className="w-6 h-6 inline-block align-middle ml-2 text-brand-cyan" />
                                        רעיונות לפגישה
                                    </h3>
                                    <p className="text-brand-slate mb-6 leading-relaxed">
                                        בחרו את התנאים, והיועץ החכם יציע לכם 3 רעיונות מקוריים לפגישה ראשונה.
                                    </p>

                                    {/* קלט אזור + עיר חופשית */}
                                    <div className="mb-3">
                                        <label htmlFor="dateRegion" className="block text-md font-semibold text-brand-dark/90 mb-2">אזור:</label>
                                        <select id="dateRegion" value={dateRegion} onChange={(e) => setDateRegion(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white shadow-sm">
                                            <option>מרכז</option>
                                            <option>ירושלים</option>
                                            <option>צפון</option>
                                            <option>דרום</option>
                                            <option value="אחר">אחר (הכנס עיר למטה)</option>
                                        </select>
                                    </div>
                                    {dateRegion === 'אחר' && (
                                        <div className="mb-5">
                                            <label htmlFor="dateCityFreeText" className="block text-md font-semibold text-brand-dark/90 mb-2">עיר ספציפית:</label>
                                            <input
                                                id="dateCityFreeText"
                                                type="text"
                                                onChange={(e) => setDateCityFreeText(e.target.value)}
                                                placeholder="הכנס עיר (לדוגמה: בני ברק, מודיעין עילית)"
                                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition bg-white shadow-sm"
                                                value={dateCityFreeText}
                                            />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                                        <div className="flex flex-col">
                                            <label htmlFor="dateBudget" className="block text-md font-semibold text-brand-dark/90 mb-2">תקציב:</label>
                                            <select id="dateBudget" value={dateBudget} onChange={(e) => setDateBudget(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white shadow-sm">
                                                <option>סמלי</option>
                                                <option>סביר</option>
                                                <option>להשקיע</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="dateAtmosphere" className="block text-md font-semibold text-brand-dark/90 mb-2">אווירה רצויה:</label>
                                            <select id="dateAtmosphere" value={dateAtmosphere} onChange={(e) => setDateAtmosphere(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white shadow-sm">
                                                <option>שילוב של רגוע ופעיל</option>
                                                <option>רגוע ושקט</option>
                                                <option>פעיל ואנרגטי</option>
                                                <option>תרבותי</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* שדה קלט מלל חופשי קיים */}
                                    <div className="mb-6">
                                        <label htmlFor="dateFreeText" className="block text-md font-semibold text-brand-dark/90 mb-2">פרטים נוספים/מילות מפתח (אופציונלי):</label>
                                        <textarea
                                            id="dateFreeText"
                                            onChange={(e) => setDateFreeText(e.target.value)}
                                            placeholder="לדוגמה: אהבה לטיולים רגליים, מקומות עם היסטוריה, ארוחה קלה..."
                                            className="w-full h-24 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition bg-white shadow-sm resize-y"
                                            value={dateFreeText}
                                        />
                                    </div>

                                    <button onClick={handleGenerateDateIdeas} disabled={isDateLoading} className="mt-6 btn-dark w-full">
                                        {isDateLoading ? 'חושב על רעיונות...' : 'קבל הצעות לפגישה'}
                                    </button>
                                    <AnimatePresence>
                                        {dateIdeas && (
                                            <motion.div
                                                key="date-ideas-result"
                                                variants={resultBoxVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="mt-6 p-6 bg-white/80 rounded-lg border border-slate-200 shadow-inner-sm text-right leading-relaxed"
                                            >
                                                {renderFormattedText(dateIdeas)}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                            {activeTab === 'starters' && (
                                <motion.div key="starters-tab-content" initial="hidden" animate="visible" exit="hidden" variants={contentVariants}>
                                    <h3 className="text-2xl font-bold text-brand-dark mb-4">
                                        <Icon name="chat" className="w-6 h-6 inline-block align-middle ml-2 text-brand-cyan" />
                                        שובר הקרח
                                    </h3>
                                    <p className="text-brand-slate mb-6 leading-relaxed">
                                        תקועים על "היי, מה קורה?"? ספרו מהם תחומי העניין של הצד השני וקבלו רעיונות לפתיחת שיחה.
                                    </p>
                                    <input
                                        type="text"
                                        value={starterInterests}
                                        onChange={(e) => setStarterInterests(e.target.value)}
                                        placeholder="לדוגמה: טיולים בטבע, פוליטיקה, אפייה"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-cyan bg-white shadow-sm"
                                    />
                                    <button onClick={handleGenerateStarters} disabled={isStarterLoading} className="mt-6 btn-dark w-full">
                                        {isStarterLoading ? 'חושב על משפט...' : 'קבל רעיונות לפתיחה'}
                                    </button>
                                    <AnimatePresence>
                                        {conversationStarters && (
                                            <motion.div
                                                key="starters-result"
                                                variants={resultBoxVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="mt-6 p-6 bg-white/80 rounded-lg border border-slate-200 shadow-inner-sm text-right leading-relaxed"
                                            >
                                                {renderFormattedText(conversationStarters)}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};
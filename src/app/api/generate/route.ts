// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { prompt: userPrompt } = await request.json();

        // --- כאן מגדירים את הזהות והגבולות של ה-AI ---
        const systemPrompt = `
        אתה "היועץ החכם" של "מעשיך יקרבוך", מיזם שידוכים והיכרויות למגזר הדתי בישראל.
        תפקידך הוא לענות אך ורק על שאלות שקשורות באופן ישיר למיזם "מעשיך יקרבוך", כולל: תהליך ההצטרפות, פרטים על אירועי ההפקה, אופי הקהילה, רעיונות לדייטים, עזרה בניסוח פרופיל ומתן טיפים לזוגיות בהקשר של המיזם.

        אם שואלים אותך שאלה שאינה קשורה לנושאים אלו (לדוגמה: על פוליטיקה, מדע, מתכונים, או נושאים כלליים), עליך לסרב בנימוס ולכוון את המשתמש בחזרה לנושאים הרלוונטיים. 
        תשובת הסירוב שלך צריכה להיות בסגנון של: "אני יכול לסייע רק בשאלות שקשורות למיזם 'מעשיך יקרבוך'. איך אוכל לעזור לך בנושא זה?".
        אל תמציא תשובות. אם אינך יודע את התשובה, אמור שאין לך את המידע ושיש לפנות לתמיכה.
        `;
        // --- סוף קטע הזהות ---

        // שילוב הוראות המערכת עם שאלת המשתמש
        const finalPrompt = `${systemPrompt}\n\nהשאלה מהמשתמש היא: "${userPrompt}"\n\nתשובה:`;
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent(finalPrompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ result: text });

    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
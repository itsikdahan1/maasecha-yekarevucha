// src/app/api/bot/route.ts

import { NextResponse } from 'next/server';

// ===================================================================
// מנהל השיחה (Conversation Manager) - כאן נמצאת כל הלוגיקה
// ===================================================================

// הגדרת סוגי התגובות האפשריות
type BlasterResponse = {
  action: 'reply' | 'trigger_rule';
  message?: string;
  rule_to_trigger?: string;
  variables?: { [key: string]: any }; // אם נצטרך להעביר משתנים לכלל בבלאסטר
};

function getNextStep(lastResponse: string): BlasterResponse {
  // המוח הלוגי של הבוט
  // הוא מקבל את התשובה האחרונה ומחליט מה הפעולה הבאה

  switch (lastResponse) {
    case 'אני בחור':
    case 'אני בחורה':
      // אחרי בחירת מין, שלח את שאלת המגזר
      return {
        action: 'trigger_rule',
        rule_to_trigger: 'AskPrefSectorRule', // שם של כלל ייעודי ב-Blaster
      };

    case 'חרדי':
    case 'דתי לאומי':
    case 'מתחזק':
      // אחרי בחירת מגזר, שלח את שאלת תת-המגזר/סגנון
       return {
        action: 'trigger_rule',
        rule_to_trigger: 'AskPrefSubSectorRule',
      };
      
    // ... נוסיף כאן את כל שאר חוקי השיחה בהמשך ...

    default:
      // אם לא זיהינו את התשובה, נחזיר הודעת ברירת מחדל
      return {
        action: 'reply',
        message: 'לא הבנתי את תשובתך. נוכל לנסות שוב?',
      };
  }
}

// ===================================================================
// נקודת הקצה של ה-API
// ===================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Webhook received:", JSON.stringify(body, null, 2));

    // אנו מצפים לקבל sender_id ו-last_response
    // בעתיד, נוסיף כאן גם את אובייקט ה-JSON של העדפות המשתמש
    const { sender_id, last_response } = body;

    if (!sender_id || !last_response) {
      throw new Error("Missing sender_id or last_response in request body");
    }

    // קבל את הפעולה הבאה ממנהל השיחה
    const nextAction = getNextStep(last_response);

    // החזר את ההוראה ל-Make
    return NextResponse.json(nextAction, { status: 200 });

  } catch (error: any) {
    console.error("Error in Bot API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
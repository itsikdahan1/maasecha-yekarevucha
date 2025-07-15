// src/app/api/bot/route.ts

import { NextResponse } from 'next/server';

type BlasterResponse = {
  action: 'reply' | 'trigger_rule';
  message?: string;
  rule_to_trigger?: string;
  variables?: { [key: string]: any };
};

function getNextStep(lastResponse: string): BlasterResponse {
  switch (lastResponse) {
    case 'אני בחור':
    case 'אני בחורה':
      return {
        action: 'trigger_rule',
        rule_to_trigger: 'AskPrefSectorRule',
      };
    case 'חרדי':
    case 'דתי לאומי':
    case 'מתחזק':
        return {
        action: 'trigger_rule',
        rule_to_trigger: 'AskPrefSubSectorRule',
      };
    default:
      return {
        action: 'reply',
        message: 'לא הבנתי את תשובתך. נוכל לנסות שוב?',
      };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Webhook received:", JSON.stringify(body, null, 2));

    const { sender_id, last_response } = body;
    if (!sender_id || !last_response) {
      throw new Error("Missing sender_id or last_response in request body");
    }

    const nextAction = getNextStep(last_response); // קריאה לפונקציית הלוגיקה
    return NextResponse.json(nextAction, { status: 200 }); // <<<--- כאן מחזירים את אובייקט ה-action
  } catch (error: any) {
    console.error("Error in Bot API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// src/app/api/bot/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // נדפיס את מה שקיבלנו כדי שנוכל לראות את זה בלוגים
    console.log("Webhook received:", JSON.stringify(body, null, 2));

    const { sender_id, last_response } = body;

    // כאן תבוא כל הלוגיקה העתידית
    // כרגע, אנחנו רק מחזירים תגובה פשוטה כדי לבדוק שהחיבור עובד
    const responsePayload = {
      message: `המוח קיבל את תשובתך: "${last_response}" מהמספר: ${sender_id}. בקרוב נטפל בה.`,
    };

    return NextResponse.json(responsePayload, { status: 200 });

  } catch (error: any) {
    console.error("Error in Bot API:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
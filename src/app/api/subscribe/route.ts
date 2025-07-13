// src/app/api/subscribe/route.ts

import { NextResponse } from 'next/server';

// משתנה הסביבה עבור המפתח של MailerLite
const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;

export async function POST(request: Request) {
  // בדיקה ראשונית אם המפתח הוגדר בכלל
  if (!MAILERLITE_API_KEY) {
    console.error('MailerLite API key is not configured.');
    return NextResponse.json({ error: 'שגיאה בתצורת המערכת.' }, { status: 500 });
  }

  try {
    const { email, listId } = await request.json();

    if (!email || !listId) {
      return NextResponse.json({ error: 'כתובת מייל ומזהה רשימה נדרשים.' }, { status: 400 });
    }

    // כתובת ה-API החדשה של MailerLite
    const mailerliteUrl = 'https://connect.mailerlite.com/api/subscribers';

    // מבנה הנתונים ש-MailerLite מצפה לקבל
    const subscriberData = {
      email,
      groups: [listId], // listId הוא למעשה ה-Group ID ב-MailerLite
      status: 'active',
    };

    const response = await fetch(mailerliteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // שיטת האימות של MailerLite היא באמצעות Bearer Token
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify(subscriberData),
    });

    const data = await response.json();

    // בדיקה אם הבקשה הצליחה (סטטוס 200 או 201)
    if (!response.ok) {
      // טיפול בשגיאות נפוצות של MailerLite
      console.error('MailerLite API error:', data);
      const errorMessage = data?.error?.message || 'שגיאה בהרשמה לרשימת התפוצה.';
      throw new Error(errorMessage);
    }

    return NextResponse.json({ message: 'ההרשמה בוצעה בהצלחה!' });

  } catch (error: any) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ error: error.message || 'אירעה שגיאה פנימית.' }, { status: 500 });
  }
}
// src/app/api/subscribe/route.ts

import { NextResponse } from 'next/server';

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
// הגדרנו מזהה קבוע עבור קבוצת הניוזלטר שלך. שנה אותו אם יצרת קבוצה אחרת.
const NEWSLETTER_GROUP_ID = process.env.MAILERLITE_NEWSLETTER_GROUP_ID || 'YOUR_NEWSLETTER_GROUP_ID_HERE'; 

export async function POST(request: Request) {
  if (!MAILERLITE_API_KEY) {
    console.error('MailerLite API key is not configured.');
    return NextResponse.json({ error: 'שגיאה בתצורת המערכת.' }, { status: 500 });
  }

  try {
    const { email, listId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'כתובת מייל נדרשת.' }, { status: 400 });
    }

    // קביעת קבוצת היעד ב-MailerLite
    // אם הגיע listId ספציפי (כמו מה-LeadMagnet), נשתמש בו. אחרת, נשתמש בקבוצת הניוזלטר.
    const targetGroupId = listId === 'newsletter' ? NEWSLETTER_GROUP_ID : listId;

    if (!targetGroupId || targetGroupId === 'YOUR_NEWSLETTER_GROUP_ID_HERE') {
        console.error('MailerLite Group ID is not configured.');
        return NextResponse.json({ error: 'שגיאה בתצורת מערכת הדיוור.' }, { status: 500 });
    }

    const mailerliteUrl = 'https://connect.mailerlite.com/api/subscribers';

    const subscriberData = {
      email,
      groups: [targetGroupId],
      status: 'active',
    };

    const response = await fetch(mailerliteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify(subscriberData),
    });

    const data = await response.json();

    if (!response.ok && data?.error?.message !== "The subscriber with this email already exists.") {
      console.error('MailerLite API error:', data);
      throw new Error(data?.error?.message || 'שגיאה בהרשמה לרשימת התפוצה.');
    }
    
    // אם המשתמש כבר קיים, אנחנו רואים בזה הצלחה.
    return NextResponse.json({ message: 'ההרשמה בוצעה בהצלחה!' });

  } catch (error: any) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ error: error.message || 'אירעה שגיאה פנימית.' }, { status: 500 });
  }
}
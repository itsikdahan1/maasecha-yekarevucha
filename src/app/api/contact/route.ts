// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // כאן תשים את לוגיקת שליחת המייל עם שירות כמו Resend או SendGrid
    console.log('--- פנייה חדשה התקבלה ---');
    console.log('שם:', name);
    console.log('מייל:', email);
    console.log('הודעה:', message);
    console.log('-------------------------');

    return NextResponse.json({ message: 'ההודעה נשלחה בהצלחה, נחזור אליכם בהקדם!' }, { status: 200 });

  } catch (error) {
    console.error('שגיאה בשליחת הודעה:', error);
    return NextResponse.json({ message: 'אירעה שגיאה בשליחת ההודעה.' }, { status: 500 });
  }
}

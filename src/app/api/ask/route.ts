// src/app/api/ask/route.ts
import { NextResponse } from 'next/server';

// כאן תוכל להשתמש בשירות שליחת מיילים כמו Resend, SendGrid, או Nodemailer
// לצורך הדוגמה, אנחנו נדמה את שליחת המייל ונחזיר תשובה מוצלחת.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, question } = body;

    // --- כאן תשים את לוגיקת שליחת המייל ---
    // דוגמה (בפועל תשתמש ב-SDK של שירות המיילים שלך):
    console.log('--- שאלה חדשה התקבלה ---');
    console.log('שם:', name);
    console.log('מייל:', email);
    console.log('שאלה:', question);
    console.log('--------------------------');
    // -----------------------------------------

    // בדוגמה האמיתית, אחרי שהמייל נשלח בהצלחה, תחזיר תשובה.
    return NextResponse.json({ message: 'השאלה נשלחה בהצלחה!' }, { status: 200 });

  } catch (error) {
    console.error('שגיאה בשליחת השאלה:', error);
    return NextResponse.json({ message: 'אירעה שגיאה בשליחת השאלה.' }, { status: 500 });
  }
}

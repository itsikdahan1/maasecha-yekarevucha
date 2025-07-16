import { NextResponse } from 'next/server';

// הגדרת השאלות כמבני נתונים. זה מאפשר ניהול קל וקוד נקי.
const QUESTIONS = {
  ask_pref_sector: {
    type: 'list',
    body: 'באיזה מגזר תרצה/י שנחפש לך?',
    button_text: 'בחירה',
    sections: [
      {
        title: 'מגזרים',
        rows: [
          { id: 'sector_charedi', title: 'חרדי' },
          { id: 'sector_dati', title: 'דתי לאומי' },
          { id: 'sector_masorti', title: 'מסורתי' },
        ],
      },
    ],
  },
  ask_pref_age_range: {
    type: 'list',
    body: 'מה טווח הגילאים המועדף לחיפוש?',
    button_text: 'בחירת גיל',
    sections: [
      {
        title: 'גילאים',
        rows: [
          { id: 'age_18-22', title: '18-22' },
          { id: 'age_23-27', title: '23-27' },
          { id: 'age_28-32', title: '28-32' },
          { id: 'age_33-37', title: '33-37' },
          { id: 'age_38+', title: '38+' },
        ],
      },
    ],
  },
  value_promise: {
    type: 'text',
    body: 'תודה! על בסיס העדפותיך, מצאתי עבורך 17 התאמות פוטנציאליות במאגר שלנו. כדי שנוכל לבנות לך פרופיל מנצח ולהתחיל להציג לך אותן, נצטרך כעת להכיר אותך קצת יותר לעומק. מוכנ/ה להמשיך?',
  }
};

// הפונקציה המרכזית שמנהלת את לוגיקת השיחה
function getNextStep(lastResponse: string, currentState: any) {
  const { step, preferences } = currentState;

  switch (step) {
    // שלב 1: המשתמש בחר "אני בחור/בחורה"
    case 'start_conversation':
      const userGender = lastResponse === 'אני בחור' ? 'גבר' : 'אישה';
      return {
        next_step: 'awaiting_pref_sector',
        new_preferences: { ...preferences, user_gender: userGender },
        reply: QUESTIONS.ask_pref_sector,
      };

    // שלב 2: המשתמש בחר מגזר
    case 'awaiting_pref_sector':
      return {
        next_step: 'awaiting_pref_age_range',
        new_preferences: { ...preferences, pref_sector: lastResponse },
        reply: QUESTIONS.ask_pref_age_range,
      };

    // שלב 3: המשתמש בחר טווח גילאים - סוף שלב איסוף הליבה
    case 'awaiting_pref_age_range':
      return {
        next_step: 'core_data_collected', // שלב הבטחת הערך
        new_preferences: { ...preferences, pref_age_range: lastResponse },
        reply: QUESTIONS.value_promise,
      };

    default:
      // במקרה של שלב לא ידוע, חוזרים להתחלה (ניתן לשפר בעתיד)
      return {
        next_step: 'start_conversation',
        new_preferences: {},
        reply: { type: 'text', body: 'אופס, משהו השתבש. נתחיל מההתחלה.'}
      };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received data from Make:', JSON.stringify(body, null, 2));

    // נתונים שה-API מצפה לקבל מ-Make
    const lastResponse = body.last_response || 'אני בחור'; // ערך ברירת מחדל לבדיקות
    const currentState = {
      step: body.conversation_state || 'start_conversation',
      preferences: body.user_preferences || {}
    };

    const nextStepData = getNextStep(lastResponse, currentState);
    
    // ה-API מחזיר ל-Make את ההוראות המדויקות
    const responsePayload = {
      action: 'reply', // הוראה ל-Make לשלוח תגובה
      conversation_state: nextStepData.next_step,
      user_preferences: nextStepData.new_preferences,
      reply_data: nextStepData.reply,
    };
    
    console.log('Sending response to Make:', JSON.stringify(responsePayload, null, 2));
    return NextResponse.json(responsePayload);

  } catch (error) {
    console.error('Error in Vercel API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
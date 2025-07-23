// app/api/bot/index.ts (for App Router)
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
export const dynamic = 'force-dynamic';

// --- Configuration ---
// וודא/י שה-ID של גיליון ה-Google Sheets שלך מוגדר כאן
const SPREADSHEET_ID = '1Q6tWAE8-lNXu-qQrQNCUg4nHLUkOEhTxmNGbXtRMYBI'; // <--- !!! החלף/י ב-ID של הגיליון שלך !!!

// וודא/י שמשתני הסביבה מוגדרים ב-Vercel
// GOOGLE_SERVICE_ACCOUNT_EMAIL: המייל של חשבון השירות שלך
// GOOGLE_PRIVATE_KEY: המפתח הפרטי של חשבון השירות שלך (זכור/י להחליף את שבירות השורה)
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null;

// --- Google Sheets API Authentication ---
// Add a check to ensure required environment variables are present
if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  console.error("Missing Google Sheets API credentials in environment variables.");
  // In a real application, you might want to throw an error or handle this more gracefully.
  // Forcing type assertion for deployment context, as we expect these to be set in Vercel.
}

const auth = new google.auth.JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
  key: GOOGLE_PRIVATE_KEY as string,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// --- Sheet Names ---
const USERS_SHEET_NAME = "Users";
const API_TRIGGER_SHEET_NAME = "API_Trigger";
const ANALYTICS_LOG_SHEET_NAME = "Analytics_Log"; // For future analytics logging

// --- Type Definitions for Conversation Logic (Comprehensive) ---
type Button = { text: string; value: string };
type ListRow = { id: string; title: string };
type ListSection = { title: string; rows: ListRow[] };

type QuestionType = 'buttons' | 'list' | 'text' | 'text_input';

type QuestionConfig = {
  type: QuestionType;
  body: string;
  buttons?: Button[]; // Optional for text/text_input
  button_text?: string; // For list type
  sections?: ListSection[]; // For list type
};

// Represents the user's preferences stored in Google Sheets (matching column names)
type UserPreferences = {
  Contact?: string;
  UserType?: string;
  Name?: string;
  UserGender?: string;
  PrefSector?: string;
  PrefSubSector?: string;
  PrefStyle?: string;
  PrefChassidus?: string;
  PrefAgeRange?: string;
  PrefStatus?: string;
  PrefMinHeight?: string;
  PrefMaxHeight?: string;
  PrefHeadCovering?: string;
  PrefWorkStudy?: string;
  PrefEda?: string;
  PrefLocation?: string;
  PrefSmoking?: string;
  ApprovalStatus?: string;
  AssignedUniqueId?: string;
  UserProfileId?: string;
  DateRegistered?: string;
  DateApproved?: string;
  Notes?: string;
  Message?: string;
  Date?: string;
  Time?: string;
  Sent?: string;
  Current_Stage?: string;
  Previous_Preferences_JSON?: string;
  LastFeedback?: string;
  Last_Interaction?: string; // Added from Google Sheet Headers
  Last_Response?: string;    // Added from Google Sheet Headers
  // Add other user sheet headers here as needed
  [key: string]: any; // Allow indexing with string for dynamic access
};


// --- Define Questions and Responses ---
const QUESTIONS: { [key: string]: QuestionConfig } = {
  main_menu: {
    type: 'buttons',
    body: 'ברוך הבא למיזם מעשיך יקרבוך! מה תרצה לעשות?',
    buttons: [
      { text: '💠 כניסה למיזם והצטרפות 💠', value: 'join_project' },
      { text: '👤 אזור אישי', value: 'personal_area' },
      { text: '❓ עזרה', value: 'help' },
      { text: '📝 השארת פניה', value: 'contact_us' },
    ],
  },
  select_role: {
    type: 'buttons',
    body: 'מעולה! בחר את תפקידך:',
    buttons: [
      { text: 'אני שדכן/נית', value: 'matchmaker' },
      { text: 'אני מחפש/ת שידוך 🧑🏻‍❤️‍🧑🏼', value: 'seeker' },
    ],
  },
  seeker_intro: {
    type: 'text',
    body: `שלום לך מחפש/ת יקר/ה!\n\nהמיזם שלנו נועד לסייע לך למצוא את זיווגך בצורה הולמת ודיסקרטית, בראש ובראשונה על בסיס נתונים. הבוט אינו מחליף שדכן אנושי, אלא משמש כלי סינון חכם המסייע למצוא התאמות פוטנציאליות במהירות וביעילות.\n\nאנו מציעים לך תהליך מובנה שבו תספק/י לנו פרטים אודותייך ואודות בן/בת הזוג המבוקש/ת. המערכת תבצע סינון ראשוני ותציג לך הצעות רלוונטיות, כאשר כל ההתקשרות הראשונית נעשית דרך הבוט, לשמירה על פרטיותך ונוחותך.\n\nבסיום התהליך, תוכל/י לקבל פרטי יצירת קשר עם שדכנים/יות שיכולים/ות לסייע לך באופן אישי, או להמשיך לקבל הצעות ישירות דרך הבוט.\n\nאנו מקפידים על צניעות ודיסקרטיות מרבית בכל שלבי התהליך. כל המידע נשמר באופן מאובטח ומשמש אך ורק למטרת השידוכים.\n\nהאם ברצונך להתחיל בתהליך ההרשמה ואיסוף ההעדפות?\nאנא השב/י *כן* כדי להתחיל.`,
  },
  ask_agreement: {
    type: 'text_input', // Expecting "כן" as text input
    body: 'האם ברצונך להתחיל בתהליך ההרשמה ואיסוף ההעדפות?\nאנא השב/י *כן* כדי להתחיל.',
  },
  ask_gender: {
    type: 'buttons',
    body: 'מצוין! נתחיל. אנא בחר/י את מינך:',
    buttons: [
      { text: 'אני בחור', value: 'male' },
      { text: 'אני בחורה', value: 'female' },
    ],
  },
  gender_confirmation_male: {
    type: 'text_input',
    body: `גם אתה רוצה למצוא את אשת חילך? אנחנו פה כדי לעזור לך!
    כדי שנוכל להתחיל בתהליך התאמת השידוך המושלם עבורך,
    עלינו להבין קצת יותר את הצרכים וההעדפות שלך.
    השאלות הקרובות יסייעו לנו לאסוף את המידע הנדרש
    כדי שנוכל לסנן ולהציג לך הצעות רלוונטיות.
    כל המידע ישמש אך ורק למטרת השידוכים ויישמר בדיסקרטיות מלאה.
    האם אתה מאשר/ת להתחיל? אנא השב/י *אישור*.`,
  },
  gender_confirmation_female: {
    type: 'text_input',
    body: `גם את רוצה למצוא את בחיר ליבך? אנחנו פה כדי לעזור לך!
    כדי שנוכל להתחיל בתהליך התאמת השידוך המושלם עבורך,
    עלינו להבין קצת יותר את הצרכים וההעדפות שלך.
    השאלות הקרובות יסייעו לנו לאסוף את המידע הנדרש
    כדי שנוכל לסנן ולהציג לך הצעות רלוונטיות.
    כל המידע ישמש אך ורק למטרת השידוכים ויישמר בדיסקרטיות מלאה.
    האם את מאשרת להתחיל? אנא השיבי *אישור*.`,
  },
  ask_pref_sector: {
    type: 'buttons',
    body: 'מצוין! איזה מגזר תרצה/י לחפש?', // Dynamic text will be added by Vercel API
    buttons: [
      { text: 'חרדית', value: 'חרדי' },
      { text: 'דתיה לאומית', value: 'דתי לאומי' },
      { text: 'מתחזקת', value: 'מתחזק' },
      { text: 'כל הזרמים', value: 'כללי' },
    ],
  },
  // ... add more questions as per your Blueprint
  error_message: {
    type: 'text',
    body: 'אירעה שגיאה. אנא הקלד/י "התחל" כדי להתחיל מחדש, או "עזרה" לתמיכה.',
  },
  invalid_input: {
    type: 'text',
    body: 'לא הבנתי את תשובתך. אנא בחר/י אחת מהאפשרויות או הקלד/י "חזור" כדי לחזור לשלב הקודם.',
  },
};

// For "חזור" functionality
const GO_BACK_BUTTON: Button = { text: 'חזור לשלב הקודם 🔙', value: 'action_back' };

// --- Helper Functions ---
// Function to get headers from a sheet
async function getSheetHeaders(sheetName: string): Promise<string[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!1:1`, // Get only the first row (headers)
  });
  return response.data.values ? response.data.values[0] as string[] : [];
}

// Function to find a user row by contact and return data as an object
async function findUserByContact(contact: string, headers: string[]): Promise<{ userData: UserPreferences | null, rowIndex: number }> {
  const usersResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${USERS_SHEET_NAME}!A:Z`, // Fetch all relevant columns
  });
  const usersRows = usersResponse.data.values || [];
  
  // Find the user row (skip header row)
  // userRowIndex is 0-indexed for array, +1 for Sheets 1-indexed row number
  const userRowIndex = usersRows.findIndex((row, index) => index > 0 && row[0] === contact);

  if (userRowIndex !== -1) {
    const userDataArray = usersRows[userRowIndex];
    const userDataObject: UserPreferences = {};
    headers.forEach((header, index) => {
      // Ensure we only assign if header and value exist
      if (header && userDataArray[index] !== undefined) {
        userDataObject[header] = userDataArray[index];
      }
    });
    return { userData: userDataObject, rowIndex: userRowIndex };
  }
  return { userData: null, rowIndex: -1 };
}

// Function to update a user row in Google Sheets
async function updateUserData(rowIndex: number, updatedData: UserPreferences, headers: string[]) {
  const values = headers.map(header => updatedData[header] !== undefined ? updatedData[header] : '');
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${USERS_SHEET_NAME}!A${rowIndex + 1}`, // +1 because Sheets is 1-indexed
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values]
    },
  });
}

// Function to append a new user row to Google Sheets
async function appendNewUser(newUserData: UserPreferences, headers: string[]) {
  const values = headers.map(header => newUserData[header] !== undefined ? newUserData[header] : '');
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${USERS_SHEET_NAME}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [values]
    },
  });
}

// Function to write a trigger to API_Trigger sheet for Blaster
async function writeApiTrigger(senderId: string, ruleToTrigger: string, actionType: string, payload: { [key: string]: any }) {
  const apiTriggerHeaders = ["Contact", "Message", "Action", "Ready_To_Send", "Sent_Status", "#MESSAGE_TEXT", "#BUTTON_1_TEXT", "#BUTTON_1_VALUE", "#BUTTON_2_TEXT", "#BUTTON_2_VALUE", "#IMAGE_URL", "#PROFILE1_ID", "#PROFILE1_NICKNAME", "#PROFILE1_DESCRIPTION", "#PROFILE1_PICTURE", "#MATCH_REASON", "#CURRENT_MATCH_INDEX", "#BUTTON_3_TEXT", "#BUTTON_3_VALUE", "#BUTTON_4_TEXT", "#BUTTON_4_VALUE"];
  const triggerValues = new Array(apiTriggerHeaders.length).fill('');

  triggerValues[0] = senderId;
  triggerValues[1] = ruleToTrigger;
  triggerValues[2] = actionType;
  triggerValues[3] = "TRUE";
  triggerValues[4] = "PENDING";

  // Populate payload values into the correct # columns
  for (const key in payload) {
    const headerIndex = apiTriggerHeaders.indexOf(`#${key}`);
    if (headerIndex !== -1) {
      triggerValues[headerIndex] = payload[key];
    }
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${API_TRIGGER_SHEET_NAME}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [triggerValues]
    },
  });
}

// --- Main Conversation Logic (State Machine) ---
// This function determines the next step based on current state and user response
function getNextStepLogic(lastResponse: string, currentUserState: UserPreferences, userPreferences: UserPreferences) {
  let nextStage: string = currentUserState.Current_Stage || 'START';
  let replyData: QuestionConfig = QUESTIONS.invalid_input; // Default to invalid input
  let updatedPreferences: UserPreferences = { ...userPreferences }; // Create a mutable copy

  // Handle "חזור" (Go Back) action
  if (lastResponse === GO_BACK_BUTTON.value) {
    // This is a simplified "go back". In a real app, you'd manage a stack of stages (e.g., in userPreferences.StageHistory).
    // For this skeleton, we hardcode previous stages.
    switch (currentUserState.Current_Stage) {
        case 'MAIN_MENU': return { nextStage: 'START', replyData: QUESTIONS.main_menu, updatedPreferences };
        case 'SELECT_ROLE': return { nextStage: 'MAIN_MENU', replyData: QUESTIONS.main_menu, updatedPreferences };
        case 'WAITING_FOR_AGREEMENT': return { nextStage: 'SELECT_ROLE', replyData: QUESTIONS.select_role, updatedPreferences };
        case 'ASK_GENDER': return { nextStage: 'WAITING_FOR_AGREEMENT', replyData: QUESTIONS.ask_agreement, updatedPreferences };
        case 'WAITING_FOR_GENDER_CONFIRMATION': return { nextStage: 'ASK_GENDER', replyData: QUESTIONS.ask_gender, updatedPreferences };
        case 'ASK_SECTOR': return { nextStage: 'WAITING_FOR_GENDER_CONFIRMATION', replyData: (userPreferences.UserGender === 'גבר' ? QUESTIONS.gender_confirmation_male : QUESTIONS.gender_confirmation_female), updatedPreferences };
        // Add more cases for going back from other stages according to your Blueprint
        default: return { nextStage: 'MAIN_MENU', replyData: QUESTIONS.main_menu, updatedPreferences }; // Fallback
    }
  }

  switch (currentUserState.Current_Stage) {
    case 'START':
      nextStage = 'MAIN_MENU';
      replyData = QUESTIONS.main_menu;
      break;

    case 'MAIN_MENU':
      if (lastResponse === 'join_project') {
        nextStage = 'SELECT_ROLE';
        replyData = QUESTIONS.select_role;
      } else if (lastResponse === 'personal_area') {
        replyData = { type: 'text', body: 'אזור אישי בבנייה. אנא חזור/י מאוחר יותר.' };
        nextStage = 'MAIN_MENU'; // Stay in main menu
      } else if (lastResponse === 'help') {
        replyData = { type: 'text', body: 'לשאלות נפוצות, בקר/י באתר שלנו. לתמיכה אישית, השאר/י פניה.' };
        nextStage = 'MAIN_MENU';
      } else if (lastResponse === 'contact_us') {
        replyData = { type: 'text', body: 'אנא השאר/י את שמך ומספר הטלפון שלך ונחזור אליך.' };
        nextStage = 'MAIN_MENU';
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'MAIN_MENU';
      }
      break;

    case 'SELECT_ROLE':
      if (lastResponse === 'seeker') {
        nextStage = 'WAITING_FOR_AGREEMENT';
        replyData = QUESTIONS.seeker_intro;
        updatedPreferences.UserType = 'Seeker';
      } else if (lastResponse === 'matchmaker') {
        replyData = { type: 'text', body: 'מודול השדכנים בבנייה. אנא חזור/י מאוחר יותר.' };
        nextStage = 'MAIN_MENU';
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'SELECT_ROLE';
      }
      break;

    case 'WAITING_FOR_AGREEMENT':
      if (lastResponse.includes('כן')) {
        nextStage = 'ASK_GENDER';
        replyData = QUESTIONS.ask_gender;
      } else {
        replyData = { type: 'text', body: 'כדי להתחיל את התהליך עליך לאשר ב"כן".' };
        nextStage = 'WAITING_FOR_AGREEMENT';
      }
      break;

    case 'ASK_GENDER':
      if (lastResponse === 'male') {
        nextStage = 'WAITING_FOR_GENDER_CONFIRMATION';
        replyData = QUESTIONS.gender_confirmation_male;
        updatedPreferences.UserGender = 'גבר';
      } else if (lastResponse === 'female') {
        nextStage = 'WAITING_FOR_GENDER_CONFIRMATION';
        replyData = QUESTIONS.gender_confirmation_female;
        updatedPreferences.UserGender = 'אישה';
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'ASK_GENDER';
      }
      break;

    case 'WAITING_FOR_GENDER_CONFIRMATION':
      if (lastResponse.includes('אישור')) {
        nextStage = 'ASK_SECTOR';
        (QUESTIONS.ask_pref_sector as any).body = `מצוין! איזה מגזר ${updatedPreferences.UserGender === 'גבר' ? 'אתה מחפש' : 'את מחפשת'}?`;
        replyData = QUESTIONS.ask_pref_sector;
      } else {
        replyData = { type: 'text', body: 'אנא אשר/י ב"אישור" כדי להמשיך.' };
        nextStage = 'WAITING_FOR_GENDER_CONFIRMATION';
      }
      break;

    case 'ASK_SECTOR':
      if (['חרדי', 'דתי לאומי', 'מתחזק', 'מסורתי', 'כללי'].includes(lastResponse)) {
        updatedPreferences.PrefSector = lastResponse;
        replyData = { type: 'text', body: `קיבלתי: ${lastResponse}. נמשיך לשאלת תת-מגזר/גיל.` };
        nextStage = 'REGISTRATION_COMPLETE'; // Placeholder for now
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'ASK_SECTOR';
      }
      break;

    case 'REGISTRATION_COMPLETE':
        replyData = { type: 'text', body: `תודה לך, ${updatedPreferences.Name || 'יקר/ה'}! השלמת את תהליך ההרשמה. אנו בודקים את הנתונים וניצור קשר בהקדם עם הצעות ראשונות.` };
        nextStage = 'IDLE'; // User is registered and waiting for approval
        break;

    default:
      replyData = QUESTIONS.error_message;
      nextStage = 'START';
      break;
  }

  return { nextStage, replyData, updatedPreferences };
}

// --- Main API Handler ---
export async function POST(request: Request) {
  console.log('API endpoint was hit!'); // <--- הוסף/י את השורה הזו
  // Ensure authentication (Secret Key)
  const authHeader = request.headers.get('Authorization');
  const SECRET_KEY = process.env.MAKE_SECRET_KEY; // Define this in Vercel Environment Variables

  if (!authHeader || !SECRET_KEY || authHeader !== `Bearer ${SECRET_KEY}`) {
    console.warn('Unauthorized access attempt to API.');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('Received data from Make:', JSON.stringify(body, null, 2));

    const senderId: string = body.sender_id;
    const lastResponse: string = body.last_response;

    if (!senderId || !lastResponse) {
      console.error('Missing sender_id or last_response in request body.');
      return NextResponse.json({ message: 'Missing sender_id or last_response' }, { status: 400 });
    }

    // 1. Get User Headers from Google Sheets
    const usersHeaders: string[] = await getSheetHeaders(USERS_SHEET_NAME);
    if (usersHeaders.length === 0) {
      console.error(`Headers not found for ${USERS_SHEET_NAME}. Sheet might be empty or misconfigured.`);
      return NextResponse.json({ message: 'Sheet headers not found' }, { status: 500 });
    }

    // 2. Load User Data from Google Sheets
    let { userData: currentUserData, rowIndex: userRowIndex } = await findUserByContact(senderId, usersHeaders);
    let userPreferences: UserPreferences = {};
    let currentStage: string = 'START';

    if (currentUserData) {
      currentStage = currentUserData.Current_Stage || 'START';
      usersHeaders.forEach(header => {
        if (header.startsWith('Pref') || header === 'UserGender' || header === 'UserType' || header === 'Name' || header === 'Current_Stage' || header === 'Previous_Preferences_JSON' || header === 'LastFeedback' || header === 'Last_Interaction' || header === 'Last_Response') {
          if (currentUserData && currentUserData[header] !== undefined) {
            userPreferences[header] = currentUserData[header];
          }
        }
      });
    } else {
      // New user: Initialize default data
      currentUserData = {
        Contact: senderId,
        UserType: '', Name: '', UserGender: '', PrefSector: '', PrefSubSector: '',
        PrefStyle: '', PrefChassidus: '', PrefAgeRange: '', PrefStatus: '',
        PrefMinHeight: '', PrefMaxHeight: '', PrefHeadCovering: '', PrefWorkStudy: '', PrefEda: '',
        PrefLocation: '', PrefSmoking: '', ApprovalStatus: 'New', AssignedUniqueId: '',
        UserProfileId: '', DateRegistered: new Date().toISOString(), DateApproved: '',
        Notes: '', Message: '', Date: '', Time: '', Sent: '',
        Current_Stage: 'START', Previous_Preferences_JSON: '', LastFeedback: '',
        Last_Interaction: '', Last_Response: ''
      };
      await appendNewUser(currentUserData, usersHeaders);
      const reFetchResult = await findUserByContact(senderId, usersHeaders);
      userRowIndex = reFetchResult.rowIndex;
    }

    // 3. Process Conversation Logic
    const { nextStage, replyData, updatedPreferences } = getNextStepLogic(lastResponse, currentUserData, userPreferences);

    // 4. Update User Data in Google Sheets
    currentUserData.Current_Stage = nextStage;
    currentUserData.Last_Interaction = new Date().toISOString();
    currentUserData.Last_Response = lastResponse;
    currentUserData.Previous_Preferences_JSON = JSON.stringify(userPreferences); // Store the state *before* this update

    // Update individual preference columns based on updatedPreferences
    for (const key in updatedPreferences) {
      if (usersHeaders.includes(key) && updatedPreferences[key] !== undefined) {
        currentUserData[key] = updatedPreferences[key];
      }
    }
    
    await updateUserData(userRowIndex, currentUserData, usersHeaders);

    // 5. Prepare Payload for Blaster (via API_Trigger)
    let ruleToTrigger: string = "DEFAULT_REPLY_RULE"; // A default rule in Blaster to handle replies
    let actionType: string = "trigger_rule"; // Default action

    const blasterPayload: { [key: string]: any } = {
      MESSAGE_TEXT: replyData.body,
    };

    if (replyData.type === 'buttons' && replyData.buttons) {
      replyData.buttons.forEach((button, index) => {
        if (index < 4) { // Blaster typically supports up to 4 buttons
          blasterPayload[`BUTTON_${index + 1}_TEXT`] = button.text;
          blasterPayload[`BUTTON_${index + 1}_VALUE`] = button.value;
        }
      });
      // Add "חזור" button if not already present and applicable
      if (!replyData.buttons.some(b => b.value === GO_BACK_BUTTON.value)) {
          if (replyData.buttons.length < 4) { // Add to an available slot
              blasterPayload[`BUTTON_${replyData.buttons.length + 1}_TEXT`] = GO_BACK_BUTTON.text;
              blasterPayload[`BUTTON_${replyData.buttons.length + 1}_VALUE`] = GO_BACK_BUTTON.value;
          }
      }
    } else if (replyData.type === 'list' && replyData.sections) {
        blasterPayload.MESSAGE_TEXT = `(LIST MESSAGE - NOT FULLY IMPLEMENTED YET) ${replyData.body}`;
        ruleToTrigger = "LIST_MESSAGE_RULE"; // Requires a specific Blaster rule
    } else if (replyData.type === 'text_input') {
        blasterPayload.MESSAGE_TEXT = replyData.body;
        // For text_input, always offer a "חזור" button if applicable
        blasterPayload.BUTTON_1_TEXT = GO_BACK_BUTTON.text;
        blasterPayload.BUTTON_1_VALUE = GO_BACK_BUTTON.value;
    }


    // 6. Write to Analytics Log (Future Enhancement)
    // await writeAnalyticsLog(senderId, 'ConversationStep', { stage: nextStage, response: lastResponse });

    // 7. Send Trigger to Blaster
    await writeApiTrigger(senderId, ruleToTrigger, actionType, blasterPayload);

    return NextResponse.json({ status: 'success', message: 'Processing complete, trigger sent to Blaster via Sheets' });

  } catch (error: any) { // Catch as any to access error.message and error.stack
    console.error('Error in Vercel API:', error);
    // Log error to Analytics_Log (future enhancement)
    // await writeAnalyticsLog(senderId, 'API_Error', { error: error.message, stack: error.stack, body: request.body });
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
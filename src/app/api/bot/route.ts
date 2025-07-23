// app/api/bot/route.ts (for App Router)
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// --- Configuration ---
// וודא/י שה-ID של גיליון ה-Google Sheets שלך מוגדר כאן
const SPREADSHEET_ID = '1Q6tWAE8-lNXu-qQrQNCUg4nHLUkOEhTxmNGbXtRMYBI'; // <--- !!! החלף/י ב-ID של הגיליון שלך !!!

// וודא/י שמשתני הסביבה מוגדרים ב-Vercel
// GOOGLE_SERVICE_ACCOUNT_EMAIL: המייל של חשבון השירות שלך
// GOOGLE_PRIVATE_KEY: המפתח הפרטי של חשבון השירות שלך (זכור/י להחליף את \\n ב-\n)
const GOOGLE_SERVICE_ACCOUNT_EMAIL = "maasecha-sheets-access-id@maasecha-project.iam.gserviceaccount.com"
const GOOGLE_PRIVATE_KEY = \\644f1395352ca6d4db33b40739397a847d6e879f...\\n...\\n

// --- Google Sheets API Authentication ---
const auth = new google.auth.JWT(
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth });

// --- Sheet Names ---
const USERS_SHEET_NAME = "Users";
const API_TRIGGER_SHEET_NAME = "API_Trigger";
const ANALYTICS_LOG_SHEET_NAME = "Analytics_Log"; // For future analytics logging

// --- Define Questions and Responses ---
// הגדרת השאלות כמבני נתונים. זה מאפשר ניהול קל וקוד נקי.
const QUESTIONS = {
  main_menu: {
    type: 'buttons', // Assuming a button message type
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
  // For "חזור" functionality
  go_back_button: { text: 'חזור לשלב הקודם 🔙', value: 'action_back' },
};

// --- Helper Functions ---
// Function to get headers from a sheet
async function getSheetHeaders(sheetName) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!1:1`, // Get only the first row (headers)
  });
  return response.data.values ? response.data.values[0] : [];
}

// Function to find a user row by contact and return data as an object
async function findUserByContact(contact, headers) {
  const usersResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${USERS_SHEET_NAME}!A:Z`, // Fetch all relevant columns
  });
  const usersRows = usersResponse.data.values || [];

  // Find the user row (skip header row)
  const userRowIndex = usersRows.findIndex((row, index) => index > 0 && row[0] === contact);

  if (userRowIndex !== -1) {
    const userDataArray = usersRows[userRowIndex];
    const userDataObject = {};
    headers.forEach((header, index) => {
      userDataObject[header] = userDataArray[index];
    });
    return { userData: userDataObject, rowIndex: userRowIndex };
  }
  return { userData: null, rowIndex: -1 };
}

// Function to update a user row in Google Sheets
async function updateUserData(rowIndex, updatedData, headers) {
  const values = headers.map(header => updatedData[header] !== undefined ? updatedData[header] : '');
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${USERS_SHEET_NAME}!A${rowIndex + 1}`, // +1 because Sheets is 1-indexed
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [values]
    },
  });
}

// Function to append a new user row to Google Sheets
async function appendNewUser(newUserData, headers) {
  const values = headers.map(header => newUserData[header] !== undefined ? newUserData[header] : '');
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${USERS_SHEET_NAME}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [values]
    },
  });
}

// Function to write a trigger to API_Trigger sheet for Blaster
async function writeApiTrigger(senderId, ruleToTrigger, actionType, payload) {
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
    resource: {
      values: [triggerValues]
    },
  });
}

// --- Main Conversation Logic (State Machine) ---
// This function determines the next step based on current state and user response
function getNextStepLogic(lastResponse, currentUserState, userPreferences) {
  let nextStage = currentUserState.Current_Stage;
  let replyData = QUESTIONS.invalid_input; // Default to invalid input
  let updatedPreferences = { ...userPreferences }; // Create a mutable copy

  // Handle "חזור" (Go Back) action
  if (lastResponse === QUESTIONS.go_back_button.value) {
    // This is a simplified "go back". In a real app, you'd manage a stack of stages.
    // For now, let's just go back to the previous logical step.
    // This requires knowing the previous stage, which we'll need to store.
    // For this skeleton, let's just go back to MAIN_MENU for simplicity if "back" is pressed early.
    // In full implementation, we'd use currentUserState.Previous_Stage if stored.
    switch (currentUserState.Current_Stage) {
        case 'MAIN_MENU': return { nextStage: 'START', replyData: QUESTIONS.main_menu, updatedPreferences };
        case 'SELECT_ROLE': return { nextStage: 'MAIN_MENU', replyData: QUESTIONS.main_menu, updatedPreferences };
        case 'WAITING_FOR_AGREEMENT': return { nextStage: 'SELECT_ROLE', replyData: QUESTIONS.select_role, updatedPreferences };
        case 'ASK_GENDER': return { nextStage: 'WAITING_FOR_AGREEMENT', replyData: QUESTIONS.ask_agreement, updatedPreferences };
        case 'WAITING_FOR_GENDER_CONFIRMATION': return { nextStage: 'ASK_GENDER', replyData: QUESTIONS.ask_gender, updatedPreferences };
        case 'ASK_SECTOR': return { nextStage: 'WAITING_FOR_GENDER_CONFIRMATION', replyData: (userPreferences.UserGender === 'גבר' ? QUESTIONS.gender_confirmation_male : QUESTIONS.gender_confirmation_female), updatedPreferences };
        // Add more cases for going back from other stages
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
        // Handle personal area logic
        replyData = { type: 'text', body: 'אזור אישי בבנייה. אנא חזור/י מאוחר יותר.' };
        nextStage = 'MAIN_MENU'; // Stay in main menu
      } else if (lastResponse === 'help') {
        // Handle help logic
        replyData = { type: 'text', body: 'לשאלות נפוצות, בקר/י באתר שלנו. לתמיכה אישית, השאר/י פניה.' };
        nextStage = 'MAIN_MENU'; // Stay in main menu
      } else if (lastResponse === 'contact_us') {
        // Handle contact us logic
        replyData = { type: 'text', body: 'אנא השאר/י את שמך ומספר הטלפון שלך ונחזור אליך.' };
        nextStage = 'MAIN_MENU'; // Stay in main menu
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'MAIN_MENU'; // Stay in main menu
      }
      break;

    case 'SELECT_ROLE':
      if (lastResponse === 'seeker') {
        nextStage = 'WAITING_FOR_AGREEMENT';
        replyData = QUESTIONS.seeker_intro;
        updatedPreferences.UserType = 'Seeker'; // Update UserType
      } else if (lastResponse === 'matchmaker') {
        replyData = { type: 'text', body: 'מודול השדכנים בבנייה. אנא חזור/י מאוחר יותר.' };
        nextStage = 'MAIN_MENU'; // Go back to main menu
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'SELECT_ROLE'; // Stay in current stage
      }
      break;

    case 'WAITING_FOR_AGREEMENT':
      if (lastResponse.includes('כן')) { // Case-insensitive check for "כן"
        nextStage = 'ASK_GENDER';
        replyData = QUESTIONS.ask_gender;
      } else {
        replyData = { type: 'text', body: 'כדי להתחיל את התהליך עליך לאשר ב"כן".' };
        nextStage = 'WAITING_FOR_AGREEMENT'; // Stay in current stage
      }
      break;

    case 'ASK_GENDER':
      if (lastResponse === 'male') {
        nextStage = 'WAITING_FOR_GENDER_CONFIRMATION';
        replyData = QUESTIONS.gender_confirmation_male;
        updatedPreferences.UserGender = 'גבר'; // Update UserGender
      } else if (lastResponse === 'female') {
        nextStage = 'WAITING_FOR_GENDER_CONFIRMATION';
        replyData = QUESTIONS.gender_confirmation_female;
        updatedPreferences.UserGender = 'אישה'; // Update UserGender
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'ASK_GENDER'; // Stay in current stage
      }
      break;

    case 'WAITING_FOR_GENDER_CONFIRMATION':
      if (lastResponse.includes('אישור')) { // Case-insensitive check for "אישור"
        nextStage = 'ASK_SECTOR';
        // Dynamically adjust message based on gender
        QUESTIONS.ask_pref_sector.body = `מצוין! איזה מגזר ${updatedPreferences.UserGender === 'גבר' ? 'אתה מחפש' : 'את מחפשת'}?`;
        replyData = QUESTIONS.ask_pref_sector;
      } else {
        replyData = { type: 'text', body: 'אנא אשר/י ב"אישור" כדי להמשיך.' };
        nextStage = 'WAITING_FOR_GENDER_CONFIRMATION'; // Stay in current stage
      }
      break;

    case 'ASK_SECTOR':
      // This is where you'd save PrefSector and move to SubSector or AgeRange
      // For now, just acknowledge and move to a placeholder
      if (['חרדי', 'דתי לאומי', 'מתחזק', 'מסורתי', 'כללי'].includes(lastResponse)) {
        updatedPreferences.PrefSector = lastResponse;
        // In a full implementation, this would branch to ASK_SUB_SECTOR_CHAREDI/DATI or directly to ASK_AGE
        replyData = { type: 'text', body: `קיבלתי: ${lastResponse}. נמשיך לשאלת תת-מגזר/גיל.` };
        nextStage = 'REGISTRATION_COMPLETE'; // Placeholder for now
      } else {
        replyData = QUESTIONS.invalid_input;
        nextStage = 'ASK_SECTOR';
      }
      break;

    // ... Add more cases for other stages (ASK_SUB_SECTOR, ASK_AGE, etc.)
    // Remember to update updatedPreferences for each relevant field

    case 'REGISTRATION_COMPLETE':
        replyData = { type: 'text', body: `תודה לך, ${updatedPreferences.Name || 'יקר/ה'}! השלמת את תהליך ההרשמה. אנו בודקים את הנתונים וניצור קשר בהקדם עם הצעות ראשונות.` };
        nextStage = 'IDLE'; // User is registered and waiting for approval
        break;

    default:
      // Fallback for unknown stages or errors
      replyData = QUESTIONS.error_message;
      nextStage = 'START'; // Reset to start
      break;
  }

  return { nextStage, replyData, updatedPreferences };
}

// --- Main API Handler ---
export async function POST(request: Request) {
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

    const senderId = body.sender_id;
    const lastResponse = body.last_response;

    if (!senderId || !lastResponse) {
      console.error('Missing sender_id or last_response in request body.');
      return NextResponse.json({ message: 'Missing sender_id or last_response' }, { status: 400 });
    }

    // 1. Get User Headers from Google Sheets
    const usersHeaders = await getSheetHeaders(USERS_SHEET_NAME);
    if (usersHeaders.length === 0) {
      console.error(`Headers not found for ${USERS_SHEET_NAME}. Sheet might be empty or misconfigured.`);
      return NextResponse.json({ message: 'Sheet headers not found' }, { status: 500 });
    }

    // 2. Load User Data from Google Sheets
    let { userData: currentUserData, rowIndex: userRowIndex } = await findUserByContact(senderId, usersHeaders);
    let userPreferences = {}; // This will hold the preferences from the sheet
    let currentStage = 'START'; // Default stage for new users

    if (currentUserData) {
      // Existing user: Load current stage and preferences from sheet columns
      currentStage = currentUserData.Current_Stage || 'START';
      // Map individual preference columns to a preferences object for logic
      usersHeaders.forEach(header => {
        if (header.startsWith('Pref') || header === 'UserGender' || header === 'UserType' || header === 'Name') {
          userPreferences[header] = currentUserData[header];
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
        Current_Stage: 'START', Previous_Preferences_JSON: '', LastFeedback: ''
      };
      // Append new user row to Google Sheets
      await appendNewUser(currentUserData, usersHeaders);
      // Re-fetch to get the rowIndex for future updates (or assume last row)
      const reFetchResult = await findUserByContact(senderId, usersHeaders);
      userRowIndex = reFetchResult.rowIndex;
    }

    // 3. Process Conversation Logic
    const { nextStage, replyData, updatedPreferences } = getNextStepLogic(lastResponse, { Current_Stage: currentStage }, userPreferences);

    // 4. Update User Data in Google Sheets
    // Update currentUserData object with new stage and preferences
    currentUserData.Current_Stage = nextStage;
    currentUserData.Last_Interaction = new Date().toISOString();
    currentUserData.Last_Response = lastResponse;
    // Update individual preference columns based on updatedPreferences
    for (const key in updatedPreferences) {
      if (usersHeaders.includes(key)) { // Ensure the key is a valid column header
        currentUserData[key] = updatedPreferences[key];
      }
    }
    // Save previous preferences JSON (for backup/undo)
    // Note: This assumes updatedPreferences is the full state.
    // If you want to save the *previous* state, you need to store userPreferences before updating.
    // For now, let's just save the current updated state as the "previous" for the *next* interaction.
    currentUserData.Previous_Preferences_JSON = JSON.stringify(userPreferences); // Store the state *before* this update

    await updateUserData(userRowIndex, currentUserData, usersHeaders);

    // 5. Prepare Payload for Blaster (via API_Trigger)
    let ruleToTrigger = "DEFAULT_REPLY_RULE"; // A default rule in Blaster to handle replies
    let actionType = "trigger_rule"; // Default action

    const blasterPayload = {
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
      if (!replyData.buttons.some(b => b.value === QUESTIONS.go_back_button.value)) {
          // Find the next available button slot (e.g., 5th button if we support it, or replace 4th)
          // For simplicity, let's add it as BUTTON_4 if there are less than 3 buttons, otherwise skip for now.
          if (replyData.buttons.length < 4) {
              blasterPayload[`BUTTON_${replyData.buttons.length + 1}_TEXT`] = QUESTIONS.go_back_button.text;
              blasterPayload[`BUTTON_${replyData.buttons.length + 1}_VALUE`] = QUESTIONS.go_back_button.value;
          }
      }
    } else if (replyData.type === 'list' && replyData.sections) {
        // For list messages, Blaster needs specific variables.
        // This is a placeholder. You'll need to define Blaster variables for list messages.
        // Example: #LIST_HEADER, #LIST_BODY, #LIST_BUTTON_TEXT, #LIST_SECTION_1_TITLE, #LIST_SECTION_1_ROW_1_TITLE, #LIST_SECTION_1_ROW_1_ID
        // This is more complex and will be implemented in detail later.
        blasterPayload.MESSAGE_TEXT = `(LIST MESSAGE - NOT FULLY IMPLEMENTED YET) ${replyData.body}`;
        // You might need a specific Blaster rule for list messages.
        ruleToTrigger = "LIST_MESSAGE_RULE";
    } else if (replyData.type === 'text_input') {
        // For text input, just send the message. No specific buttons needed.
        // Add "חזור" button if applicable
        blasterPayload.MESSAGE_TEXT = replyData.body;
        blasterPayload.BUTTON_1_TEXT = QUESTIONS.go_back_button.text;
        blasterPayload.BUTTON_1_VALUE = QUESTIONS.go_back_button.value;
    }


    // 6. Write to Analytics Log (Future Enhancement)
    // await writeAnalyticsLog(senderId, 'ConversationStep', { stage: nextStage, response: lastResponse });

    // 7. Send Trigger to Blaster
    await writeApiTrigger(senderId, ruleToTrigger, actionType, blasterPayload);

    return NextResponse.json({ status: 'success', message: 'Processing complete, trigger sent to Blaster via Sheets' });

  } catch (error) {
    console.error('Error in Vercel API:', error);
    // Log error to Analytics_Log (future enhancement)
    // await writeAnalyticsLog(senderId, 'API_Error', { error: error.message, stack: error.stack, body: request.body });
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
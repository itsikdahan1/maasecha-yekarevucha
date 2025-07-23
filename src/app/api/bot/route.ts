// src/app/api/bot/index.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic

// --- Configuration ---
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null;
const SECRET_KEY = process.env.MAKE_SECRET_KEY;

// --- Main API Handler ---
export async function POST(request: Request) {
  try {
    // 1. Authentication and Validation
    if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !SECRET_KEY) {
      console.error("Missing required environment variables.");
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${SECRET_KEY}`) {
      console.warn('Unauthorized access attempt to API.');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Received data from Make:', JSON.stringify(body, null, 2));

    const senderId: string = body.sender_id;
    const lastResponse: string = body.last_response;

    if (!senderId || !lastResponse) {
      console.error('Missing sender_id or last_response in request body.');
      return NextResponse.json({ message: 'Missing sender_id or last_response' }, { status: 400 });
    }

    // 2. Google Sheets API Setup
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    // 3. Business Logic (Simplified for now)
    // In the future, we will add the full getNextStepLogic here.
    // For now, let's just confirm we can read/write to the sheet.

    const USERS_SHEET_NAME = "Users";
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${USERS_SHEET_NAME}!A1:B2`,
    });

    console.log('Successfully read from Google Sheets:', response.data.values);

    // 4. Return a success response
    return NextResponse.json({
      status: 'success',
      message: 'API POST request is working and connected to Google Sheets!',
      data_from_sheet: response.data.values,
    });

  } catch (error: any) {
    console.error('Error in Vercel API:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/get-registration/route.ts
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

async function getGoogleSheetsInstance() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("Error creating Google Sheets instance:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const rowNumber = searchParams.get("id");

  if (!rowNumber) {
    return NextResponse.json(
      { error: "Row number is required" },
      { status: 400 }
    );
  }

  try {
    const sheets = await getGoogleSheetsInstance();

    // We add 1 to the row number because Google Sheets is 1-based
    // Also accounting for the header row
    const range = `Sheet1!A${parseInt(rowNumber)}:M${parseInt(rowNumber)}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
    });

    if (!response.data.values || response.data.values.length === 0) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    const [
      timestamp,
      fullName,
      email,
      whatsappNumber,
      contactNumber,
      collegeName,
      branch,
      year,
      domainInterested,
      status,
      adminNotes,
      dateOnly,
      isoTimestamp,
    ] = response.data.values[0];

    return NextResponse.json({
      registrationData: {
        timestamp,
        fullName,
        email,
        whatsappNumber,
        contactNumber,
        collegeName,
        branch,
        year,
        domainInterested,
        status,
        createdAt: timestamp,
      },
    });
  } catch (error) {
    console.error("Error fetching registration:", error);
    return NextResponse.json(
      { error: "Failed to fetch registration" },
      { status: 500 }
    );
  }
}

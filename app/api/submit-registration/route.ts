// app/api/submit-registration/route.ts
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// This function helps us create a connection to Google Sheets
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

// Helper function to format date for Indian Timezone
function getIndianTime() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const currentTime = getIndianTime();

    // Get the Google Sheets instance
    const sheets = await getGoogleSheetsInstance();

    // Format the data for sheets - we're adding timestamps and formatting
    // Each array element represents a column in the sheet
    const values = [
      [
        currentTime, // Submission Timestamp (for sorting)
        formData.fullName,
        formData.email,
        formData.whatsappNumber,
        formData.contactNumber,
        formData.collegeName,
        formData.branch,
        formData.year,
        formData.domainInterested,
        "pending", // Status
        "", // Reserved for admin notes
        currentTime.split(",")[0], // Just the date part for easy filtering
        new Date().toISOString(), // ISO timestamp for programmatic sorting
      ],
    ];

    // First, let's check if headers exist
    const checkHeaders = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A1:M1",
    });

    // If no headers, let's add them
    if (
      !checkHeaders.data.values ||
      checkHeaders.data.values[0]?.length === 0
    ) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        range: "Sheet1!A1:M1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              "Timestamp",
              "Full Name",
              "Email",
              "WhatsApp Number",
              "Contact Number",
              "College Name",
              "Branch",
              "Year",
              "Domain Interested",
              "Status",
              "Admin Notes",
              "Date Only",
              "ISO Timestamp",
            ],
          ],
        },
      });
    }

    // Append the data to your sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A:M", // Extended range to include all columns
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values,
      },
    });

    // Get the row number for the confirmation page
    const updatedRange = response.data.updates?.updatedRange;
    const rowNumber = updatedRange
      ? parseInt(updatedRange.split("!")[1].match(/\d+/)?.[0] || "0")
      : 0;

    // Additional sheet formatting
    try {
      // Format timestamp columns
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startColumnIndex: 0,
                  endColumnIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    numberFormat: {
                      type: "DATE_TIME",
                      pattern: "dd/mm/yyyy hh:mm:ss",
                    },
                  },
                },
                fields: "userEnteredFormat.numberFormat",
              },
            },
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startColumnIndex: 11,
                  endColumnIndex: 12,
                },
                cell: {
                  userEnteredFormat: {
                    numberFormat: {
                      type: "DATE",
                      pattern: "dd/mm/yyyy",
                    },
                  },
                },
                fields: "userEnteredFormat.numberFormat",
              },
            },
          ],
        },
      });
    } catch (formatError) {
      console.error("Error formatting sheet:", formatError);
      // Don't throw here - the data is still saved
    }

    return NextResponse.json({
      success: true,
      id: rowNumber.toString(),
    });
  } catch (error) {
    console.error("Error submitting to sheets:", error);
    return NextResponse.json(
      { error: "Failed to submit registration" },
      { status: 500 }
    );
  }
}

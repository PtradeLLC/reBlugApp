import { NextResponse } from "next/server";
import { google } from 'googleapis';

export async function POST(req) {
    try {
        const { emails, subjectLine, plan, campaignPage, emailBody, token } = await req.json();

        // If Google token is provided, fetch data from Google services
        if (token) {
            const auth = new google.auth.OAuth2();
            auth.setCredentials({ access_token: token });

            // Fetch Google Drive files
            const drive = google.drive({ version: 'v3', auth });
            const driveResponse = await drive.files.list({
                pageSize: 10,
                fields: 'nextPageToken, files(id, name)',
            });

            // Fetch Google Sheets data
            const sheets = google.sheets({ version: 'v4', auth });
            const sheetsResponse = await sheets.spreadsheets.values.get({
                spreadsheetId: 'YOUR_SPREADSHEET_ID',
                range: 'Sheet1!A1:C1000',
            });

            // Process the data as needed
            // ...

            return NextResponse.json({
                driveFiles: driveResponse.data.files,
                sheetsData: sheetsResponse.data.values,
                // Include other processed data here
            });
        }

        // Your existing email processing logic here
        // ...

        return NextResponse.json({ message: "Emails processed successfully" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "There is an error: " + error.message }, { status: 500 });
    }
}
const SHEET_STORAGE_KEY = 'beauty_minis_google_sheet_id';

export interface SheetAppendResult {
  success: boolean;
  spreadsheetId: string;
  spreadsheetUrl: string;
  error?: string;
}

/**
 * Ensures a dedicated Google Sheet exists for leads, creating it if necessary.
 */
export async function getOrCreateLeadsSpreadsheet(accessToken: string): Promise<string> {
  const existingSheetId = localStorage.getItem(SHEET_STORAGE_KEY);
  if (existingSheetId) {
    // Verify it still exists and is accessible
    try {
      const verifyRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${existingSheetId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (verifyRes.ok) {
        return existingSheetId;
      }
    } catch {
      // Create new one if previous is invalid
    }
  }

  // Create new spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'Beauty Minis Subscriber Leads',
      },
      sheets: [
        {
          properties: {
            title: 'Subscribers',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Email' } },
                    { userEnteredValue: { stringValue: 'Subscribed Date' } },
                    { userEnteredValue: { stringValue: 'Source' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${errorText}`);
  }

  const sheetData = await createRes.json();
  const newSheetId = sheetData.spreadsheetId;
  localStorage.setItem(SHEET_STORAGE_KEY, newSheetId);
  return newSheetId;
}

/**
 * Appends an email entry to the Google Sheet.
 */
export async function appendEmailToSheet(
  accessToken: string,
  email: string
): Promise<SheetAppendResult> {
  try {
    const spreadsheetId = await getOrCreateLeadsSpreadsheet(accessToken);
    const dateStr = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Subscribers!A:C:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[email, dateStr, 'Wirecutter Beauty Minis Landing Page']],
        }),
      }
    );

    if (!appendRes.ok) {
      const err = await appendRes.text();
      return {
        success: false,
        spreadsheetId,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
        error: err,
      };
    }

    return {
      success: true,
      spreadsheetId,
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    };
  } catch (error: any) {
    return {
      success: false,
      spreadsheetId: '',
      spreadsheetUrl: '',
      error: error?.message || 'Unknown error appending to sheet',
    };
  }
}

export function getStoredSpreadsheetId(): string | null {
  return localStorage.getItem(SHEET_STORAGE_KEY);
}

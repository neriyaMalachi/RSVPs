import fs from 'fs';
import path from 'path';
import os from 'os';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../lib/mongodb';
import Guest from '../../models/Guest';

// פונקציה לעיצוב שורות הטבלה עם ריווח קבוע
function padString(str: string, length: number): string {
  return str.padStart(length, ' ');
}

export async function POST(req: NextRequest, res: NextResponse) {
  const homeDir = os.homedir();
  let desktopPath;

  if (process.platform === "win32") {
    desktopPath = path.join(homeDir, "Desktop");
  } else if (process.platform === "darwin" || process.platform === "linux") {
    desktopPath = path.join(homeDir, "Desktop");
  }

  try {
    await dbConnect();
    const AllGuests = await Guest.find();

    if (AllGuests) {
      const filePath = path.join(desktopPath || "", "Guests.txt");
      // קביעת רוחב קבוע לכל עמודה
      const nameWidth = 80;
      const emailWidth = 80;
      const phoneWidth = 60;
      const guestsWidth = 40;
      const attendingWidth = 40;
      const sideWidth = 40;
      const notesWidth = 80;

      // יצירת כותרות הטבלה
      const header = `${padString('שם מלא', nameWidth)} | ${padString('איימיל', emailWidth)} | ${padString('טלפון', phoneWidth)} | ${padString('כמות אורחים', guestsWidth)} | ${padString('נוכחות', attendingWidth)} | ${padString('צד', sideWidth)} | ${padString('הערות', notesWidth)}\n`;
      const separator = `${'-'.repeat(nameWidth)} | ${'-'.repeat(emailWidth)} | ${'-'.repeat(phoneWidth)} | ${'-'.repeat(guestsWidth)} | ${'-'.repeat(attendingWidth)} | ${'-'.repeat(sideWidth)} | ${'-'.repeat(notesWidth)}\n`;

      // יצירת שורות של האורחים
      const usersText = AllGuests.map((guest: { name: string; email: string; phone: string; guests: { toString: () => string; }; attending: any; side: string; notes: any; }) =>
        `${padString(guest.name, nameWidth)} | ${padString(guest.email, emailWidth)} | ${padString(guest.phone, phoneWidth)} | ${padString(guest.guests.toString(), guestsWidth)} | ${padString(guest.attending ? 'כן' : 'לא', attendingWidth)} | ${padString(guest.side, sideWidth)} | ${padString(guest.notes || '', notesWidth)}`
      ).join('\n');

      // שילוב הכותרות, המפריד והשורות
      const table = header + separator + usersText;

      // כתיבת הטבלה לקובץ
      fs.writeFileSync(filePath, table, "utf8");

      return NextResponse.json({ status: 200, success: true });
    }

    return NextResponse.json({
      status: 500,
      message: "Guests not found",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 405 });
  }
}

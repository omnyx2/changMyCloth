import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());
    console.log(formDataEntryValues)

    for (const formDataEntryValue of formDataEntryValues) {
        console.log(formDataEntryValue)
      if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        const file = formDataEntryValue
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`public/person/person.jpg`, buffer);
      }
    }
    return NextResponse.json({ data: 'done'})
}

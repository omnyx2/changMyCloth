import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());
    console.log(formDataEntryValues)
    let id = ""
    console.log(id)
    for (const formDataEntryValue of formDataEntryValues) {
      if (typeof formDataEntryValue === "string") {
        id = formDataEntryValue
      }
      if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        const file = formDataEntryValue
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`public/person/${id}.jpg`, buffer);
      }
    }
    return NextResponse.json({ data: id})
}


export async function DELETE(){
  fs.stat('public/person/person.jpg', function (err, stats) {
    console.log(stats);//here we got all information of file in stats variable
    if (err) {
        return console.error(err);
    }
    fs.unlink('public/person/person.jpg',function(err){
         if(err) return console.log(err);
         console.log('file deleted successfully');
    });  
 });
 return NextResponse.json({ data: 'done'})
}
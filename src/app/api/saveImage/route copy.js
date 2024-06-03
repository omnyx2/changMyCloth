import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';



export async function POST(req) {
    const formData = await req.formData();
    console.log(formData)
    const formDataEntryValues = Array.from(formData.values());
  
    for (const formDataEntryValue of formDataEntryValues) {
  
      if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
        const file = formDataEntryValue
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`public/SendingImageCache/${file.name}`, buffer);
      }
    }
    const options = {
      method: 'POST',
      body: formData,
      // If you add this, upload won't work
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    };
    const res = await fetch('http://172.30.1.31:8080/fakeface/?gender_type=F', options);
    const repo = await res.json();
    const image = repo.images
    for(let i =0; i<image.length; i++){ 
        fs.writeFile(`public/resultImages/image_${i}.png`, image[i], {encoding: 'base64'}, function(err) {
        console.log('File created');
        });
    }
    // fs.writeFileSync(`public/requestMeta/${repo.requestId}.json`, JSON.stringify(repo));
    return NextResponse.json({ repo })
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { image, filename } = req.body;
    console.log('image', image)
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const filePath = path.join(process.cwd(), '/', filename);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving the image' });
        return;
      }
      res.status(200).json({ message: 'Image saved successfully' });
      return NextApiResponse({data:'done'})
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    return NextApiResponse({data:'error'})
  }
 
}
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextResponse } from 'next';

export async function POST(req) {
    const jsonData = JSON.parse(req.body);
    console.log("hi",   req.body)

    const personImage = await fs.readFileSync(`public/person/person.jpg`, {encoding: 'base64'});
    const personBlobImage = new Blob([personImage], { type: 'image/jpeg' });
    const imageListInfo = new Blob([jsonData], { type: 'application/json' });
    const reqId = new Date().getTime();
    const formData = new FormData();
    console.log(formData)
    fs.mkdirSync(`public/results/${reqId}`);    
    formData.append('personImage', personBlobImage);
    formData.append('imageListInfo', imageListInfo);
    formData.append('requestId', reqId);

    const options = {
        method: 'POST',
        body: formData,
    };

    // const res = await fetch('http://172.30.1.31:8080/fakeface/?gender_type=F', options);
    // const repo = await res.json();
    // const image = repo.images
    // for(let i =0; i<image.length; i++){
    //     fs.writeFile(`public/${reqId}/image_${i}.png`, image[i], {encoding: 'base64'}, function(err) {
    //         console.log('File created');
    //     });
    // }
    // return NextResponse.json({ reqId })
    return NextResponse.json({ data: 'done' })
}

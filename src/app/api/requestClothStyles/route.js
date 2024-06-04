import fs from 'fs';
import path, { format } from 'path';
import { NextApiRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

const baseURL = 'http://'
const serverIP = "172.20.10.2"
const AIURL = baseURL + serverIP + ":8080/"

function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
    // 파일의 mime값을 추출한다.(확장자를 만들기 위해서)
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    
    // 파일을 다시 binary로 복원
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return {
      data: ia,
      type: mimeString,
    };
  }
export async function POST(req) {
    const rawJson = await req.json();
    const id = rawJson.id;
    const jsonData = JSON.stringify(rawJson.imageList);
    const formData = new FormData();
    const personImage = await fs.readFileSync(`public/person/${id}.jpg`, {encoding: 'base64'});
    const base64Response = await fetch(`data:image/jpeg;base64,${personImage}`);
    const personBlobImage = await base64Response.blob();
    const imageListInfo = new Blob([jsonData], { type: 'application/json' });
    
    formData.append("file", personBlobImage);
    formData.append("imageInfoList", imageListInfo);
    formData.append("id", id);

    const options = {
        method: 'POST',
        body: formData,
    };

    const res = await fetch(`${AIURL}fakeface/?gender_type=origin`, options);
    const repo = await res.json();
    const image = repo  
    !fs.existsSync(id) && await fs.mkdir(`public/results/${id}`, { recursive: true }, (err) => {});
    await fs.mkdir(`public/results/${id}`, { recursive: true }, (err) => {});
    // const image = repo.images
    for(let i=0; i<image.length; i++){
        await fs.writeFile(`public/results/${id}/image_${i}.png`, image[i], {encoding: 'base64'}, function(err) {
            console.log('File created' + image[i]);
        });
    }
    return NextResponse.json({ data: "done" })
}

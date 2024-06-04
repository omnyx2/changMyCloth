import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const baseURL = 'http://'
const serverIP = "172.20.10.2"
const AIURL = baseURL + serverIP + ":8080/"


export async function GET(req) {
    // console.log(id)
    const { searchParams } = new URL(req.url);
    const params = new URLSearchParams(searchParams.toString())
    const id = params.get('id')
    const options = {
        method: 'GET',
    };
    const res = await fetch(`${AIURL}/getBoundbox?id=${id}`, options);
    console.log(res)
    const repo = await res.json();
    console.log(repo)
    const image = repo
    console.log(image)
    !fs.existsSync(`public/results/${id}`) && await fs.mkdir(`public/results/${id}`, { recursive: true }, (err) => {});
    fs.writeFile(`public/results/${id}/pre_1.png`, image, {encoding: 'base64'}, function(err) {
        console.log('File created2');
    });
    return NextResponse.json({ imageName: 'pre_1.png' });
}
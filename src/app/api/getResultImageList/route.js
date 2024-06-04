import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req) {
    // console.log(id)
    const { searchParams } = new URL(req.url);
    const params = new URLSearchParams(searchParams.toString())
    const id = params.get('id')

    // const imagesDirectory = path.join(process.cwd(), , 'presets'); // Path to the images directory
    const fileNames = await fs.readdirSync(`public/results/${id}/`);    // Filter out non-image files if needed
    const imageFiles = fileNames.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'].includes(ext);
    });
    console.log(imageFiles)
    return NextResponse.json({ imageList: imageFiles });
}
     

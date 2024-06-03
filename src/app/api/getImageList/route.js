import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    const imagesDirectory = path.join(process.cwd(), 'public', 'presets'); // Path to the images directory

    const fileNames = fs.readdirSync(imagesDirectory);

    // Filter out non-image files if needed
    const imageFiles = fileNames.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'].includes(ext);
    });
    console.log(imageFiles)
    return NextResponse.json({ imageList: imageFiles });
}
     

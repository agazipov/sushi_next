import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';

const pump = promisify(pipeline);

type TForm = {
    name: string
    img: File | undefined
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = await req.formData();
        const file = Object.fromEntries(formData) as TForm;
        const filePath = `./public/img_stock/${file.name}`;
        
        // Read the file as a Blob
        const blob = await file.img!.arrayBuffer();
        console.log("мой пост запрос", blob);

        // Convert the Blob to a Node.js Readable stream
        const readableStream = new Readable();
        readableStream.push(Buffer.from(blob));
        readableStream.push(null);

        // Pipe the stream to the destination file
        await pump(readableStream, fs.createWriteStream(filePath));

        return NextResponse.json({ status: "success" });
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e })
    }
}
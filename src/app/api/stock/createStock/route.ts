import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';
import type { Stock } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const pump = promisify(pipeline);

interface TForm extends Stock {
    picture: File
} 

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formData = await req.formData();
        // форма возвращает значение чекБоксов в стринге, из-за этого сыпит типы
        const file = Object.fromEntries(formData) as unknown as TForm;
        const check = file.show as unknown as string === "true" ? true : false;

        await prisma.stock.create({
            data: {
                title: file.title,
                body: file.body,
                show: check,
                img: file.picture.name,
            },
        });

        const filePath = `./public/img_stock/${file.picture.name}`;
        // Read the file as a Blob
        const blob = await file.picture!.arrayBuffer();
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
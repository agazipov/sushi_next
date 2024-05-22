import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
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
        const file = Object.fromEntries(formData) as unknown as TForm;
        const check = file.show as unknown as string === "true" ? true : false;

        await prisma.stock.update({
            where: {
                id: file.id,
            },
            data: {
                title: file.title,
                body: file.body,
                show: check,
                img: file.picture.name,
            },
        });

        const filePath = `./public/img_stock/${file.picture.name}`;

        try {
            await fsAsync.stat(filePath);
            return NextResponse.json({ status: "picture exists" });
        } catch (error) {
            const blob = await file.picture!.arrayBuffer();
            const readableStream = new Readable();
            readableStream.push(Buffer.from(blob));
            readableStream.push(null);
    
            await pump(readableStream, fs.createWriteStream(filePath));
            return NextResponse.json({ status: "picture change" });
        }
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e })
    }
}
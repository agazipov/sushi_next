import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';
import type { Stock } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";

const pump = promisify(pipeline);

interface TForm extends Stock {
    picture: File
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // проверка на сессию
        const cookies = req.cookies.getAll();
        const mockRequest = {
            cookies: Object.fromEntries(cookies.map(({ name, value }) => [name, value])),
            headers: Object.fromEntries(req.headers.entries()),
        };
        const session = await getSession({ req: mockRequest });
        if (!session) {
            return NextResponse.json({ message: "Access closed"}, { status: 403 });
        } else {
            const formData = await req.formData();
            // форма возвращает значение чекБоксов в стринге, из-за этого сыпит типы
            const file = Object.fromEntries(formData) as unknown as TForm;
            const check = file.show as unknown as string === "true" ? true : false;
    
            const filePath = `./public/img_stock/${file.picture.name}`;
            try {
                // проверка на уже существующий файл
                await fsAsync.stat(filePath);

                // если стат не выкидывает ошибки пишем в БД
                await prisma.stock.create({
                    data: {
                        title: file.title,
                        body: file.body,
                        show: check,
                        img: file.picture.name,
                    },
                });

                // добавляем картинку в директорию
                const blob = await file.picture!.arrayBuffer();
                const readableStream = new Readable();
                readableStream.push(Buffer.from(blob));
                readableStream.push(null);
                await pump(readableStream, fs.createWriteStream(filePath));
        
                return NextResponse.json({message: "Stoc added successfully" }, { status: 200 });
            } catch (error) {
                return NextResponse.json({message: "Something went wrong" }, { status: 500 });
            }
        }
    }
    catch (e) {
        return NextResponse.json({message: "request processing error", data: e}, { status: 500 })
    }
}
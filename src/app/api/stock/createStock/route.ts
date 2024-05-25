import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
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

//** добавление запись, если картинка существует - не записывает, иначе - записывает её
export async function POST(req: NextRequest) {
    try {
        // проверка на сессию
        const cookies = req.cookies.getAll();
        const mockRequest = {
            cookies: Object.fromEntries(cookies.map(({ name, value }) => [name, value])),
            headers: Object.fromEntries(req.headers.entries()),
        };
        const session = await getSession({ req: mockRequest });
        if (!session) {
            return NextResponse.json({ message: "Access closed" }, { status: 403 });
        }

        // преобразуем реквест 
        const formData = await req.formData();
        const file = Object.fromEntries(formData) as unknown as TForm;
        const check = file.show as unknown as string === "true" ? true : false;

        const filePath = `./public/img_stock/${file.picture.name}`;

        // ищем файл и проверяем наличие картинки
        const fileExist = fs.existsSync(filePath);
        if (!fileExist) {
            // если такой нет то добавляем в БД
            await prisma.stock.create({
                data: {
                    title: file.title,
                    body: file.body,
                    show: check,
                    img: file.picture.name,
                },
            });

            try {
                // добавляем картинку в publick
                const blob = await file.picture!.arrayBuffer();
                const readableStream = new Readable();
                readableStream.push(Buffer.from(blob));
                readableStream.push(null);

                await pump(readableStream, fs.createWriteStream(filePath));

                return NextResponse.json(
                    { message: "file create" },
                    { status: 200 }
                );
            } catch (error: any) {
                return NextResponse.json(
                    { message: "file create, picture not recorded", error: error.message },
                    { status: 206 }
                )
            }
        }
        return NextResponse.json(
            { message: "picture name is taken" },
            { status: 400 }
        );
    }
    catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
    }
}
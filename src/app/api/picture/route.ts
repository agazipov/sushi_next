import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';
import { getSession } from "next-auth/react";


const pump = promisify(pipeline);

// для получения картинок из public
export async function GET(req: NextRequest) {
    try {
        const filePath = `./public/img_dishes/`;
        const files = await fsAsync.readdir(filePath);
        return NextResponse.json(
            files,
            { status: 200 }
        );
    } catch (e: any) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
    }
}

// для добавления картинки в public
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
        const file = Object.fromEntries(formData) as { picture: File };

        const filePath = `./public/img_dishes/${file.picture.name}`;

        // ищем файл и проверяем наличие картинки
        const fileExist = fs.existsSync(filePath);
        if (!fileExist) {
            try {
                // добавляем картинку в publick
                const blob = await file.picture!.arrayBuffer();
                const readableStream = new Readable();
                readableStream.push(Buffer.from(blob));
                readableStream.push(null);

                await pump(readableStream, fs.createWriteStream(filePath));

                return NextResponse.json(
                    { message: "picture added" },
                    { status: 200 }
                );
            } catch (error: any) {
                return NextResponse.json(
                    { message: "picture not added", error: error.message },
                    { status: 500 }
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

// для удаления картинки из public
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

        const { searchParams } = new URL(req.url)
        const query = searchParams.get('d');
        const filePath = `./public/img_dishes/${query}`; 

        await fsAsync.unlink(filePath);
        return NextResponse.json({ message: "picture delete" }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
    }
}
import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';

import path from 'path';

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
// export async function POST(req: NextRequest) {
//     try {
//         // преобразуем реквест 
//         const formData = await req.formData();
//         const file = Object.fromEntries(formData) as { picture: File };

//         const filePath = `./public/img_dishes/${file.picture.name}`;

//         // ищем файл и проверяем наличие картинки
//         const fileExist = fs.existsSync(filePath);
//         if (!fileExist) {
//             try {
//                 // добавляем картинку в publick
//                 const blob = await file.picture!.arrayBuffer();
//                 const readableStream = new Readable();
//                 readableStream.push(Buffer.from(blob));
//                 readableStream.push(null);

//                 await pump(readableStream, fs.createWriteStream(filePath));

//                 return NextResponse.json(
//                     { message: "picture added" },
//                     { status: 200 }
//                 );
//             } catch (error: any) {
//                 return NextResponse.json(
//                     { message: "picture not added", error: error.message },
//                     { status: 500 }
//                 )
//             }
//         }
//         return NextResponse.json(
//             { message: "picture name is taken" },
//             { status: 400 }
//         );
//     }
//     catch (e) {
//         return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
//     }
// }

// ------------------------------ //
export async function POST(req: NextRequest) {
    try {
        // преобразуем реквест 
        const formData = await req.formData();
        const file = Object.fromEntries(formData) as { picture: File };

        const filePath = path.join(process.cwd(), 'public', 'img_dishes', file.picture.name);

        // ищем файл и проверяем наличие картинки
        try {
            await fsAsync.access(filePath);
            return NextResponse.json(
                { message: "picture name is taken" },
                { status: 400 }
            );
        } catch (error) {
            // файл не существует, продолжаем
        }

        try {
            // добавляем картинку в public
            const buffer = await file.picture.arrayBuffer();
            await fsAsync.writeFile(filePath, Buffer.from(buffer));

            return NextResponse.json(
                { message: "picture added" },
                { status: 200 }
            );
        } catch (error: any) {
            return NextResponse.json(
                { message: "picture not added", error: error.message },
                { status: 500 }
            );
        }
    } catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 });
    }
}
//--------------------------//


// для удаления картинки из public
export async function DELETE(req: NextRequest) {   
    try {
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
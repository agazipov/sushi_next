"use server"

import { NextResponse, NextRequest } from "next/server";
import  xml2js from 'xml2js';

// для получения картинок из public
export async function GET(req: NextRequest) {
    try {
        const result = await fetch(`https://fish-rice-bucket.s3.cloud.ru/`);
        const xmlText = await result.text();      
        // Очистка XML строки от символов перед первым тегом
        const cleanedXml = xmlText.replace(/^\s+|\uFEFF/g, '');

        let data: string[] = [];
        
        // Парсинг очищенной XML строки
        const pictures = xml2js.parseString(cleanedXml, { explicitArray: false }, (err: any, result: any) => {
            if (err) {
                throw Error(err);
            } else {
                data = result.ListBucketResult.Contents.map((elem: any) => elem.Key)
                // Теперь result — это объект JavaScript, представляющий XML данные
            }
        });
        return NextResponse.json(data, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
    }
}

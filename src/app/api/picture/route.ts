"use server"

import { NextResponse, NextRequest } from "next/server";
import xml2js from 'xml2js';

interface ListBucketResult {
    ListBucketResult: {
        Contents: { Key: string }[];
    };
}

// для получения картинок из public
export async function GET(req: NextRequest) {
    try {
        const result = await fetch(`https://fish-rice-bucket.s3.cloud.ru/`, { 
            cache: "no-cache", 
        });
        const xmlText = await result.text();
        // Очистка XML строки от символов перед первым тегом
        const cleanedXml = xmlText.replace(/^\s+|\uFEFF/g, '');

        let data: string[] = [];

        // Парсинг очищенной XML строки
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedResult: ListBucketResult = await new Promise((resolve, reject) => {
            parser.parseString(cleanedXml, (err: any, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        data = parsedResult.ListBucketResult.Contents.map((elem: any) => elem.Key);

        return NextResponse.json(data, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 })
    }
}

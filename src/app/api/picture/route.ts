"use server"

import { NextResponse, NextRequest } from "next/server";
import fs, { promises as fsAsync } from 'fs';
import { authorizationHeader } from "@/src/services/apiBucket"
import axios from 'axios';
import crypto from 'crypto';
const xml2js = require('xml2js');

const AWS_ACCESS_TENANT_ID = '4d353c5b-9934-4b62-bddc-9ebf24ddb46e';
const AWS_ACCESS_KEY_ID = '94afd9a26a3f62277bc1997082fe7f0d';
const AWS_SECRET_ACCESS_KEY = '3a00a176a9e4619bde533cfc35a93ea8';
const AWS_REGION = "ru-central-1";
const AWS_SERVICE = 's3';

function getSignatureKey(key: string, dateStamp: crypto.BinaryLike, regionName: crypto.BinaryLike, serviceName: crypto.BinaryLike) {
    const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
    const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
    const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
    return kSigning;
}

function getCanonicalRequest(method: any, path: any, headers: { [x: string]: string; }, payloadHash: any) {
    const canonicalHeaders = Object.keys(headers).sort().map(name => `${name.toLowerCase()}:${headers[name].trim()}`).join('\n');
    const signedHeaders = Object.keys(headers).sort().map(name => name.toLowerCase()).join(';');
    return `${method}\n${path}\n\n${canonicalHeaders}\n\n${signedHeaders}\n${payloadHash}`;
}

function getStringToSign(date: string | any[], region: any, service: any, canonicalRequest: crypto.BinaryLike) {
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${date.slice(0, 8)}/${region}/${service}/aws4_request`;
    const hash = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    return `${algorithm}\n${date}\n${credentialScope}\n${hash}`;
}

function signString(stringToSign: crypto.BinaryLike, signingKey: crypto.BinaryLike | crypto.KeyObject) {
    return crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
}

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

export async function POST(req: NextRequest) {
    try {
        // преобразуем реквест 
        const formData = await req.formData();
        // const file = Object.fromEntries(formData) as any;
        const file = formData.get('picture') as File;
        const date = new Date().toUTCString();
        const shortDate = date.slice(0, 8);
        const region = AWS_REGION;
        const service = AWS_SERVICE;
        const method = 'PUT';
        const path = `/fish-rice-bucket/${file.name}`;
        console.log("path", file);
        

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        const fileBuffer = await file.arrayBuffer();
        const fileHash = crypto.createHash('sha256').update(Buffer.from(fileBuffer)).digest('hex');

        const headers: any = {
            'Date': date,
            'Content-Type': file.type,
            'Content-Length': file.size.toString(),
            'x-amz-meta-author': 'Author',
            'x-amz-content-sha256': fileHash,
            'x-amz-date': date,
            'x-amz-grant-full-control': 'true',
            'x-amz-grant-write': 'true',
            'Expect': '100-continue',
        };

        const canonicalRequest = getCanonicalRequest(method, path, headers, fileHash);
        const stringToSign = getStringToSign(date, region, service, canonicalRequest);
        const signingKey = getSignatureKey(AWS_SECRET_ACCESS_KEY, shortDate, region, service);
        const signature = signString(stringToSign, signingKey);

        headers['Authorization'] = `AWS4-HMAC-SHA256 Credential=${AWS_ACCESS_TENANT_ID}:${AWS_ACCESS_KEY_ID}/${shortDate}/${region}/${service}/aws4_request, SignedHeaders=${Object.keys(headers).sort().map(name => name.toLowerCase()).join(';')}, Signature=${signature}`;

        try {
            const response = await axios.put(`https://fish-rice-bucket.s3.cloud.ru/`, fileBuffer, { headers });

            if (response.status === 200) {
                return NextResponse.json({ message: "picture added" }, { status: 200 });
            } else {
                return NextResponse.json({ message: 'Failed to upload file' }, { status: 200 });
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            return NextResponse.json({ message: 'Error uploading file' }, { status: 200 });
        }
    } catch (e) {
        return NextResponse.json({ message: "request processing error", data: e }, { status: 500 });
    }
}

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
// 1) Генерирование подписывающего ключа
// DateKey
const crypto = require('crypto');
const dateStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const keySecret = procces.env.KEY_SECRET;
const dateKey = crypto.createHmac('sha256', 'AWS4' + keySecret).update(dateStamp).digest();
// DateRegionKey
const region = "ru-central-1";
const dateRegionKey = crypto.createHmac('sha256', dateKey).update(region).digest();
// DateRegionServiceKey
const service = "s3";
const dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update(service).digest();
// SigningKey
const signingKey = crypto.createHmac('sha256', dateRegionServiceKey).update('aws4_request').digest();

// 2) Создание канонического запроса
const httpMethod = "GET";
const canonicalUri = "https://s3.cloud.ru/fish-rice-bucket/soya.webp";
const canonicalQueryString = "";

const amzDate = new Date().toISOString().replace(/[:-]/g, '').slice(0, 15) + 'Z';
const canonicalHeaders = `host:s3.cloud.ru\nrange:bytes=0-1024\nx-amz-date:${amzDate}\n`;

const signedHeaders = "host;x-amz-content-sha256;x-amz-date;x-amz-grant-full-control;x-amz-grant-write";
// const signedHeaders = "host;range;x-amz-date";

const hashedPayload = crypto.createHash('sha256').update('').digest('hex');

const canonicalRequest = `${httpMethod}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${hashedPayload}`;

// 3) Генерирование строки для подписи
const timeStamp = amzDate;
const scope = `${dateStamp}/${region}/${service}/aws4_request`;
const stringToSign = `AWS4-HMAC-SHA256\n${timeStamp}\n${scope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

// 4) Подпись строки
const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

// 5) Добавление подписи к запросу
// Аутентификация через HTTP-заголовок Authorization
const authorizationHeader = `AWS4-HMAC-SHA256 Credential=<TENANT_ID>:<KEY_ID>/${dateStamp}/${region}/${service}/aws4_request, SignedHeaders=${signedHeaders}, Signature=${signature}`;
const headers = {
    "Authorization": authorizationHeader,
    "x-amz-date": amzDate,
    "range": "bytes=0-1024"
};

// Аутентификация через параметры query
const queryParams = {
    "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
    "X-Amz-Credential": `${procces.env.TENANT_ID}:${procces.env.KEY_ID}/${dateStamp}/${region}/${service}/aws4_request`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": "86400",
    "X-Amz-SignedHeaders": signedHeaders,
    "X-Amz-Signature": signature
};

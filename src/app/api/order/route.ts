import { parsedOrderForString } from "@/lib/parsedOrderForString";
import { fetchTelegram } from "@/src/services/telegram";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { cart, dataObj } = await req.json();
    
        const formedOrder = parsedOrderForString(dataObj, cart);
    
        await fetchTelegram(formedOrder, process.env.CHAT_ID || '', process.env.BOT_TOKEN || '')
        return NextResponse.json(
            { message: "order success" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
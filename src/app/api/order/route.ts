import { parsedOrderForString } from "@/lib/parsedOrderForString";
import { fetchTelegram } from "@/src/services/telegram";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { TOrder } from "@/src/types/orderTypes";
import { chekSumByOrder } from "@/lib/chekSumByOrder";

export async function POST(req: NextRequest) {
    try {
        const { cart, dataObj }: { cart: ICart, dataObj: TOrder } = await req.json();

        // проверка на подмену URL
        const dishDB = await prisma.$transaction(
            cart.buy.map(product => {
                return prisma.dish.findUnique({
                    where:
                    {
                        id: product.id,
                        price_for_large: product.price_for_large,
                        price_for_mid: product.price_for_mid,
                    }
                })
            })
        )       
        const result = chekSumByOrder(cart.buy as IDishModify[], cart.price)
        if (!result || dishDB.includes(null)) {
            return NextResponse.json(
                { message: "Bad Request" },
                { status: 400 }
            );
        }
        
        // сообщение в ТГ
        const formedOrder = parsedOrderForString(dataObj, cart);
        await fetchTelegram(formedOrder, process.env.CHAT_ID || "", process.env.BOT_TOKEN || "");

        // запись метрики
        await prisma.metricOrder.update({
            where: {
                id: process.env.METRIC_ID || "",
            },
            data: {
                price: {
                    increment: cart.price,
                },
                countDishes: {
                    increment: cart.countDishes,
                },
                allOrders: {
                    increment: 1,
                },
            }
        });

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
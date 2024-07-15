import { parsedOrderForString } from "@/lib/parsedOrderForString";
import { fetchTelegram } from "@/src/services/telegram";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { TOrder } from "@/src/types/orderTypes";
import { chekSumByOrder } from "@/lib/chekSumByOrder";
import { IReqFindNumber } from "@/src/types/commonTypes";
import { fetchWhatsApp } from "@/src/services/whatsapp";

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
        // проверка скидки
        if (cart.discount) {
            const discount: IReqFindNumber = await prisma.discount.findUnique({
                where: {
                    phone: dataObj.phone,
                }
            })
            if (!discount) {
                throw new Error('Скидка не найдена');
            }
        }
        const result = chekSumByOrder(cart);        
        if (!result || dishDB.includes(null)) {
            return NextResponse.json(
                { message: "Bad Request" },
                { status: 400 }
            );
        }

        // парсим сообщение
        const formedOrder = parsedOrderForString(dataObj, cart);
        // сообщение в ТГ
        const responseTG = await fetchTelegram(formedOrder, process.env.CHAT_ID || "", process.env.BOT_TOKEN || "")
        
        // if (!responseTG.ok) {
        //     throw new Error('Ошибка при отправке формы');
        // }

        // сообщение в whatsapp
        const responseWA = await fetchWhatsApp(
            formedOrder,
            process.env.CHAT_WA || "",
            process.env.API_URL_WA || "",
            process.env.ID_INSTANCE_WA || "",
            process.env.API_TOKEN_INSTANCE_WA || "",
        )
        
        // if (!responseWA.idMessage) {
        //     throw new Error('Ошибка при отправке формы');
        // }

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
            { message: "order success", body: cart },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}
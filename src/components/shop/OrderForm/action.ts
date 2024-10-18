"use server"

import { TOrder } from "@/src/types/orderTypes";
import { ICart } from "@/src/types/reduxTypes";

const fetchWithTimeout = async (url: string, options: RequestInit & { timeout?: number } = {}): Promise<Response> => {
    const { timeout = 30000 } = options; // Устанавливаем таймаут по умолчанию в 10 секунд

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
};

export async function sendOrder(cart: ICart, data: FormData) {
    const dataObj = Object.fromEntries(data) as unknown as TOrder;
    
    console.log("Отправка запроса на сервер:", `${process.env.FETCH_URL}/api/order`);
    console.log("Данные запроса:", JSON.stringify({ cart, dataObj }, null, 2));

    try {
	const response = await fetch(`https://catfact.ninja/fact`);
        // const response = await fetchWithTimeout(`https://fish-rice.ru/api/order`, {
        //    method: "POST",
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify({ cart, dataObj })
        //});

        console.log("Получен ответ от сервера:", response.status);
        const result = await response.json();
        console.log("Результат запроса:", result);
        return result;
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error("Запрос был прерван по таймауту:", error);
        } else {
            console.error("Ошибка при отправке заказа:", error);
        }
        throw error;
    }
};
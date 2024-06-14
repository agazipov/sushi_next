"use server"

import { TOrder } from "@/src/types/orderTypes";
import { ICart } from "@/src/types/reduxTypes";

export async function sendOrder(cart: ICart, data: FormData) {
    const dataObj = Object.fromEntries(data) as unknown as TOrder;
    
    const response = await fetch(`${process.env.FETCH_URL}/api/order`, {
        method: "POST",
        body: JSON.stringify({ cart, dataObj })
    })
    const result = await response.json();
    return result;
};
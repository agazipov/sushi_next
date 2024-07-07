import { Dish } from "@prisma/client";

export interface IDishModify extends Dish {
    categorieName: string,
}

export interface ICart {
    price: number,
    countDishes: number,
    buy: IDishModify[],
    discount: number | null,
    // oldPrice?: number,
    paidDelivery: boolean,
    delivery: boolean,
    loading: boolean,
    error: string | null,
}
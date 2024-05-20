import { Dish } from "@prisma/client";

export interface ICart {
    price: number,
    countDishes: number,
    buy: Dish[],
}
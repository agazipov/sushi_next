export interface IDish {
    id: string,
    name: string,
    compound: string,
    price_for_mid: number,
    price_for_large: number,
    countByMid: number,
    countByLarge: number,
    select: string,
    img: string,
}

export interface ICart {
    price: number,
    countDishes: number,
    buy: IDish[],
}

export interface ISet {
    id: string,
    name: string,
    price: number,
    img: string,
    dishes: string[],
}

export type FormData = {
    name: string
    phone: string
    delivery: boolean
    street: string
    house: number
    apartment: number
    comment: string
}
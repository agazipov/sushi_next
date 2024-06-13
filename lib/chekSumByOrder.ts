import { IDishModify } from "@/src/types/reduxTypes";

export const chekSumByOrder = (dishesOrder: IDishModify[], cartPrice: number): boolean => {
    let price = 0;
    dishesOrder.forEach(dish => {
        price += ( dish.price_for_large * dish.countByLarge) + (dish.price_for_mid * dish.countByMid);
    })
    return price === cartPrice;
}
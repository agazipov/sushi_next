import { IDishModify } from "@/src/types/reduxTypes";

export const chekSumByOrder = (dishesOrder: IDishModify[], cartPrice: number, paidDelivery: boolean): boolean => {
    let price = paidDelivery ? 100 : 0;
    dishesOrder.forEach(dish => {
        price += ( dish.price_for_large * dish.countByLarge) + (dish.price_for_mid * dish.countByMid);
    })
    return price === cartPrice;
}
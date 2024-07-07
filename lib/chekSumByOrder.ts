import { ICart } from "@/src/types/reduxTypes";

export const chekSumByOrder = (cart: ICart): boolean => {
    const price = cart.buy.reduce((acc, dish) => {
        return acc + (dish.countByLarge * dish.price_for_large) + (dish.countByMid * dish.price_for_mid);
    }, 0);
    const chekPrice = cart.discount ? Math.round(price * ((100 - cart.discount) / 100)) : price;
    
    return cart.price === chekPrice;
}
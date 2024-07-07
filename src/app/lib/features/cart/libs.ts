import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { Dish } from "@prisma/client";

export function addBuyForCart(state: ICart, payload: IDishModify, checkSize: boolean) {
    // Находим блюдо в корзине по id
    const dishInCart = state.buy.find((dish) => dish.id === payload.id);

    if (dishInCart) { // Если блюдо есть, изменяем имеющееся
        if (checkSize) {
            dishInCart.countByMid! += 1;
        } else {
            dishInCart.countByLarge! += 1;
        }
    } else { // Иначе добавляем новое в зависимости от порции
        if (checkSize) {
            state.buy.push({ ...payload, countByMid: 1 });
        } else {
            state.buy.push({ ...payload, countByLarge: 1 });
        }
    }
    // Обновляем общий счетчик блюд
    state.countDishes = state.countDishes + 1;
}

export function delBuyForCart(state: ICart, payload: Dish, checkSize: boolean) {
    // Находим блюдо в корзине по id
    const dishInCart = state.buy.find((dish) => dish.id === payload.id);

    if (!dishInCart) return; // Проверка на наличие блюда в корзине

    if (checkSize) {
        dishInCart.countByMid! -= 1;
    } else {
        dishInCart.countByLarge! -= 1;
    }

    if (dishInCart.countByLarge === 0 && dishInCart.countByMid === 0) {
        state.buy = state.buy.filter(dish => dish.id !== payload.id);
    }

    state.countDishes -= 1;
}


export const calculatePriceWithDiscount = (price: number, discount: number): number => {
    return Math.round(price * ((100 - discount) / 100));
}

export const checkFreeDelivery = (state: ICart) => {
    if (state.delivery) {
        if (state.price >= 600) {
            state.paidDelivery = false;
        } else {
            state.paidDelivery = true;
        }
    }
}
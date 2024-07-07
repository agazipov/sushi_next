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

    // если элемент найден то:
    if (dishInCart) {
        // если не последний по количеству элемент то уменьшаем счетчик в зависимости от порции
        if (checkSize) {
            dishInCart.countByMid! -= 1;
        } else {
            dishInCart.countByLarge! -= 1;
        }
        
        // иначе удаляем
        if (dishInCart.countByLarge === 0 && dishInCart.countByMid === 0) {
            state.buy = state.buy.filter(dish => dish.id !== payload.id);
        }
        
        // Обновляем общий счетчик блюд
        state.countDishes -= 1;
    }
}
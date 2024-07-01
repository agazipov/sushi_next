import { ICart, IDishModify } from "@/src/types/reduxTypes";
import { Dish } from "@prisma/client";

export function addBuyForCart(state: ICart, payload: IDishModify, check: boolean) {
    const indexBySelectDish = state.buy.findIndex((dish) => dish.id === payload.id); // ищем блюдо в карзине

    if (indexBySelectDish !== -1) { // если блюдо есть изменяем имеющееся
        if (check) {
            state.buy[indexBySelectDish].countByMid! += 1;
        } else {
            state.buy[indexBySelectDish].countByLarge! += 1;
        }
    } else { // иначе добавляем новое в зависимости от порции
        if (check) {
            state.buy.push({ ...payload, countByMid: 1 });
        } else {
            state.buy.push({ ...payload, countByLarge: 1 });
        }
    }
    // обновляем общий счетчик блюд
    state.countDishes = state.countDishes + 1;
}

export function delBuyForCart(state: ICart, payload: Dish, check: boolean) {
    const indexBySelectDish = state.buy.findIndex((dish) => dish.id === payload.id);

    // если элемент найден то:
    if (indexBySelectDish !== -1) {
        // если не последний по количеству элемент то уменьшаем счетчик в зависимости от порции
        if (check) {
            state.buy[indexBySelectDish].countByMid! -= 1;
        } else {
            state.buy[indexBySelectDish].countByLarge! -= 1;
        }
        state.price -= check ? payload.price_for_mid! : payload.price_for_large!;
        state.countDishes -= 1;

        if (state.buy[indexBySelectDish].countByLarge === 0 && state.buy[indexBySelectDish].countByMid === 0) {
            // иначе удаляем
            state.buy = state.buy.filter(dish => dish.id !== payload.id);
        }
    }
}
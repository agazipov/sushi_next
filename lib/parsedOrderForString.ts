import { TOrder } from "@/src/types/orderTypes";
import { ICart } from "@/src/types/reduxTypes";

export function parsedOrderForString(
    formState: TOrder,
    cart: ICart,
): string {
    const deliveryChek = formState.delivery === "false";

    const dishesString = cart.buy.map((dish) => {
        const portions = [];
        if (dish.countByLarge) portions.push(`большая порция: ${dish.countByLarge}`);
        if (dish.countByMid) portions.push(`маленькая порция: ${dish.countByMid}`);
        return `Блюдо - ${dish.name} (${portions.join(', ')})`;
    }).join('\n');

    const addressString = deliveryChek ? '' : `Адрес: ул. ${formState.street}, дом ${formState.house}, квартира ${formState.apartment}\n`;
    const commentString = formState.comment ? `Коментарий: ${formState.comment}\n` : '';

    return `Имя: ${formState.name}\n`
        + `Телефон: ${formState.phone}\n`
        + `Заказал:\n${dishesString}\n`
        + `На сумму: ${cart.price}₽${cart.discount ? ` скидка ${cart.discount}%` : ''}\n`
        + `Доставка: ${deliveryChek ? 'самовывоз' : 'на адрес'}\n`
        + addressString
        + commentString;
}
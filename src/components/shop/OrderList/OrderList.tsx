import { ICart } from "@/src/types/reduxTypes"
import { DishComponet } from "../DishComponet/DishComponet"

interface IOrderList {
    cart: ICart
}

export default function OrderList({cart}: IOrderList) {
    return (
        <div>
            <h3>Корзина: {cart.countDishes} блюд за {cart.price}₽</h3>
            <div>
                {cart.buy.map((dish, index) => {
                    return (
                        <DishComponet key={dish.id} dish={dish} viewVariant="custom" />
                    )
                })}
            </div>
        </div>
    )
}
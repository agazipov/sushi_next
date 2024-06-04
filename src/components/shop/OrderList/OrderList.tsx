import { ICart } from "@/src/types/reduxTypes";
import { DishComponet } from "../DishComponet/DishComponet";
import { COUNT_VARIANT } from "@/lib/constant";
import styles from "./styles.module.css";

interface IOrderList {
    cart: ICart
}

export default function OrderList({ cart }: IOrderList) {
    return (
        <div className={styles.orderList}>
            {cart.buy.map((dish) => {
                return (
                    <DishComponet
                        key={dish.id}
                        dish={dish}
                        viewVariant='custom'
                        countVariant={COUNT_VARIANT[dish.categorieName]}
                    />
                )
            })}
        </div>
    )
}
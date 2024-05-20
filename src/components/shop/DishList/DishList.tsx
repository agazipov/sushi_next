import styles from "./styles.module.css";
import classNames from 'classnames';
import type { Dish } from "@prisma/client/edge";
import { DishComponet } from "../DishComponet/DishComponet";

type TCategoriePage = {
    dishe: Dish[]
}

export default function DishList({dishe}: TCategoriePage) {

    return (
        <section className={classNames(styles.dishesList, "container")}>
            {dishe?.map((dish) => {
                return (
                    <DishComponet key={dish.id} dish={dish}/>
                )
            })}
        </section>
    )
}
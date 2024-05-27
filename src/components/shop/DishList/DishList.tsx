import styles from "./styles.module.css";
import classNames from 'classnames';
import type { Dish } from "@prisma/client/edge";
import { DishComponet } from "../DishComponet/DishComponet";
import { COUNT_VARIANT } from "@/lib/constant";

type TCategoriePage = {
    dishe: Dish[],
    categorieName: string,
}

export default function DishList({dishe, categorieName}: TCategoriePage) {

    return (
        <section className={classNames(styles.dishesList, "container")}>
            {dishe?.map((dish) => {
                return (
                    <DishComponet key={dish.id} dish={dish} countVariant={COUNT_VARIANT[categorieName]}/>
                )
            })}
        </section>
    )
}
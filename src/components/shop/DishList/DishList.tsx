import styles from "./styles.module.css";
import classNames from 'classnames';
import type { Dish } from "@prisma/client/edge";

type TCategoriePage = {
    children: React.ReactNode,
}

export default function DishList({children }: TCategoriePage) {

    return (
        <section className={classNames(styles.dishesList, "container")}>
            {children}
        </section>
    )
}
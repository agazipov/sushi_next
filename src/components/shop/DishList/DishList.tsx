import styles from "./styles.module.css";
import classNames from 'classnames';

type TCategoriePage = {
    children: React.ReactNode,
    title: string
}

export default function DishList({title, children }: TCategoriePage) {

    return (
        <section className={classNames(styles.root, "container")}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.dishesList}>{children}</div>
        </section>
    )
}
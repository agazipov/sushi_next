import styles from "./styles.module.css";
import classNames from 'classnames';

export default function OrderSuccess() {
    return (
        <section className={classNames(styles.orderSuccess, "container")}>
            <div className={styles.orderSuccess__wrapper}>
                <p>Ваш заказ усешно сформирован, через несколько минут с вами свяжется наш оператор для подтверждения</p>
                <p>Вы сможете сделать повторный заказ через 5 минут</p>
            </div>
        </section>
    )
}
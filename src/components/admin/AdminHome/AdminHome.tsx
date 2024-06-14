/* eslint-disable react/no-unescaped-entities */

import { MetricOrder } from "@prisma/client";
import styles from "./styles.module.css";
import classNames from "classnames";
import PasswordChange from "../PasswordChange/PasswordChange";

export default function AdminHome({ metric }: { metric: MetricOrder }) {
    return (
        <div className={classNames(styles.root, "container")}>
            <div className={styles.metric}>
                <p>Заказано на сумму: {metric.price}</p>
                <p>Заказано блюд: {metric.countDishes}</p>
                <p>Всего заказов: {metric.allOrders}</p>
            </div>
            <div className={styles.rulse}>
                <p>Как менять блюда</p>
                <p>Изменение картинок:
                    Для добавления картинки к блюду необходимо в форме редактирования добавить в поле "Изображение" название картинки. Все названия картинок мжно проверить во вкладке "Галлерея", а также  добавить новые. При добавлении в поле "Изображение" названия картинки через "/", в магазине они будут отображатся в виде карусели (слайдера). Для того что-бы добавить название блюда на слайдере, необходимо в поле "Состав" перечислить через запятую необходиме названия, указав ключевое слово "Включает: "</p>
                <p>Как менять акции</p>
            </div>
            <PasswordChange/>
        </div>
    );
}
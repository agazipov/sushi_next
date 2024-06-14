/* eslint-disable react/no-unescaped-entities */
"use client"

import {
    Button,
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormCheck,
    InputGroup
} from 'react-bootstrap';
import { MetricOrder } from "@prisma/client";
import styles from "./styles.module.css";
import classNames from "classnames";
import actionPassword from '../../../app/api/auth/[...nextauth]/actionPassword';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function AdminHome({ metric }: { metric: MetricOrder }) {
    const {data: session} = useSession();

    const handleSubmit = async (data: FormData) => {
        const result = await actionPassword(data, session?.user?.name);
        toast(result);
    }

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
            <div className={styles.password}>
                <Form action={handleSubmit}>
                    <FormLabel >Старый пароль</FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl type="text" placeholder="Старый пароль" required name="oldpass" />
                    </InputGroup>
                    <FormLabel >Новый пароль</FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl type="password" placeholder="Новый пароль" required name="newpass" />
                    </InputGroup>
                    <Button variant="primary" type="submit">Сменить пароль</Button>
                </Form>
                <Toaster/>
            </div>
        </div>
    );
}
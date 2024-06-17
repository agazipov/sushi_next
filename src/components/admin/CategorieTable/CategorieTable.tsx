"use client"

import { Button, Table } from "react-bootstrap";
import { Dish } from "@prisma/client"
import ModalWrap from "../ModalWrap/ModalWrap";
import { useState } from "react";
import DishForm from "../DishForm/DishForm";
import styles from "./styles.module.scss";
import { removeDish } from "@/src/services/actionDish";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

type TCategorieTable = {
    dishes: Dish[]
    categorieId: string
}

export default function CategorieTable({ dishes, categorieId }: TCategorieTable) {
    const [show, setShow] = useState<Dish | boolean>(false);
    const [showDelete, setShowDelete] = useState<Dish | null>(null);

    return (
        <>
            <div className={styles.btn__add_dish}>
                <Button onClick={() => setShow(true)}>Добавить блюдо</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Состав</th>
                        <th>Изображение</th>
                        <th>Цена<br/>(мал)</th>
                        <th>Цена<br/>(бол)</th>
                        <th>Выбор</th>
                        <th>Вид</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish, index) => (
                        <tr key={dish.id}>
                            <td>{index + 1}</td>
                            <td className={dish.stock ? styles.stock : ""}>{dish.name}</td>
                            <td>{dish.compound}</td>
                            <td className={styles.table__img}>{dish.img.replace(/\//g, " ")}</td>
                            <td>{dish.price_for_mid}</td>
                            <td>{dish.price_for_large}</td>
                            <td>{dish.select}</td>
                            <td>{dish.show ? "Показан" : "Скрыт"}</td>
                            <td>
                                <div className={styles.dish__btn_group}>
                                    <Button onClick={() => setShow(dish)} size="sm">Изменить</Button>
                                    <Button onClick={() => setShowDelete(dish)} size="sm" variant="danger">Удалить</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalWrap show={show} setShow={setShow} type="dish">
                <DishForm dish={typeof show === "object" ? show : null} categorieId={categorieId} setShow={setShow} />
            </ModalWrap>
            <ConfirmDelete<Dish>
                show={showDelete}
                setShow={setShowDelete}
                fnDelete={removeDish}
            />
        </>
    )
}
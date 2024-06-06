"use client"

import { Button, Table } from "react-bootstrap";
import { Dish } from "@prisma/client"
import ModalWrap from "../ModalWrap/ModalWrap";
import { useState } from "react";
import DishForm from "../DishForm/DishForm";
import styles from "./styles.module.css";
import { removeDish } from "@/src/app/admin/actionDish";

type TCategorieTable = {
    dishes: Dish[]
    categorieId: string
}

export default function CategorieTable({ dishes, categorieId }: TCategorieTable) {
    const [show, setShow] = useState<Dish | boolean>(false);

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
                        <th>Цена(мал)</th>
                        <th>Цена(бол)</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish, index) => (
                        <tr key={dish.id}>
                            <td>{index + 1}</td>
                            <td>{dish.name}</td>
                            <td>{dish.compound}</td>
                            <td className={styles.table__img}>{dish.img.replace(/\//g, " ")}</td>
                            <td>{dish.price_for_mid}</td>
                            <td>{dish.price_for_large}</td>
                            <td>
                                <div className={styles.dish__btn_group}>
                                    <Button onClick={() => setShow(dish)} size="sm">Изменить</Button>
                                    <Button onClick={() => removeDish(dish.id)} size="sm" variant="danger">Удалить</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ModalWrap show={show} setShow={setShow} >
                <DishForm dish={typeof show === "object" ? show : null} categorieId={categorieId} setShow={setShow} />
            </ModalWrap>
        </>
    )
}
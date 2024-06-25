"use client"

import { Button, Table } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Discount } from "@prisma/client";
import classNames from "classnames";
import { useState } from "react";
import ModalWrap from "../ModalWrap/ModalWrap";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { removeDiscounts } from "@/src/services/actionDiscount";
import DiscountForm from "../DiscountForm/DiscountForm";

export default function DiscountsList({ discounts }: { discounts: Discount[] | undefined }) {
    const [show, setShow] = useState<Discount | boolean>(false);
    const [showDelete, setShowDelete] = useState<Discount | null>(null);

    return (
        <div className={classNames(styles.root, "container")}>
            <h3>Управление скидками</h3>
            <div className={styles.btn__add}>
                <Button onClick={() => setShow(true)}>Добавить скидку</Button>
            </div>

            {discounts &&
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>Скидка</th>
                            <th>Опции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((discount, index) => (
                            <tr key={discount.id}>
                                <td>{index + 1}</td>
                                <td >{discount.name}</td>
                                <td >{discount.phone}</td>
                                <td >{discount.discount}</td>
                                <td>
                                    <div className={styles.btn_group}>
                                        <Button onClick={() => setShow(discount)} size="sm">Изменить</Button>
                                        <Button onClick={() => setShowDelete(discount)} size="sm" variant="danger">Удалить</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
            <ModalWrap show={show} setShow={setShow} type="dish">
                <DiscountForm discount={typeof show === "object" ? show : null} setShow={setShow} />
            </ModalWrap>
            <ConfirmDelete<Discount>
                show={showDelete}
                setShow={setShowDelete}
                fnDelete={removeDiscounts}
            />
        </div >
    )
}
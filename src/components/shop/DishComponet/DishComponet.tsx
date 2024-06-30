"use client";

import type { Dish } from "@prisma/client/edge";
import { IDishModify } from "@/src/types/reduxTypes";
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/lib/hooks";
import { cartActions, selectDishAmount } from "@/src/app/lib/features/cart/cart";
import { RootState } from "@/src/app/lib/store";
import ImgView from "../ImgView/ImgView";
import classNames from 'classnames';
import styles from "./styles.module.scss";

interface IDishComponent {
    dish: Dish,
    viewVariant?: 'default' | 'custom',
    countVariant: string[],
}

export function DishComponet({ dish, viewVariant = 'default', countVariant }: IDishComponent) {
    const [selectDish, setSelectDish] = useState<IDishModify>(() => ({ ...dish, categorieName: countVariant[0] }));

    const handleSize = (value: 'mid' | 'large') => setSelectDish(prev => ({ ...prev, select: value }));

    const dispatch = useAppDispatch();
    const count = useAppSelector((state: RootState) => selectDishAmount(state, dish));

    return (
        <div className={classNames(
            styles.dish_default,
            viewVariant === 'custom' ? styles.dish_custom : ''
        )}>
            {dish.stock && dish.stock !== '' &&
                <div className={styles.dish__stock}>{dish.stock}</div>
            }
            {viewVariant === 'custom' && <h4>{dish.name}</h4>}
            <div className={classNames(
                styles.dish__info,
                viewVariant === 'custom' ? styles.dish__info_modify : ''
            )}>
                <div className={styles.dish__header}>
                    {viewVariant === 'default' && <h4>{dish.name}</h4>}
                    <ImgView dish={dish} mod={viewVariant} />
                </div>

                <div className={styles.dish__size_btn}>
                    <div className={styles.dish__size_container}>
                        <div><u>Вариант:</u></div>
                        <div><u>Корзина:</u></div>
                        {!!dish.price_for_mid &&
                            <>
                                <div
                                    className={classNames(
                                        styles.dish__size,
                                        selectDish.select === 'mid' && styles.dish__size_activ
                                    )}
                                    onClick={() => handleSize('mid')}
                                >
                                    <div>
                                        {dish.price_for_mid} ₽
                                        {/* {countVariant[1]} */}
                                    </div>
                                </div>
                                <div className={styles.dish__cart_collumn}>
                                    <span className={styles.dish__size_count}>
                                        {count ? count.countByMid : 0}
                                    </span>
                                    {countVariant[3]}
                                </div>
                            </>
                        }
                        {!!dish.price_for_large &&
                            <>
                                <div
                                    className={classNames(
                                        styles.dish__size,
                                        selectDish.select === 'large' && styles.dish__size_activ
                                    )}
                                    onClick={() => handleSize('large')}
                                >
                                    <div >
                                        {dish.price_for_large} ₽
                                        {/* {countVariant[2]} */}
                                    </div>
                                </div>
                                <div className={styles.dish__cart_collumn}>
                                    <span className={styles.dish__size_count}>
                                        {count ? count.countByLarge : 0}
                                    </span>
                                    {countVariant[4]}
                                </div>
                            </>
                        }
                    </div>
                    <ButtonGroup>
                        <Button
                            size="sm"
                            variant="dark"
                            onClick={() => dispatch(cartActions.addCart(selectDish))}
                        >+</Button>
                        <Button
                            size="sm"
                            variant="dark" onClick={() => dispatch(cartActions.delCart(selectDish))}
                            disabled={
                                (selectDish.select === 'mid' && (count ? count.countByMid! === 0 : true))
                                ||
                                (selectDish.select === 'large' && (count ? count.countByLarge! === 0 : true))
                            }
                        >-</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}
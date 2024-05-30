"use client";

import type { Dish } from "@prisma/client/edge";
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/lib/hooks";
import { cartActions, selectDishAmount } from "@/src/app/lib/features/cart/cart";
import { RootState } from "@/src/app/lib/store";
import ImgView from "../ImgView/ImgView";
import classNames from 'classnames';
import styles from "./styles.module.css";

interface IDishComponent {
    dish: Dish,
    viewVariant?: 'default' | 'custom',
    countVariant?: string[],
}

const ViewVariantRoot: { [index: string]: string } = {
    default: styles.dish_default,
    custom: styles.dish_custom,
};

const ViewVariantDishInfo: { [index: string]: string } = {
    default: styles.dish__info_default,
    custom: styles.dish__info_custom,
};

export function DishComponet({ dish, viewVariant = 'default', countVariant }: IDishComponent) {
    const [selectDish, setSelectDish] = useState<Dish>(dish);

    const handleSize = (value: 'mid' | 'large') => setSelectDish(prev => ({ ...prev, select: value }));

    const dispath = useAppDispatch();
    const count = useAppSelector((state: RootState) => selectDishAmount(state, dish));

    return (
        <div className={classNames(ViewVariantRoot[viewVariant])}>
            <div className={styles.dish__header}>
                <h5>{dish.name}</h5>
                <ImgView dish={dish}/>
            </div>
            <div className={classNames(ViewVariantDishInfo[viewVariant])}>
                <div>
                    {!!dish.price_for_mid &&
                        <div
                            className={classNames(
                                styles.dish__size,
                                selectDish.select === 'mid' && styles.dish__size_activ
                                )}
                            onClick={() => handleSize('mid')}
                        >
                            <div>
                                {dish.price_for_mid}{countVariant ? countVariant[0] : "₽ за шт"}
                            </div>
                            <div>{count ? count.countByMid : 0}</div>
                        </div>
                    }
                    {!!dish.price_for_large &&
                        <div
                            className={classNames(
                                styles.dish__size,
                                selectDish.select === 'large' && styles.dish__size_activ
                                )}
                            onClick={() => handleSize('large')}
                        >
                            <div >
                                {dish.price_for_large}{countVariant ? countVariant[1] : "₽ за шт"}
                            </div>
                            <div>{count ? count.countByLarge : 0}</div>
                        </div>
                    }
                </div>
                <ButtonGroup>
                    <Button variant="dark" onClick={() => dispath(cartActions.addCart(selectDish))}>+</Button>
                    <Button
                        variant="dark" onClick={() => dispath(cartActions.delCart(selectDish))}
                        disabled={
                            (selectDish.select === 'mid' && (count ? count.countByMid! === 0 : true))
                            ||
                            (selectDish.select === 'large' && (count ? count.countByLarge! === 0 : true))
                        }
                    >-</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
"use client";

import styles from "./styles.module.css";
import classNames from 'classnames';
import type { Dish } from "@prisma/client/edge";
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/app/lib/hooks";
import { cartActions, selectDishAmount } from "@/src/app/lib/features/cart/cart";
import { RootState } from "@/src/app/lib/store";

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

    const handleSize = (value: 'mid' | 'large') => setSelectDish(prev => { return { ...prev, select: value } });

    const dispath = useAppDispatch();
    const count = useAppSelector((state: RootState) => selectDishAmount(state, dish));

    const imgParser = (img: string): string[] => {
        const result = img.split('/');
        return result;
    }

    return (
        <div className={classNames(ViewVariantRoot[viewVariant])}>
            <div className={styles.dish__header}>
                <h5 className={styles.dish__title}>{dish.name}</h5>
                <div className={styles.dish__wrapper}>
                    <div className={styles.dish__img}>
                        {imgParser(dish.img).map((imgURL, index) => (
                            <Image
                                key={index}
                                height={112}
                                width={112}
                                src={`/img_dishes/${imgURL}`}
                                alt={dish.name}
                            />
                        ))}
                    </div>
                    <div className={styles.dish__desc}>
                        <p>{dish.compound}</p>
                    </div>
                </div>
            </div>
            <div className={classNames(ViewVariantDishInfo[viewVariant])}>
                <div className={styles.dish__info_wrapper}>
                    {!!dish.price_for_mid &&
                        <div
                            className={classNames(styles.dish__size,
                                selectDish.select === 'mid' && styles.dish__size_activ)}
                            onClick={() => handleSize('mid')}
                        >
                            <div className={styles.dish__price}>
                                {dish.price_for_mid}{countVariant ? countVariant[0] : "₽ за шт"}
                            </div>
                            <div className={styles.dish__count}>{count ? count.countByMid : 0}</div>
                        </div>
                    }
                    {!!dish.price_for_large &&
                        <div
                            className={classNames(styles.dish__size,
                                selectDish.select === 'large' && styles.dish__size_activ)}
                            onClick={() => handleSize('large')}
                        >
                            <div className={styles.dish__price}>
                                {dish.price_for_large}{countVariant ? countVariant[1] : "₽ за шт"}
                            </div>
                            <div className={styles.dish__count}>{count ? count.countByLarge : 0}</div>
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
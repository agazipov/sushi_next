"use client";

// import { useDispatch } from "react-redux";
// import { cartActions, selectDishAmount } from "../../redux/features/cart/cart";
// import { RootState } from "../../redux";
// import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import classNames from 'classnames';
import type { Dish } from "@prisma/client/edge";
import { Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import Image from "next/image";

interface IDishComponent {
    dish: Dish,
    viewVariant?: 'default' | 'custom'
}

const ViewVariantStyle: {[index: string]: string} = {
    default: styles.primary,
    custom: styles.dish__info_custom,
};

export function DishComponet({ dish, viewVariant = 'default' }: IDishComponent) {
    const [selectDish, setSelectDish] = useState<Dish>(() => { return { ...dish, select: 'large' } });

    const handleSize = (value: 'mid' | 'large') => {
        setSelectDish(prev => { return { ...prev, select: value } })
    };

    // const dispath = useDispatch();

    // const count = useSelector((state: RootState) => {
    //     return selectDishAmount(state, dish);
    // });

    return (
        <div className={classNames(styles.dish, viewVariant)}>
            <div className={styles.dish__header}>
                <h5 className={styles.dish__title}>{dish.name}</h5>
                <div className={styles.dish__wrapper}>
                    <div className={styles.dish__img}>
                        <Image
                            height={100}
                            width={100}
                            src={`/public/img_dishes/${dish.img}`}
                            alt={dish.name}
                        />
                    </div>
                    <div className={styles.dish__desc}>
                        <p>{dish.compound}</p>
                    </div>
                </div>
            </div>
            <div className={classNames(styles.dish__info, ViewVariantStyle[viewVariant])}>
                <div className={styles.dish__info_wrapper}>
                    {dish.price_for_mid &&
                        <div
                            className={classNames(styles.dish__size,
                                selectDish.select === 'mid' && 'dish__size_activ')}
                            onClick={() => handleSize('mid')}
                        >
                            <div className={styles.dish__price}>{dish.price_for_mid}₽ за 4 шт: </div>
                            {/* <div className='dish__count'>{count ? count.countByMid : 0}</div> */}
                        </div>
                    }
                    {dish.price_for_large &&
                        <div
                            className={classNames(styles.dish__size,
                                selectDish.select === 'large' && 'dish__size_activ')}
                            onClick={() => handleSize('large')}
                        >
                            <div className={styles.dish__price}>{dish.price_for_large}₽ за 8 шт: </div>
                            {/* <div className='dish__count'>{count ? count.countByLarge : 0}</div> */}
                        </div>
                    }
                </div>
                <ButtonGroup>
                    {/* <Button variant="dark" onClick={() => dispath(cartActions.addCart(selectDish))}>+</Button>
                    <Button
                        variant="dark" onClick={() => dispath(cartActions.delCart(selectDish))}
                        disabled={
                            (selectDish.select === 'mid' && (count ? count.countByMid! === 0 : true))
                            ||
                            (selectDish.select === 'large' && (count ? count.countByLarge! === 0 : true))
                        }
                    >-</Button> */}
                </ButtonGroup>
            </div>
        </div>
    )
}
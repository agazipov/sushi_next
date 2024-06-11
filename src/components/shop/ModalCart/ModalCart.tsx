"use client"

import { Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import { RootState } from '@/src/app/lib/store';
import { cartActions, selectCart } from '@/src/app/lib/features/cart/cart';
import { useAppDispatch, useAppSelector } from '@/src/app/lib/hooks';
import { DishComponet } from '../DishComponet/DishComponet';
import styles from "./styles.module.scss";
import { COUNT_VARIANT } from '@/lib/constant';
import Link from 'next/link';
import { useLastOrder } from '@/src/context/LastOrderProvider';

interface IModalCart {
    show: boolean,
    setShow: (e: boolean) => void,
}

export default function ModalCart({ show, setShow }: IModalCart) {
    const cart = useAppSelector((state: RootState) => selectCart(state));
    const router = useRouter();
    const dispatch = useAppDispatch();
    const lastOrder = useLastOrder();

    const handleCheckOut = () => {
        setShow(false);
        cart.buy.length !== 0 && router.push('/order');
    };

    const handleClear = () => {
        setShow(false);
        dispatch(cartActions.clearCart());
    }

    return (
        <Modal className={styles.modal__font} show={show} onHide={() => setShow(false)}>
            <ModalHeader className={styles.header__modify}>
                <h3>Корзина: {cart.countDishes} блюд(а) за {cart.price}₽</h3>
                <div className={styles.header__btnGrp}>
                    {lastOrder &&
                        <Link href="/order/success">
                            <Button variant="dark" onClick={() => setShow(false)}>Прошлый заказ</Button>
                        </Link>
                    }
                    <Button variant="dark" onClick={handleClear}>Очистить</Button>
                </div>
            </ModalHeader>
            <ModalBody>
                {cart.buy.length === 0
                    ?
                    <div>Корзина пуста</div>
                    :
                    <div className={styles.modal__list}>
                        {cart.buy.map((dish) => {
                            return (
                                <DishComponet
                                    key={dish.id}
                                    dish={dish}
                                    viewVariant='custom'
                                    countVariant={COUNT_VARIANT[dish.categorieName]}
                                />
                            )
                        })}
                    </div>
                }
            </ModalBody>
            <ModalFooter>
                <Button variant="dark" onClick={handleCheckOut} disabled={cart.buy.length === 0}>
                    Оформить заказ
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Закрыть
                </Button>
            </ModalFooter>
        </Modal>
    )
}
"use client"

import { Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import { RootState } from '@/src/app/lib/store';
import { selectCart } from '@/src/app/lib/features/cart/cart';
import { useAppSelector } from '@/src/app/lib/hooks';
import { DishComponet } from '../DishComponet/DishComponet';
import styles from "./styles.module.css";
import { COUNT_VARIANT } from '@/lib/constant';

interface IModalCart {
    show: boolean,
    setShow: (e: boolean) => void,
}

export default function ModalCart({ show, setShow }: IModalCart) {
    const cart = useAppSelector((state: RootState) => selectCart(state));
    const router = useRouter();

    const handleCheckOut = () => {
        setShow(false);
        cart.buy.length !== 0 && router.push('/order');
    };

    return (
        <Modal className="dokdo" show={show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>
                <ModalTitle>Корзина: {cart.countDishes} блюд за {cart.price}₽</ModalTitle>
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
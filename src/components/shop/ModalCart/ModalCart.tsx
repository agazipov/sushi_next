import {Button,Modal, ModalHeader,ModalTitle,ModalBody, ModalFooter} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { redirect } from "next/navigation";
import { RootState } from '@/src/app/lib/store';
import styles from "./styles.module.css";
import { selectCart } from '@/src/app/lib/features/cart/cart';

interface IModalCart {
    show: boolean,
    setShow: (e: boolean) => void,
}

export default function ModalCart({ show, setShow }: IModalCart) {
    const cart = useSelector((state: RootState) => selectCart(state));

    const handleCheckOut = () => {
        setShow(false);
        cart.buy.length !== 0 && redirect('/order');
    };

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>
                <ModalTitle>Корзина: {cart.countDishes} блюд за {cart.price}₽</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {cart.buy.length === 0 
                    ?
                    <div>Корзина пуста</div>
                    :
                    <ol className={styles.modal__ol}>
                        {cart.buy.map((dish) => {
                            return (
                                <li key={dish.id}>
                                    {/* <Dish dish={dish} viewVariant='custom' /> */}
                                    <div>{dish.name}</div>
                                </li>
                            )
                        })}
                    </ol>
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
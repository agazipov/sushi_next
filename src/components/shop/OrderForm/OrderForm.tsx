import {
    Button,
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormCheck,
    InputGroup
} from 'react-bootstrap';
import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import styles from "./styles.module.css";
import { ICart } from '@/src/types/reduxTypes';
import { useAppDispatch, useAppSelector } from '@/src/app/lib/hooks';
import { useRouter } from 'next/navigation';
import { cartActions, selectCart } from '@/src/app/lib/features/cart/cart';
import { sendOrder } from './action';
import { IResult } from '@/src/types/commonTypes';
import toast, { Toaster } from 'react-hot-toast';
import { useMask } from '@react-input/mask';
import { useSetTime } from '@/src/context/timeOut/useContext';
import { useSetLastOrder } from '@/src/context/lastOrder/useContext';
import { fetchDiscount } from '@/src/app/lib/features/cart/thunk/fetchDiscount';
import { RootState } from '@/src/app/lib/store';

export default function OrderForm({ cart }: { cart: ICart }) {
    const cartState = useAppSelector((state: RootState) => selectCart(state));
    const dispatch = useAppDispatch();
    const router = useRouter();
    const lastOrder = useSetLastOrder();
    const timeOut = useSetTime();

    const inputRef = useMask({
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
        showMask: true,
        onMask: (event) => {           
            event.detail.input.length === 10 && dispatch(fetchDiscount(event.detail.value));
        },
    });

    const handleSubmit = async (data: FormData) => {
        const result: IResult = await sendOrder(cart, data);
        if (result.message === "order success") {
            lastOrder(result.body!);
            timeOut(Date.now());
            dispatch(cartActions.clearCart());
            router.push('/order/success');
        } else {
            toast.error("Что-то пошло не так(")
        }
    }

    return (
        <>
            <Toaster />
            <Form action={handleSubmit} className={styles.form__modify}>
                <FormLabel >Контактная информация</FormLabel>
                <InputGroup className="mb-3">
                    <FormControl
                        type="text"
                        placeholder="Имя"
                        required
                        name="name"
                    />
                    <FormControl
                        ref={inputRef}
                        type="text"
                        placeholder="+7 (___) ___-__-__"
                        required
                        name="phone"
                    />
                </InputGroup>
                {cartState.discount && <div className="mb-3">Для вашего номера действует скидка {cartState.discount}%</div>}

                <FormLabel>Способ получения <br />(Доставка по городу - 100₽, при заказе от 600₽ - бесплатно)</FormLabel>
                <FormGroup className="mb-3">
                    <FormCheck
                        inline
                        type="radio"
                        label="1"
                    >
                        <FormCheckInput
                            checked={!cartState.delivery}
                            type="radio"
                            value='false'
                            name="delivery"
                            onChange={() => dispatch(cartActions.delivery(false))}
                        />
                        <FormCheckLabel>Самовывоз</FormCheckLabel>
                    </FormCheck>
                    <FormCheck
                        inline
                        type="radio"
                        label="2"
                    >
                        <FormCheckInput
                            checked={cartState.delivery}
                            type="radio"
                            value='true'
                            name="delivery"
                            onChange={() => dispatch(cartActions.delivery(true))}
                        />
                        <FormCheckLabel>Доставка</FormCheckLabel>
                    </FormCheck>
                </FormGroup>

                <FormLabel>Форма расчета</FormLabel>
                <FormGroup className="mb-3">
                    <FormCheck
                        inline
                        type="radio"
                        label="1"
                    >
                        <FormCheckInput
                            type="radio"
                            value='false'
                            name="payVariant"
                            defaultChecked
                        />
                        <FormCheckLabel>Наличная</FormCheckLabel>
                    </FormCheck>
                    <FormCheck
                        inline
                        type="radio"
                        label="2"
                    >
                        <FormCheckInput
                            type="radio"
                            value='true'
                            name="payVariant"
                        />
                        <FormCheckLabel>Безналичная</FormCheckLabel>
                    </FormCheck>
                </FormGroup>
                {cartState.delivery &&
                    <>
                        <div className="mb-3">Цена доставки: {cart.paidDelivery ? "100₽" : "бесплатно"}</div>
                        <InputGroup className="mb-3">
                            <FormControl
                                className={styles.formOrder__imput_mod}
                                type="text"
                                placeholder="Улица"
                                required
                                name="street"
                            />
                            <FormControl
                                placeholder="Дом"
                                type="text"
                                required
                                name="house"
                            />
                            <FormControl
                                placeholder="Кв"
                                type="number"
                                required
                                name="apartment"
                            />
                        </InputGroup>
                    </>
                }
                <FormGroup className="mb-3" >
                    <Form.Label>Комментарий к заказу</Form.Label>
                    <FormControl as="textarea" rows={3} name="comment" />
                </FormGroup>
                <Button variant="primary" type="submit">
                    Заказать
                </Button>
            </Form>
        </>
    )
}
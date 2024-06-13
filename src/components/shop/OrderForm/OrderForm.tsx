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
import { useState } from "react";
import styles from "./styles.module.css";
import { ICart } from '@/src/types/reduxTypes';
import { useAppDispatch } from '@/src/app/lib/hooks';
import { useRouter } from 'next/navigation';
import { cartActions } from '@/src/app/lib/features/cart/cart';
import { sendOrder } from './action';
import { IResult } from '@/src/types/commonTypes';
import { useSetLastOrder } from '@/src/context/LastOrderProvider';
import { useSetTime } from '@/src/context/TimeOutProvider';

export default function OrderForm({ cart }: { cart: ICart }) {
    const [viewDelivery, setViewDelivery] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const lastOrder = useSetLastOrder();
    const timeOut = useSetTime();

    const handleSubmit = async (data: FormData) => {
        const result: IResult = await sendOrder(cart, data);
        if (result.message === "order success") {
            lastOrder(cart);
            timeOut(Date.now());
            dispatch(cartActions.clearCart());
            router.push('/order/success');
        } else {}
        // логика для невалидного ответа
    }

    return (
        <Form action={handleSubmit} className={styles.form__modify}>

            <FormLabel >Контактная информация</FormLabel>
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Имя"
                    required
                    name="name"
                    defaultChecked
                />
                <FormControl
                    type="text"
                    placeholder="Телефон"
                    required
                    name="phone"
                    defaultChecked
                />
            </InputGroup>

            <FormLabel >Доставка</FormLabel>
            <FormGroup className="mb-3">
                <FormCheck
                    inline
                    type="radio"
                    label="1"
                >
                    <FormCheckInput
                        checked={!viewDelivery}
                        type="radio"
                        value='false'
                        name="delivery"
                        onChange={() => setViewDelivery(false)}
                    />
                    <FormCheckLabel>Самовывоз</FormCheckLabel>
                </FormCheck>

                <FormCheck
                    inline
                    type="radio"
                    label="2"
                >
                    <FormCheckInput
                        type="radio"
                        value='true'
                        name="delivery"
                        onChange={() => setViewDelivery(true)}
                    />
                    <FormCheckLabel>Доставка</FormCheckLabel>
                </FormCheck>
            </FormGroup>

            {viewDelivery &&
                <InputGroup className="mb-3">
                    <FormControl
                        className={styles.formOrder__imput_mod}
                        type="text"
                        placeholder="Улица"
                        required
                        name="street"
                        defaultChecked
                    />
                    <FormControl
                        placeholder="Дом"
                        type="number"
                        required
                        name="house"
                        defaultChecked
                    />
                    <FormControl
                        placeholder="Кв"
                        type="number"
                        required
                        name="apartment"
                        defaultChecked
                    />
                </InputGroup>
            }

            <FormGroup className="mb-3" >
                <Form.Label>Коментарий к заказу</Form.Label>
                <FormControl as="textarea" rows={3} name="comment" defaultChecked />
            </FormGroup>

            <Button variant="primary" type="submit">
                Заказать
            </Button>
        </Form>
    )
}
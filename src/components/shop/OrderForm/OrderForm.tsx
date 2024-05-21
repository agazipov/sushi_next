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

interface IFormOrder {
    onSubmit: (data: FormData) => void
}

export default function OrderForm({ onSubmit }: IFormOrder) {
    const [viewDelivery, setViewDelivery] = useState(false);

    return (
        <Form action={onSubmit} className={styles.form__my_style}>

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
                        placeholder="Квартира"
                        type="number"
                        required
                        name="apartment"
                        defaultChecked
                    />
                </InputGroup>
            }

            <FormGroup className="mb-3" >
                <Form.Label>Комьентарий к заказу</Form.Label>
                <FormControl as="textarea" rows={3} name="comment" defaultChecked />
            </FormGroup>

            <Button variant="primary" type="submit">
                Заказать
            </Button>
        </Form>
    )
}
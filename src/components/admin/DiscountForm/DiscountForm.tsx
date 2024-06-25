import {
    Button,
    Form,
    FormLabel,
    FormControl,
    InputGroup,
} from 'react-bootstrap';
import { addDiscounts, updateDiscounts } from "@/src/services/actionDiscount";
import { Discount } from "@prisma/client";
import { useMask } from '@react-input/mask';

type Props = {
    discount: Discount | null;
    setShow: (e: boolean) => void;
};

export default function DiscountForm({ discount, setShow }: Props) {
    const inputRef = useMask({
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
        showMask: true,
    });

    const handleSubmit = (data: FormData) => {
        discount ? updateDiscounts(data) : addDiscounts(data);
        setShow(false);
    };

    return (
        <Form action={handleSubmit}>
            <FormLabel >Имя</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Имя" required name="name" defaultValue={discount ? discount.name : ''} />
            </InputGroup>

            <FormLabel >Телефон</FormLabel>
            <InputGroup className="mb-3">
                <FormControl
                    ref={inputRef}
                    type="text"
                    placeholder="+7 (___) ___-__-__"
                    required
                    name="phone"
                    defaultValue={discount ? discount.phone : ''}
                />
            </InputGroup>

            <FormLabel >Скидка, %</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="number" placeholder="Скидка" required name="discount" defaultValue={discount ? discount.discount : 0} />
            </InputGroup>

            {discount &&
                <input type="hidden" name="id" value={discount.id} />
            }
            <Button variant="primary" type="submit">{discount ? "Сохранить изменения" : "Добавить скидку"}</Button>
        </Form>
    )
}
import {
    Button,
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    InputGroup,
    FormCheck
} from 'react-bootstrap';
import { createDish, updateDish } from "@/src/services/actionDish";
import { Dish } from "@prisma/client";
import { useState } from 'react';

type Props = {
    dish: Dish | null;
    categorieId?: string;
    setShow: (e: boolean) => void;
};

export default function DishForm({ dish, categorieId, setShow }: Props) {
    const [selectVariant, setSelectVariant] = useState(() => dish?.select === "large" && true);
    const [showDish, setShowDish] = useState(dish?.show);
    const handleSubmit = (data: FormData) => {
        dish ? updateDish(data) : createDish(data);
        setShow(false);
    }

    return (
        <Form action={handleSubmit}>
            <FormLabel >Название</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Название" required name="name" defaultValue={dish ? dish.name : ''} />
            </InputGroup>

            <FormGroup className="mb-3" >
                <FormLabel>Состав</FormLabel>
                <FormControl as="textarea" rows={5} name="compound" defaultValue={dish ? (dish.compound || '') : ''} />
            </FormGroup>

            <FormLabel >Цена за среднюю порцию</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Цена(сред)" required name="price_for_mid" defaultValue={dish ? dish.price_for_mid : "0"} />
            </InputGroup>

            <FormLabel >Цена за большую порцию</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Цена(бол)" required name="price_for_large" defaultValue={dish ? dish.price_for_large : "0"} />
            </InputGroup>

            <FormLabel >Изображение</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Изображение" required name="img" defaultValue={dish ? dish.img : ''} />
            </InputGroup>

            <FormLabel >Акция</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Акция" name="stock" defaultValue={dish ? (dish.stock || '') : ''} />
            </InputGroup>

            <FormLabel >Выбор - {selectVariant ? "Большой" : "Средний"}</FormLabel>
            <FormCheck
                type="switch"
                name="select"
                defaultChecked={selectVariant}
                onChange={() => setSelectVariant((prev) => !prev)}
            />

            <FormLabel >Вид - {showDish ? "Показан" : "Скрыт"}</FormLabel>
            <FormCheck
                type="switch"
                name="show"
                defaultChecked={showDish}
                onChange={() => setShowDish((prev) => !prev)}
            />

            {dish &&
                <input type="hidden" name="id" value={dish.id} />
            }
            {categorieId &&
                <input type="hidden" name="categorieId" value={categorieId} />
            }
            <Button variant="primary" type="submit">{dish ? "Сохранить изменения" : "Добавить акцию"}</Button>
        </Form>
    )
}
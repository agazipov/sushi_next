import {
    Button,
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    FormCheck,
    InputGroup
} from 'react-bootstrap';
import { createDish, updateDish } from "@/src/app/admin/actionDish";
import styles from "./styles.module.css";
import { Dish } from "@prisma/client";

type Props = {
    dish: Dish | null;
    categorieId?: string;
    setShow: (e: boolean) => void;
};

export default function DishForm({ dish, categorieId, setShow }: Props) {
    const handleSubmit = (data: FormData) => {
        dish ? updateDish(data) : createDish(data);
        setShow(false);
    }

    return (
        <Form className={styles.form} action={handleSubmit}>

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

            {dish &&
                <>
                    <input type="hidden" name="id" value={dish.id} />
                    <input
                        type="hidden"
                        name="img"
                        defaultValue={dish ? dish.img : ''}
                    />
                </>
            }
            {categorieId &&
                <input type="hidden" name="categorieId" value={categorieId} />
            }
           <Button variant="primary" type="submit">{dish ? "Сохранить изменения" : "Добавить акцию"}</Button>
        </Form>
    )
}
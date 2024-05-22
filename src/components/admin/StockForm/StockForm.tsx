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
import type { Stock } from "@prisma/client";
import { updateStock, createStock } from "@/src/app/admin/actionStock";

interface IFormChange {
    stock: Stock | null
    setShow: (e: boolean) => void
}

export default function StockForm({ stock, setShow }: IFormChange) {
    const handleSubmit = (data: FormData) => {
        stock ? updateStock(data) : createStock(data);
        setShow(false);
    }
    
    return (
        <Form action={handleSubmit}>

            <FormLabel >Название</FormLabel>
            <InputGroup className="mb-3">
                <FormControl type="text" placeholder="Название" required name="title" defaultValue={stock ? stock.title : ''} />
            </InputGroup>

            <FormGroup className="mb-3" >
                <FormLabel>Текст акции</FormLabel>
                <FormControl as="textarea" rows={5} name="body" defaultValue={stock ? (stock.body || '') : ''} />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel>{stock ? `Текущее изображение ${stock.img}. Заменить?` : "Изображение"}</FormLabel>
                <FormControl type="file" name="picture" required />
            </FormGroup>

            <FormLabel >Отображение</FormLabel>
            <FormGroup className="mb-3">
                <FormCheck inline type="radio" label="1" >
                    <FormCheckInput type="radio" value="true" name="show" defaultChecked={stock?.show} />
                    <FormCheckLabel>Показывать</FormCheckLabel>
                </FormCheck>

                <FormCheck inline type="radio" label="2" >
                    <FormCheckInput type="radio" value="false" name="show" defaultChecked={!stock?.show} />
                    <FormCheckLabel>Скрыть</FormCheckLabel>
                </FormCheck>
            </FormGroup>
            {stock &&
                <input type="hidden" name="id" value={stock.id} />
            }
            <Button variant="primary" type="submit">{stock ? "Сохранить изменения" : "Добавить акцию"}</Button>
        </Form>
    )
}
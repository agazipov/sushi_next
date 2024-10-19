"use client"

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
import { useRouter } from 'next/navigation';
import processResForStock from '@/lib/processResForStock';
import { IResult } from '@/src/types/commonTypes';
import { createStockFromPrisma, updateStockFromPrisma } from '@/src/services/stock';

interface IFormChange {
    stock: Stock | null
    setShow: (e: boolean) => void
    setMessage: (e: string) => void
}

export default function StockForm({ stock, setShow, setMessage }: IFormChange) {
    const router = useRouter();

    const handleSubmit = async (data: FormData) => {
        let result: IResult;
        if (stock) {
            result = await updateStockFromPrisma(data)
        } else {
            result = await createStockFromPrisma(data)
        }
        setMessage(processResForStock(result.message));

        router.refresh();
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

            <FormLabel >{stock ? `Текущее изображение ${stock.img}. Заменить?` : "Изображение"}</FormLabel>
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Изображение"
                    required={stock ? false : true}
                    name="img"
                    defaultValue={stock ? stock.img : ''}
                />
            </InputGroup>

            {/* <FormGroup className="mb-3">
                <FormLabel>{stock ? `Текущее изображение ${stock.img}. Заменить?` : "Изображение"}</FormLabel>
                <FormControl type="file" name="picture" required={stock ? false : true} />
            </FormGroup> */}

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
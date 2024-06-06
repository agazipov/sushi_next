"use client"

import {
    Button,
    Form,
    FormLabel,
    FormGroup,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import { addPicture } from "@/src/app/api/auth/[...nextauth]/actionPicture";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import processResForStock from '@/lib/processResForStock';

export default function GalleryForm() {
    const router = useRouter();

    const handleSubmit = async (data: FormData) => {
        const result = await addPicture(data)
        toast(processResForStock(result.message));
        router.refresh();
    }

    return (
        <>
            <Form action={handleSubmit}>
                <FormGroup className="mb-3">
                    <FormLabel>Добавить изображение</FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl type="file" name="picture" />
                        <Button variant="primary" type="submit">Загрузить</Button>
                    </InputGroup>
                </FormGroup>
            </Form>
            <Toaster />
        </>
    )
}
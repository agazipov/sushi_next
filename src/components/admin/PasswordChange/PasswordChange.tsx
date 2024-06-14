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
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import styles from "./styles.module.css";
import actionPassword from '@/src/app/api/auth/[...nextauth]/actionPassword';

export default function PasswordChange() {
    const { data: session } = useSession();
    const handleSubmit = async (data: FormData) => {
        const result = await actionPassword(data, session?.user?.name);
        toast(result);
    }

    return (
        <div className={styles.password}>
            <h3>Поменять пароль</h3>
            <Form action={handleSubmit}>
                <FormLabel >Старый пароль</FormLabel>
                <InputGroup className="mb-3">
                    <FormControl type="text" placeholder="Старый пароль" required name="oldpass" />
                </InputGroup>
                <FormLabel >Новый пароль</FormLabel>
                <InputGroup className="mb-3">
                    <FormControl type="password" placeholder="Новый пароль" required name="newpass" />
                </InputGroup>
                <Button variant="primary" type="submit">Сменить пароль</Button>
            </Form>
            <Toaster />
        </div>
    )
}
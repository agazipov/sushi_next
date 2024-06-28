"use client"

import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import styles from "./styles.module.css";
import actionPassword from '@/src/app/api/auth/[...nextauth]/actionPassword';

export default function PasswordChange({ setView }: { setView: (e: string) => void }) {
    const { data: session } = useSession();
    const handleSubmit = async (data: FormData) => {
        const result = await actionPassword(data, session?.user?.name);
        toast(result);
        setView('');
    }

    return (
        <div className={styles.password}>
            <Form action={handleSubmit}>
                <InputGroup className="mb-3" size='sm'>
                    <FormControl type="text" placeholder="Старый пароль" required name="oldpass" />
                </InputGroup>
                <InputGroup className="mb-3" size='sm'>
                    <FormControl type="text" placeholder="Новый пароль" required name="newpass" />
                </InputGroup>
                <Button variant="primary" type='submit'>Сменить пароль</Button>
            </Form>
            <Toaster />
        </div>
    )
}
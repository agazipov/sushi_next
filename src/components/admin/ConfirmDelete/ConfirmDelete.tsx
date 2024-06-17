import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import Link from 'next/link';
import styles from "./styles.module.scss";
import { Dish, Stock } from '@prisma/client';

interface IModalCart<T> {
    show: T | null,
    setShow: (e: null) => void,
    fnDelete: (e: T) => Promise<void>
}

export default function ConfirmDelete<T>({ show, setShow, fnDelete }: IModalCart<T>) {
    if (!show) {
        return;
    }
    return (
        <Modal show={!!show} onHide={() => setShow(null)}>
            <ModalBody>
                <h4>Подтвердите удаление</h4>
            </ModalBody>
            <ModalFooter>
                <Button variant="danger" onClick={() => { fnDelete(show); setShow(null) }}>
                    Удалить
                </Button>
                <Button variant="secondary" onClick={() => setShow(null)}>
                    Оставить
                </Button>
            </ModalFooter>
        </Modal>
    )
}
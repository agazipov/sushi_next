"use client"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import styles from "./styles.module.scss";
import Link from 'next/link';

interface IModalCart {
    show: boolean,
    setShow: (e: boolean) => void,
}

export default function InfoModal({ show, setShow }: IModalCart) {

    return (
        <Modal show={show} onHide={() => setShow(false)} dialogClassName={styles.modal_size}>
            <ModalHeader closeButton>
                <h3>Пользовательская информация</h3>
            </ModalHeader>
            <ModalBody>
                <p>ИП Зубарева Екатерина Сергеевна</p>
                <p>ИНН 741709410469</p>
                <p>ОГРН 322745600095772</p>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Закрыть
                </Button>
            </ModalFooter>
        </Modal>
    )
}
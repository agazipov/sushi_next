import { Button, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from 'react-bootstrap';
import type { Dish, Stock } from "@prisma/client";
// import styles from "./styles.module.css";
import StockForm from '../StockForm/StockForm';

interface IModalCart {
    show:  Stock | boolean,
    setShow: (e: boolean) => void,
}

export default function ModalWrap({ show, setShow }: IModalCart) {
    return (
        <Modal show={!!show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>
                <ModalTitle>{typeof show === "object" ? "Редактировать акцию" : "Создать акцию"}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <StockForm stock={typeof show === "object" ? show : null} setShow={setShow}/>
            </ModalBody>
        </Modal>
    )
}
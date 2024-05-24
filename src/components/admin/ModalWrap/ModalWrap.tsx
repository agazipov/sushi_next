import { Modal, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap';
import type { Dish, Stock } from "@prisma/client";

interface IModalCart {
    children: React.ReactNode,
    show:  Stock | Dish | boolean,
    setShow: (e: boolean) => void,
}

export default function ModalWrap({ children, show, setShow }: IModalCart) {
    return (
        <Modal show={!!show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>
                <ModalTitle>{typeof show === "object" ? "Редактировать акцию" : "Создать акцию"}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )
}
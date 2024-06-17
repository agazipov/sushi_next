import { Modal, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap';

interface IModalCart<T> {
    children: React.ReactNode,
    show:  T | boolean,
    type: "stock" | "dish",
    setShow: (e: boolean) => void,
}

export default function ModalWrap<T>({ children, show, setShow, type }: IModalCart<T>) {
    const name = type === "stock" ? "Акции" : "Блюдо"
    return (
        <Modal show={!!show} onHide={() => setShow(false)}>
            <ModalHeader closeButton>
                <ModalTitle>{typeof show === "object" ? `Редактировать ${name}` : `Создать ${name}`}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )
}
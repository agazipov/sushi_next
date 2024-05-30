"use client"

import { Button } from 'react-bootstrap';
import IconClose from "@/public/img_app/icon-close.svg";
import styles from "./styles.module.css";
import Image from 'next/image';

interface IModalCart {
    show: boolean,
    setShow: (e: boolean) => void,
    children: React.ReactNode
}

export default function ModalCart({ show, setShow, children }: IModalCart) {
    const onWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).classList.contains(styles.modal__wrapper)) setShow(false);
    };

    return (
        <>
            {show &&
                <div className={styles.modal}>
                    <div className={styles.modal__wrapper} onClick={onWrapperClick}>
                        <div className={styles.modal__content}>
                            <button
                                className={styles.modal_close_button}
                                onClick={() => setShow(false)}
                            >
                                <Image src={IconClose} width={30} height={30} alt='cross' />
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
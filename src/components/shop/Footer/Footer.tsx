"use client";

import { useState } from "react";
import telegram_icon from "@/public/svg/icons8-telegram.svg";
import vk_icon from '@/public/svg/icons8-vk.svg';
import Image from 'next/image';
import Link from "next/link";
import classNames from 'classnames';
import styles from "./styles.module.scss";
import InfoModal from "../InfoModal/InfoModal";

export default function Footer() {
    const [show, setShow] = useState(false);

    return (
        <footer className={styles.footer}>
            <div className={classNames(styles.footer__container, "container")}>
                <div className={styles.footer__icon_wrapper}>
                    <p>Не забудь подписатся на нас</p>
                    <div className={styles.footer__icon}>
                        {/* <Link href="https://vk.com/fishrice_group" target='__blank'>
                            <Image src={telegram_icon} alt="Иконка телеграм" />
                        </Link> */}
                        <Link href="https://vk.com/fishrice_group" target='__blank'>
                            <Image src={vk_icon} alt="Иконка вконтакте" />
                        </Link>
                    </div>
                </div>
                <div className={styles.footer__inf_wrapper}>
                    {/* <div className={styles.footer__inf}>
                        <p>ИП Зубарева Екатерина Сергеевна</p>
                        <p>ИНН 741709410469</p>
                        <p>ОГРН 322745600095772</p>
                    </div> */}
                    <div className={styles.footer__inf}>
                        <button onClick={() => setShow(true)}>
                            <p><u>Информация о сервисе</u></p>
                        </button>
                        {/* <a href="">Публичная оферта</a> */}
                    </div>
                    <div className={styles.footer__inf}>
                        <p>Development by <Link href="https://nextjs.org" target='__blank'>Nextjs</Link></p>
                        <p>2024г.</p>
                    </div>
                </div>
            </div>
            <InfoModal show={show} setShow={setShow}/>
        </footer>
    )
}
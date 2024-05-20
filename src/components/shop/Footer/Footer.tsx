import telegram_icon from "@/public/svg/icons8-telegram.svg";
import vk_icon from '@/public/svg/icons8-vk.svg';
import styles from "./styles.module.css";
import classNames from 'classnames';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={classNames(styles.footer__container, "container")}>
                <div className={styles.footer__icon_wrapper}>
                    <p>Не забудь подписатся на нас</p>
                    <div className={styles.footer__icon}>
                        <a href="https://vk.com/fishrice_group" target='__blank'>
                            <Image src={telegram_icon} alt="Иконка телеграм" />
                        </a>
                        <a href="https://vk.com/fishrice_group" target='__blank'>
                            <Image src={vk_icon} alt="Иконка вконтекте" />
                        </a>
                    </div>
                </div>
                <div className={styles.footer__inf_wrapper}>
                    <div className={styles.footer__inf}>
                        <p>ИП Зубарева Екатерина Сергеевна</p>
                        <p>ИНН 741709410469</p>
                        <p>ОГРН 322745600095772</p>
                    </div>
                    <div className={styles.footer__inf}>
                        <a href="">Политика конфиденциальности</a>
                        <a href="">Публичная оферта</a>
                    </div>
                    <div className={styles.footer__inf}>
                        <p>Development by <a href="https://nextjs.org" target='__blank'>Next.js</a></p>
                        <p>2024г.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
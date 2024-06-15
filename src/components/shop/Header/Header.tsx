import fishes from '@/public/img_app/fishes.webp';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import styles from "./styles.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={classNames(styles.header__container, 'container')}>
                <div className={classNames(styles.header__title)}>
                    <h1>Рыба & Рис</h1>
                </div>
                <div className={styles.header__img}>
                    <Image width={770} height={770} src={fishes} alt="Логотип с 2 карпами" priority={true} />
                </div>
                <div className={styles.header__contact}>
                    <div className={classNames(styles.header__info, styles.header__backgroud)}>
                        <Link href={"/#map"}><p>г. Бакал, ул. Ленина, 5,<br /> помещение 1 (вход с торца)</p></Link>
                    </div>
                    <div className={classNames(styles.header__links, styles.header__backgroud)}>
                        <Link href={"tel:+79089392212"}>
                            +7(908)939-22-12
                        </Link>
                        <Link href={"tel:+79127728948"}>
                            +7(912)772-89-48
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
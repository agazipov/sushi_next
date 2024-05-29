import fishes from '@/public/img_app/fishes.webp';
import Image from 'next/image';
import classNames from 'classnames';
import Cart from '../Cart/Cart';
import styles from "./styles.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={classNames(styles.header__container, 'container')}>
                <div className={styles.header__title}>
                    <h1>Рыба & Рис</h1>
                </div>
                <div className={styles.header__img}>
                    <Image width={770} height={770} src={fishes} alt="Логотип с 2 карпами" />
                </div>
                {/* <div className="header__info">
                        <p>г. Бакал, ул. Ленина, 5, помещение 1 (вход с торца)</p>
                        <p>ДОСТАВКА от 500 рублей по Бакалу БЕСПЛАТНО</p>
                    </div>
                    <div className="header__links">
                        <a href="mock">vk.com/fishrice_bakal</a>
                        <a href="mock">+7 (908) 939-22-12</a>
                        <a href="mock">+7 (912) 772-89-48</a>
                    </div> */}
                <Cart />
            </div>
        </header>
    )
}
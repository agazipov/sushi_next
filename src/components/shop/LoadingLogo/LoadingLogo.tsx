import Image from "next/image";
import fishes from '@/public/img_app/fishes.webp';
import classNames from "classnames";
import styles from "./styles.module.scss";

export default function LoadingLogo() {
    return (
        <>
            <h2>Загрузка</h2>
            <div className={styles.loading__img}>
                <Image src={fishes} width={100} height={100} alt="Загрузка" />
            </div>
        </>
    )
}
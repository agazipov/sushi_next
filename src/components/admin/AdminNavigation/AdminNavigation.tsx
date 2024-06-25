import { getAllCategories } from "@/src/services/menu";
import Link from "next/link";
import styles from "./styles.module.css";
import classNames from "classnames";
import Logout from "../Logout/Logout";

export default async function AdminNavigation() {
    const categories = await getAllCategories();

    return (
        <div className={classNames(styles.root, "container")}>
            <nav className={styles.nav}>
                <Link className={styles.link} href={"/admin"}>Главная</Link>
                <Link className={styles.link} href={"/admin/stocks"}>Акции</Link>
                {categories.map(categorie => (
                    <Link
                        key={categorie.id}
                        className={styles.link}
                        href={`/admin/${categorie.id}`}
                    >{categorie.name}</Link>
                ))}
                <Link className={styles.link} href={"/admin/discount"}>Скидки</Link>
                <Link className={styles.link} href={"/admin/gallery"}>Галерея</Link>
            </nav>
            <Logout />
        </div>
    )
}
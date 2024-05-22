import { getAllCategories } from "@/src/services/menu";
import Link from "next/link";
import styles from "./styles.module.css";

export default async function AdminNavigation() {
    const categories = await getAllCategories();

    return (
        <nav className={styles.nav}>
            <Link className={styles.link} href={"/admin"}>{"Акции"}</Link>
            {categories.map(categorie => (
                <Link
                    key={categorie.id}
                    className={styles.link}
                    href={`/admin/${categorie.id}`}
                >{categorie.name}</Link>
            ))}
        </nav>
    )
}
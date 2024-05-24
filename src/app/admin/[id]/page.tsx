import CategorieTable from "@/src/components/admin/CategorieTable/CategorieTable";
import { getCategorieById } from "@/src/services/menu";
import styles from "./page.module.css";
import classNames from "classnames";

type Props = {
    params: {
        id: string;
    };
};

export default async function Categorie({ params: { id } }: Props) {
    const categorie = await getCategorieById(id);

    if (!categorie) {
        return <div>Категория не найдена</div>
    }

    return (
        <div className={classNames(styles.root, "container")}>
            <h2 className={styles.header}>{categorie.name}</h2>
            <CategorieTable dishes={categorie.dishes} categorieId={id}/>
        </div>
    )
}
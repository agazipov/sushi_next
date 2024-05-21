import CategorieTable from "@/src/components/admin/CategorieTable/CategorieTable";
import { getCategorieById } from "@/src/services/menu";
import Link from "next/link";

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

    // передаю в линк два id категорий при создании нового блюда
    return (
        <div>
            <h2>{categorie.name}</h2>
            <Link href={`/admin/${id}/${id}`}>Добавить блюдо</Link>

            <CategorieTable dishes={categorie.dishes} categorieId={id}/>
        </div>
    )
}
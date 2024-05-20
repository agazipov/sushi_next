import { getCategorieById } from "@/src/services/menu";

type Props = {
    params: {
        catID: string;
    };
};

export default async function CategoriePage({ params: { catID } }: Props) {
    const categorie = await getCategorieById(catID);

    if (!categorie) {
        return <div>Категория не найдена</div>
    }

    return (
        <div>{categorie.name}</div>
    )
}
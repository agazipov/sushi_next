import { getCategorieById } from "@/src/services/menu";
import DishList from "@/src/components/shop/DishList/DishList";

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
        <DishList dishe={categorie.dishes} categorieName={categorie.name}/>
    )
}
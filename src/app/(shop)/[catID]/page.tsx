import { getCategorieById } from "@/src/services/menu";
import DishList from "@/src/components/shop/DishList/DishList";
import { DishComponet } from "@/src/components/shop/DishComponet/DishComponet";
import { COUNT_VARIANT } from "@/lib/constant";
import TestComponent from "@/src/components/shop/Test/Test";

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
        <DishList>
            <TestComponent param={1}/>
            {categorie.dishes?.map((dish) => {
                return (
                    <DishComponet key={dish.id} dish={dish} countVariant={COUNT_VARIANT[categorie.name]}/>
                )
            })}
        </DishList>
    )
}
import DishList from "@/src/components/shop/DishList/DishList";
import SetComponent from "@/src/components/shop/SetComponent/SetComponent";
import { getAllSets } from "@/src/services/menu"

export default async function Sets() {
    const sets = await getAllSets();

    if (!sets) {
        return <div>Здесь пока нет сетов</div>
    }

    return (
        <DishList>
            {sets.map((set) => {
                return (
                    <SetComponent key={set.id} set={set} dishes={set.dishes}/>
                )
            })}
        </DishList>
    )
}
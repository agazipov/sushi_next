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

    return (
        <>
            <div>
                <h2>{categorie.name}</h2>
                <Link href={`/admin/${id}/${id}`}>Добавить блюдо</Link>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Состав</th>
                        <th>Цена(мал)</th>
                        <th>Цена(бол)</th>
                        <th>Опции</th>
                    </tr>
                </thead>
                <tbody>
                    {categorie.dishes.map((dish, index) => (
                        <tr key={dish.id}>
                            <td>{index + 1}</td>
                            <td>{dish.name}</td>
                            <td>{dish.compound}</td>
                            <td>{dish.price_for_mid}</td>
                            <td>{dish.price_for_large}</td>
                            <td>
                                <Link href={`/admin/${id}/${dish.id}`}>Изменить</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
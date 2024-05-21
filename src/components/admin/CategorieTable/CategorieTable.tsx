import { Table } from "react-bootstrap";
import { Dish } from "@prisma/client"
import Link from "next/link"

type TCategorieTable = {
    dishes: Dish[]
    categorieId: string
}

export default function CategorieTable({ dishes, categorieId }: TCategorieTable) {
    return (
        <Table>
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
                {dishes.map((dish, index) => (
                    <tr key={dish.id}>
                        <td>{index + 1}</td>
                        <td>{dish.name}</td>
                        <td>{dish.compound}</td>
                        <td>{dish.price_for_mid}</td>
                        <td>{dish.price_for_large}</td>
                        <td>
                            <Link href={`/admin/${categorieId}/${dish.id}`}>Изменить</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
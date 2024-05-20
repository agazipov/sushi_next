"use client"

import { Dish } from "@prisma/client"
import DishForm from "../admin/DishForm/DishForm"
import Link from "next/link"
import { removeDish } from "@/src/app/admin/actionDish"
import { usePathname } from "next/navigation"

type Props = {
    dish: Dish | null
}

export default function FormContainer({ dish }: Props) {
    const pathname = usePathname();
    // если клиентский заменить форму на кнопкиs

    return (
        <div>
            {dish ?
                <>
                    < div >
                        <h1>Редактировать блюдо</h1>
                        <Link href={`/admin/${dish.categorieId}`}>Назад</Link>
                    </div >
                    <form action={removeDish.bind(null, dish.id)}>
                        <input type="submit" value="Удалить блюдо" />
                    </form>
                    <DishForm dish={dish} />
                </>
                :
                <>
                    <div>
                        <h1>Добавить блюдо</h1>
                        <Link href={`/admin/${pathname.split("/")[2]}`}>Назад</Link>
                    </div>
                    <DishForm categorieId={pathname.split("/")[2]} />
                </>
            }
        </div>
    )
}
import { createDish, updateDish } from "@/src/app/admin/actionDish";
import styles from "./styles.module.css";
import { Dish } from "@prisma/client";

type Props = {
    dish?: Dish;
    categorieId?: string
};

export default function DishForm({ dish, categorieId }: Props) {

    return (
        <form className={styles.form} action={dish ? updateDish : createDish}>
            <input
                type="text"
                placeholder="Название"
                required
                name="name"
                defaultValue={dish ? dish.name : ''}
            />
            <textarea
                placeholder="Описание"
                required
                name="compound"
                defaultValue={dish ? (dish.compound || '') : ''}
                className="edit-text"
            />
            <input
                type="text"
                placeholder="Цена(бол)"
                required
                name="price_for_large"
                defaultValue={dish ? dish.price_for_large : 0}
            />
            <input
                type="text"
                placeholder="Цена(мал)"
                required
                name="price_for_mid"
                defaultValue={dish ? dish.price_for_mid : 0}
            />
            <input
                type="text"
                placeholder="Ссылка на изображение"
                required
                name="img"
                defaultValue={dish ? dish.img : ''}
            />
            {dish &&
                <input type="hidden" name="id" value={dish.id} />
            }
            {categorieId &&
                <input type="hidden" name="categorieId" value={categorieId} />
            }
            <div>
                <input type="submit" value={dish ? "Сохранить изменения" : "Добавить блюдо"} />
            </div>
        </form>
    )
}
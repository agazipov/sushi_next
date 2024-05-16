import { getDishById } from "@/services/menu";
import styles from "./page.module.css";
import Link from "next/link";

type Props = {
  params: {
    dishID: string;
  };
};

export default async function DishPage({ params: { dishID } }: Props) {
  const dish = await getDishById(dishID);

  if (!dish) {
    return <div>Блюдо не найдено</div>
  }

  return (
    <div className={styles.root}>
      <div>
        <h1>Редактировать блюдо</h1>
        <Link href={`/admin/${dish.categorieId}`}>Назад</Link>
      </div>

      <form className={styles.form}>
        <input
          type="text"
          placeholder="Название"
          required
          name="name"
          defaultValue={dish.name}
        />
        <textarea
          placeholder="Описание"
          required
          name="compound"
          defaultValue={dish.compound || ''}
          className="edit-text"
        />
        <input
          type="number"
          placeholder="Цена(бол)"
          required
          name="price_for_large"
          defaultValue={dish.price_for_large || 0}
        />
        <input
          type="number"
          placeholder="Цена(мал)"
          required
          name="price_for_large"
          defaultValue={dish.price_for_mid || 0}
        />
        <input type="hidden" name="id" value={dish.id} />
        <div>
          <input type="submit" value="Сохранить изменения" />
        </div>
      </form>
    </div>
  )
}
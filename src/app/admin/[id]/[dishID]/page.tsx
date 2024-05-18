import { getDishById } from "@/services/menu";
import Link from "next/link";
import styles from "./page.module.css";
import DishForm from "@/src/components/DishForm/DishForm";
import { removeDish } from "../../action";
import { usePathname } from "next/navigation";
import FormContainer from "@/src/components/container/FormContainer";

type Props = {
  params: {
    dishID: string;
  };
};

export default async function DishPage({ params: { dishID } }: Props) {
  const dish = await getDishById(dishID);

  return (
    <div className={styles.root}>
      <FormContainer dish={dish || null} />
    </div>
  )
}
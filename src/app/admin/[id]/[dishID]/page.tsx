import { getDishById } from "@/src/services/menu";
import styles from "./page.module.css";
import FormContainer from "@/src/components/containers/FormContainer";

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
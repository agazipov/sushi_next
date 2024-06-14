import classNames from "classnames";
import styles from "./styles.module.scss";

export default function EmptyContent({ children }: { children: React.ReactNode }) {
    return (
        <div className={classNames(styles.root, "container")}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
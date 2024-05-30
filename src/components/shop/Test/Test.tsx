import styles from "./styles.module.css";

export default function TestComponent({param}: {param: number}) {
    return (
        <div className={styles.root}>
            test {param}
        </div>
    )
}
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";
import AdminNavigation from "@/src/components/AdminNavigation/AdminNavigation";

export default async function Main() {
    

    return (
        <main className={styles.main}>
            <AdminNavigation />
            {/* <button onClick={() => signIn()}>signIn</button>
            <button onClick={() => signOut()}>signOut</button> */}
            <Link href={'/admin'}>admin</Link>
        </main>
    );
}

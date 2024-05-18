'use client'

import { useState } from "react";
import { fetchTelegram } from "../../services/telegram"; 
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
    const session = useSession();

    console.log(session);

    return (
        <main className={styles.main}>
            <button onClick={() => signIn()}>signIn</button>
            <button onClick={() => signOut()}>signOut</button>
            <Link href={'/admin'}>admin</Link>
        </main>
    );
}

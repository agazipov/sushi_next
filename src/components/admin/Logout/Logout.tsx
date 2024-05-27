"use client"

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Logout() {
    const router = useRouter();
    return (
        <div className={styles.root}>
            <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>Выйти</Link>
            <Link href="/" >На сайт</Link>
        </div>
    )
}
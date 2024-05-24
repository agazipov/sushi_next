"use client"

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Logout() {
    return (
        <div>
            <Link style={{padding: "6px"}} href="#" onClick={() => signOut({ callbackUrl: "/" })}>Выйти</Link>
        </div>
    )
}
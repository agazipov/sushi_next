"use client"

import { useRouter } from "next/navigation";
import {useEffect} from "react";

export default function RedirectBody() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/admin");
        }, 5000);
    })

    return (
        <div>Ваш запрос успешно обработан</div>
    )
}
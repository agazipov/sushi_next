"use client";

import { Button } from "react-bootstrap";
import { useEffect } from "react";
import EmptyContent from "@/src/components/shop/EmptyContent/EmptyContent";

export default function OrderError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("error", error);
    }, [error]);

    return (
        <EmptyContent>
            <h2>Что-то пошло не так</h2>
            <Button variant="dark" onClick={reset}>Перезагрузить</Button>
        </EmptyContent>
    );
}
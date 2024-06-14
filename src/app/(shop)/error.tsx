"use client";

import { Button } from "react-bootstrap";
import { useEffect } from "react";
import EmptyContent from "@/src/components/shop/EmptyContent/EmptyContent";

export default function MainError({
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
            <h4>Что-то пошло не так</h4>
            <br />
            <Button variant="dark" onClick={reset}>Перезагрузить</Button>
        </EmptyContent>
    );
}
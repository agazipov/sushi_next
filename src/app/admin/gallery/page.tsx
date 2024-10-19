"use client"

import GalleryList from "@/src/components/admin/GalleryList/GalleryList";
import React, { useEffect, useState } from "react";

export default function GalleryPage() {
    const [pictures, setPicture] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStocks() {
            try {
                const response = await fetch(`https://fish-rice.ru/api/picture`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: string[] = await response.json();
                setPicture(result);
            } catch (error: any) {
                console.error("Error fetching stocks:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchStocks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <GalleryList pictures={pictures} />
    )
}
"use server"

import { getServerSession } from "next-auth";
import { authConfig } from "./config";

export async function getPicture() {
    const response = await fetch(`${process.env.FETCH_URL}/api/picture`)
    const result: string[] = await response.json();
    return result;
}

export async function addPicture(data: FormData) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };

    const response = await fetch(`${process.env.FETCH_URL}/api/picture`, {
        method: "POST",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function delPicture(img: string) {
    const session = await getServerSession(authConfig);
    if (!session) return { message: "Access closed" };
    console.log("actionDelete", img);
    

    const response = await fetch(`${process.env.FETCH_URL}/api/picture?d=${img}`, {
        method: "DELETE"
    })
    const result = await response.json();
    return result;
}
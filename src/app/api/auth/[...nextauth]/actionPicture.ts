"use server"

export async function getPicture() {
    const response = await fetch(`${process.env.FETCH_URL}/api/picture`)
    const result = await response.json();    
    return result;
}

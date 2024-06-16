"use server"

export async function getPicture() {
    const response = await fetch(`${process.env.FETCH_URL}/api/picture`)
    const result: string[] = await response.json();
    return result;
}

export async function addPicture(data: FormData) {
    const response = await fetch(`${process.env.FETCH_URL}/api/picture`, {
        method: "POST",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function delPicture(img: string) {
    const response = await fetch(`${process.env.FETCH_URL}/picture?d=${img}`, {
        method: "DELETE"
    })
    const result = await response.json();
    return result;
}
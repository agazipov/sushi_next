export async function getPicture() {
    const response = await fetch('http://localhost:3000/api/picture')
    const result: string[] = await response.json();
    return result;
}

export async function addPicture(data: FormData) {
    const response = await fetch('http://localhost:3000/api/picture', {
        method: "POST",
        body: data
    })
    const result = await response.json();
    return result;
}

export async function delPicture(img: string) {
    const response = await fetch(`http://localhost:3000/api/picture?d=${img}`, {
        method: "DELETE"
    })
    const result = await response.json();
    return result;
}
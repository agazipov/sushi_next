import { Dish } from "@prisma/client";

// ** для отображения нескольких картинок передаю в поле img объекта несколько названий разделённых "/"
interface ImgsParams {
    url: string
    name: string
}

export const imgParser = (dish: Dish): ImgsParams[] => {
    const result = []
    const arrUrl = dish.img.split('/');

    if (arrUrl.length === 1) {
        return [{ url: arrUrl[0], name: "" }]
    }

    // сеты должны содержать описание с включенными наборами
    if (!dish.compound) {
        return [{ url: arrUrl[0], name: "",  }]
    }
    const startIndex = dish.compound.indexOf("Включает:");
    const cleanedString = startIndex !== -1 ? dish.compound.substring(startIndex) : dish.compound;
    const trimmedString = cleanedString.replace(/^Включает:\s*/, '');
    const arrName = trimmedString.split(/,\s*/);

    for (let index = 0; index < arrUrl.length; index++) {
        result.push({ url: arrUrl[index], name: arrName[index] })
    }

    return result;
}

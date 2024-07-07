import coldRolls from "./data/coldRolls.json";
import bakedRolls from "./data/bakedRolls.json";
import beverages from "./data/beverages.json";
import extras from "./data/extras.json";
import friedRolls from "./data/friedRolls.json";
import pizzas from "./data/pizzas.json";
import tortillas from "./data/tortillas.json";
import sets from "./data/sets.json";

export const DELIVERY_PRICE = 100;

export const TIMEOUT = 300000;

export const COUNT_VARIANT: { [index: string]: string[] } = {
    "Холодные роллы": ["Холодные роллы", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Печеные роллы": ["Печеные роллы", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Жареные роллы": ["Жареные роллы", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Тортильи": ["Тортильи", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Пицца": ["Пицца", "₽ - 25см: ", "₽ - 30см: ", " 25см пицц(а)", " 30см пицц(а)"],
    "Напитки": ["Напитки", "₽ за 1 шт: ", "₽ за 1 шт: ", "штук(а)", "штук(а)"],
    "Допы": ["Допы", "₽ за 1 шт: ", "₽ за 1 шт: ", "порц.", "порц."],
    "Сеты": ["Сеты", "₽ за сет: ", "₽ за сет: ", "сет(ов)", "сет(ов)"],
}

export const CATEGORIES_LIST = [
    {
        name: "Холодные роллы",
        dishes: coldRolls
    },
    {
        name: "Печеные роллы",
        dishes: bakedRolls
    },
    {
        name: "Жареные роллы",
        dishes: friedRolls
    },
    {
        name: "Пицца",
        dishes: pizzas
    },
    {
        name: "Тортильи",
        dishes: tortillas
    },
    {
        name: "Напитки",
        dishes: beverages
    },
    {
        name: "Допы",
        dishes: extras
    },
    {
        name: "Сеты",
        dishes: sets
    },
];

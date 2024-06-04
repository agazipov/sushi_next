import coldRolls from "./data/coldRolls.json";
import bakedRolls from "./data/bakedRolls.json";
import beverages from "./data/beverages.json";
import extras from "./data/extras.json";
import friedRolls from "./data/friedRolls.json";
import pizzas from "./data/pizzas.json";
import tortillas from "./data/tortillas.json";
import sets from "./data/sets.json";

export const COUNT_VARIANT: { [index: string]: string[] } = {
    "Холодные роллы": ["Холодные роллы", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Печеные роллы": ["Печеные роллы", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Жареные роллы": ["Жареные роллы", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Тортильи": ["Тортильи", "₽ за 4 ролла", "₽ за 8 роллов", "порции по 4 ролла", "порции по 8 роллов"],
    "Пицца": ["Пицца", "₽ - 25см: ", "₽ - 30см: ", " 25см пицц(а)", " 30см пицц(а)"],
    "Напитки": ["Напитки", "₽ за 1 шт: ", "₽ за 1 шт: ", "штук(а)", "штук(а)"],
    "Допы": ["Допы", "₽ за 1 шт: ", "₽ за 1 шт: ", "штук(а)", "штук(а)"],
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

export const SETS_LIST = [
    {
        name: "Детский КОМБО №1",
        price: 240,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Каппа маки"), 
            ...extras.filter(dish => dish.name === "Картофель фри с соусом 100/25гр"),
            ...beverages.filter(dish => dish.name === "Сок детский 200мл"),
        ]
    },
    {
        name: "Детский комбо №2",
        price: 370,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Крабик"), 
            ...extras.filter(dish => dish.name === "Картофель фри с соусом 100/25гр"),
            ...extras.filter(dish => dish.name === "Наггетсы из мяса цыпленка с соусом 8шт/25гр"),
            ...beverages.filter(dish => dish.name === "Сок детский 200мл"),
        ]
    },
    {
        name: "Детский комбо №3",
        price: 400,
        dishes: [
            ...pizzas.filter(dish => dish.name === "Маргарита"), 
            ...coldRolls.filter(dish => dish.name === "Тори маки"),
            ...beverages.filter(dish => dish.name === "Молочный коктейль 300мл"),
        ]
    },
    {
        name: "Крутой Уокер",
        price: 520,
        dishes: [
            ...extras.filter(dish => dish.name === "Картофель фри с соусом 100/25гр"),
            ...extras.filter(dish => dish.name === "Наггетсы из мяса цыпленка с соусом 8шт/25гр"),
            ...extras.filter(dish => dish.name === "Кольца кальмаров в кляре с соусом 100/25гр"),
            ...extras.filter(dish => dish.name === "Луковые кольца с соусом 120/25гр"),
            // extras.filter(dish => dish.name === "Гренки чесночные"),
            // extras.filter(dish => dish.name === "Соуса"),
        ]
    },
    {
        name: "Романтик",
        discription: "20 кусочков, 1/2 от средней пориции",
        price: 730,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Филадельфия Классик"),
            ...coldRolls.filter(dish => dish.name === "Дракон"),
            ...coldRolls.filter(dish => dish.name === "Калифорния"),
            ...coldRolls.filter(dish => dish.name === "Калифорния Эби"),
            ...coldRolls.filter(dish => dish.name === "Каппа маки"),
        ]
    },
    {
        name: "Ниндзя",
        discription: "40 кусочков",
        price: 860,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Аляска"),
            ...coldRolls.filter(dish => dish.name === "Каппа маки"),
            ...coldRolls.filter(dish => dish.name === "Унаги маки"),
            ...coldRolls.filter(dish => dish.name === "Сяке маки"),
            ...coldRolls.filter(dish => dish.name === "Сяке маки"),
        ]
    },
    {
        name: "Хот",
        discription: "24 кусочков",
        price: 850,
        dishes: [
            ...friedRolls.filter(dish => dish.name === "Эби темпура"),
            ...friedRolls.filter(dish => dish.name === "Тори темпура"),
            ...friedRolls.filter(dish => dish.name === "Унаги-сяке темпура"),
        ]
    },
    {
        name: "Фирменный",
        discription: "32 кусочка",
        price: 990,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Филадельфия Классик"),
            ...coldRolls.filter(dish => dish.name === "Бонито"),
            ...coldRolls.filter(dish => dish.name === "Сяке маки"),
            ...friedRolls.filter(dish => dish.name === "Сяке темпура"),
        ]
    },
    {
        name: "Сицилия",
        discription: "32 кусочка",
        price: 1000,
        dishes: [
            ...bakedRolls.filter(dish => dish.name === "Вулкан"),
            ...bakedRolls.filter(dish => dish.name === "Тояма"),
            ...friedRolls.filter(dish => dish.name === "Куш"),
            ...friedRolls.filter(dish => dish.name === "Вегас"),
        ]
    },
    {
        name: "Мексика",
        discription: "32 кусочка",
        price: 1000,
        dishes: [
            ...tortillas.filter(dish => dish.name === "Холодная тортилья с курочкой"),
            ...tortillas.filter(dish => dish.name === "Холодная тортилья с лососем"),
            ...tortillas.filter(dish => dish.name === "Горячая тортилья с креветкой"),
            ...tortillas.filter(dish => dish.name === "Горячая тортилья с беконом"),
        ]
    },
    {
        name: "Мальчишник",
        discription: "40 кусочка",
        price: 1150,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Дракон"),
            ...coldRolls.filter(dish => dish.name === "Бонито"),
            ...coldRolls.filter(dish => dish.name === "Гейша маки"),
            ...coldRolls.filter(dish => dish.name === "Каппа маки"),
            ...friedRolls.filter(dish => dish.name === "Унаги-сяке темпура"),
        ]
    },
    {
        name: "Астория",
        discription: "40 кусочка",
        price: 1280,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Филадельфия Классик"),
            ...coldRolls.filter(dish => dish.name === "Кабиа"),
            ...coldRolls.filter(dish => dish.name === "Фитнес"),
            ...friedRolls.filter(dish => dish.name === "Сяке темпура"),
            ...friedRolls.filter(dish => dish.name === "Унаги темпура"),
        ]
    },
    {
        name: "Самурай",
        discription: "40 кусочка",
        price: 1350,
        dishes: [
            ...bakedRolls.filter(dish => dish.name === "Филадельфия Хот"),
            ...bakedRolls.filter(dish => dish.name === "Тояма"),
            ...bakedRolls.filter(dish => dish.name === "Ямайка"),
            ...bakedRolls.filter(dish => dish.name === "Вулкан"),
            ...bakedRolls.filter(dish => dish.name === "Изуми"),
        ]
    },
    {
        name: "Акэбоно",
        discription: "48 кусочков",
        price: 1400,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Филадельфия Лайм"),
            ...coldRolls.filter(dish => dish.name === "Канада"),
            ...coldRolls.filter(dish => dish.name === "Нагано"),
            ...coldRolls.filter(dish => dish.name === "Калифорния эби"),
            ...coldRolls.filter(dish => dish.name === "Сяке маки"),
            ...coldRolls.filter(dish => dish.name === "Каппа маки"),
        ]
    },
    {
        name: "Девичник",
        discription: "48 кусочков",
        price: 1450,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Москва"),
            ...coldRolls.filter(dish => dish.name === "Калифорния"),
            ...coldRolls.filter(dish => dish.name === "Унаги маки"),
            ...coldRolls.filter(dish => dish.name === "Фитнес"),
            ...friedRolls.filter(dish => dish.name === "Тори темпура"),
            ...friedRolls.filter(dish => dish.name === "Эби темпура"),
        ]
    },
    {
        name: "Люкс",
        discription: "40 кусочков",
        price: 1530,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Москва"),
            ...coldRolls.filter(dish => dish.name === "Филадельфия Лайм"),
            ...coldRolls.filter(dish => dish.name === "Сакана"),
            ...coldRolls.filter(dish => dish.name === "Дракон"),
            ...coldRolls.filter(dish => dish.name === "Канада"),
        ]
    },
    {
        name: "Микс",
        discription: "56 кусочков",
        price: 1700,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Королевский"),
            ...coldRolls.filter(dish => dish.name === "Сяке маки"),
            ...coldRolls.filter(dish => dish.name === "Унаги маки"),
            ...friedRolls.filter(dish => dish.name === "Кани темпура"),
            ...friedRolls.filter(dish => dish.name === "Блэк"),
            ...bakedRolls.filter(dish => dish.name === "Фьюжн"),
            ...bakedRolls.filter(dish => dish.name === "Фиеста"),

        ]
    },
    {
        name: "Торнадо New",
        discription: "80 кусочков",
        price: 2300,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Сакана"),
            ...coldRolls.filter(dish => dish.name === "Бутта ролл"),
            ...coldRolls.filter(dish => dish.name === "Ига ролл"),
            ...coldRolls.filter(dish => dish.name === "Киото"),
            ...coldRolls.filter(dish => dish.name === "Чукос"),
            ...coldRolls.filter(dish => dish.name === "Чука маки"),
            ...coldRolls.filter(dish => dish.name === "Каппа маки"),
            ...coldRolls.filter(dish => dish.name === "Эби маки"),
            ...friedRolls.filter(dish => dish.name === "Кани темпура"),
            ...friedRolls.filter(dish => dish.name === "Текка темпура"),
    
        ]
    },
    {
        name: "Запечённая Четверка",
        discription: "16 кусочков",
        price: 670,
        dishes: [
            ...bakedRolls.filter(dish => dish.name === "Изуми"),
            ...bakedRolls.filter(dish => dish.name === "Фьюжн"),
            ...bakedRolls.filter(dish => dish.name === "Шик"),
            ...bakedRolls.filter(dish => dish.name === "Запеченный ролл с лососем и тунцом"),
        ]
    },
    {
        name: "Фаворит",
        discription: "64 кусочка",
        price: 1900,
        dishes: [
            ...coldRolls.filter(dish => dish.name === "Мясной"),
            ...coldRolls.filter(dish => dish.name === "Кабуки"),
            ...coldRolls.filter(dish => dish.name === "Катана"),
            ...coldRolls.filter(dish => dish.name === "Бонито"),
            ...coldRolls.filter(dish => dish.name === "Текка маки"),
            ...coldRolls.filter(dish => dish.name === "Ига маки"),
            ...coldRolls.filter(dish => dish.name === "Шиитаке маки"),
            ...friedRolls.filter(dish => dish.name === "Чикен темпура"),
        ]
    },
]

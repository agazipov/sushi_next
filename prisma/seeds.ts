import { PrismaClient } from "@prisma/client";
import coldRolls from "./data/coldRolls.json";
import bakedRolls from "./data/bakedRolls.json";
import beverages from "./data/beverages.json";
import extras from "./data/extras.json";
import friedRolls from "./data/friedRolls.json";
import pizzas from "./data/pizzas.json";
import tortillas from "./data/tortillas.json";
import { generatePassword, generateSalt } from "@/lib/identification";

const prisma = new PrismaClient();

const CATEGORIES_LIST = [
    {
        name: "Хлодные роллы",
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
];

const seedDishes = async () => {
    await prisma.categorie.deleteMany();
    await prisma.dish.deleteMany();

    for (const dishes of CATEGORIES_LIST) {
        await prisma.categorie.create({
            data: {
                name: dishes.name,
                dishes: {
                    create: dishes.dishes
                }
            }
        })
    }

};

const seedUsers = async () => {
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
    const salt = await generateSalt();

    await prisma.user.create({
        data: {
            name: process.env.ADMIN_NAME || "user",
            salt: salt,
            passwordHash: await generatePassword(salt, process.env.ADMIN_PASSWORD || "123"),
        }
    })
}

// seedDishes();
seedUsers();
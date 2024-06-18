import { PrismaClient } from "@prisma/client";
import { generatePassword, generateSalt } from "@/lib/identification";
import { CATEGORIES_LIST } from "@/lib/constant";

const prisma = new PrismaClient();

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

// const seedSets = async () => {
//     await prisma.set.deleteMany();

//     for (const set of SETS_LIST) {
//         await prisma.set.create({
//             data: {
//                 name: set.name,
//                 price: set.price,
//                 discription: set.discription,
//                 dishes: {
//                     create: set.dishes
//                 }
//             }
//         })
//     }
// };

const testSetCategorie = async () => {
    const DISH_BY_SET = {
        name: "Романтик",
        compound: "20 кусочков, 1/2 от средней пориции. Включает: Филадельфия Классик, Дракон, Калифорния,Калифорния эби, Каппа маки",
        price_for_large: 730,
        img: "8SY3xsBqn_E.webp/xUaJ3SYtvy4.webp/UxOISO1_HKY.webp/AZLAXbQjyn0.webp/9PWsZnQ9-9E.webp",
        price_for_mid: 0,
        countByMid: 0,
        countByLarge: 0,
        select: "large"
    }
    const SETS = {
        name: "Сеты_2",
        dishes: [DISH_BY_SET]
    }

    await prisma.categorie.create({
        data: {
            name: SETS.name,
            dishes: {
                create: SETS.dishes
            }
        }
    })
}

const seedUsers = async () => {
    await prisma.user.deleteMany();
    // await prisma.session.deleteMany();
    const salt = await generateSalt();

    await prisma.user.create({
        data: {
            name: process.env.ADMIN_NAME || "user",
            salt: salt,
            passwordHash: await generatePassword(salt, process.env.ADMIN_PASSWORD || "123"),
        }
    })
}

const seedStoks = async () => {
    await prisma.stock.deleteMany();

    await prisma.stock.create({
        data: {
            title: "Пицца Инь Янь",
            body: "32см - 470гр\n Цена: 450₽\n ☯Собери половинки на свой вкус",
            img: "",
            show: false,
        }
    })
}

const seedMetric = async () => {
    await prisma.metricOrder.deleteMany();

    await prisma.metricOrder.create({
        data: {
            price: 0,
            countDishes: 0,
            allOrders: 0,
        }
    })
}

// testSetCategorie();
// seedSets();
// seedStoks();
seedDishes();
// seedUsers();
// seedMetric();
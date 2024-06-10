import { Button } from "react-bootstrap";
import japan_girl from '@/public/img_app/art_girl.webp';
import road from '@/public/img_app/Scene_2.gif';
import Link from "next/link";
import styles from "./styles.module.scss";
import classNames from 'classnames';
import Image from "next/image";
import { Stock } from "@prisma/client";
import MapService from "../Map/Map";

export default async function Home({stocks}: {stocks: Stock[]}) {

    return (
        <div className={classNames(styles.home, "container")}>
            <section className={styles.home__section}>
                <div className={styles.home__img}>
                    <Image width={800} height={1200} src={japan_girl} alt="Гейша с зонтиком" />
                </div>
                <div className={styles.home__text_container}>
                    <div className={styles.home__text}>
                        <h4>О нас</h4>
                        {/* <p>Однажды к учителю пришел ученик и спросил: <i>- "Что такое суши, Учитель?".</i></p>
                        <p>Учитель отвечал ему:<br /> <i>- "Су́ши, или су́си (яп. すし, 寿司, 壽司, 鮨, 鮓, 寿斗, 寿し), — блюдо традиционной японской кухни, приготовленное из риса с уксусной приправой и различных морепродуктов, а также других ингредиентов. С начала 1980-х годов суши получило широкую популярность на Западе и во всём мире."</i></p> */}
                        <p>Мы рады приветствовать Вас в нашем магазине {"Рыба&Рис!"}</p>
                        <p>Здесь вы можете заказать доставку суши и не только</p>
                        <p>Для особых ценителей в нашем ассортименте имеется большой выбор пиццы)</p>
                        <p>Бесплатная доставка от 600 руб</p>
                        <div className={styles.discription__btn_group}>
                            {/* <Link href={"tel:+79089392212"}>
                                <Button variant="dark">Позвонить</Button>
                            </Link> */}
                            <Link href={"/"}>
                                <Button variant="dark">Начать покупки</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.home__text}>
                        <h4>Наши контакты</h4>
                        <p>Вы можете найти нас по адресу <u>Бакал, ул. Ленина, д.5</u></p>
                        <p>Вы так-же можете оформить заказ по телефонам:</p>
                        <a href="mock">+7 (908) 939-22-12</a>
                        <br />
                        <a href="mock">+7 (912) 772-89-48</a>
                        <div className={styles.discription__btn_group}>
                            <Link href={"tel:+79089392212"}>
                                <Button variant="dark">Позвонить</Button>
                            </Link>
                            {/* <Link href={"/"}>
                                <Button variant="dark">Начать покупки</Button>
                            </Link> */}
                        </div>
                    </div>
                </div>
            </section>

            {stocks &&
                <section className={classNames(styles.home__section, styles.discription)}>
                    {/* <div className={styles.home__img}>
                        <Image width={800} height={650} src={pai_mai} alt="Пай Май" />
                    </div> */}
                    <div className={styles.home__stocks}>
                        <h3>АКЦИИ</h3>
                        <div className={styles.home__stocks_grid}>
                            {stocks.filter(stock => stock.show).map((stock) => {
                                return (
                                    <div className={styles.home__stock} key={stock.id}>
                                        <h4>{stock.title}</h4>
                                        <p>{stock.body}</p>
                                        {stock.img &&
                                            <div className={styles.home__stock_img}>
                                                <Image width={400} height={400} src={`/img_stock/${stock.img}`} alt="Акция" />
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            }

            {/* <section className={styles.home__section}>
                <div className={styles.home__img}>
                    <Image width={800} height={650} src={rice} alt="Тарелка с рисом и палочки" />
                </div>
                <div className={styles.home__text}>
                    <p>Для того чтобы сделать заказ, добавьте в корзину интересующие вас блюда, щёлкните на корзине справа-сверху и подтвердите заказ. В открывшейся странице заказа необходимо указать Вашу информацию и сделать запрос. Пройдёт совсем не много времени и с вами свяжется наш оператор для уточнения деталей.</p>
                </div>
            </section> */}

            <section className={styles.home__section}>
                <div className={styles.home__img_route}>
                {/* <div className={classNames(styles.home__img, styles.home__img_route)}> */}
                    <h4>Схема проезда</h4>
                    {/* <Image width={800} height={650} src={road} alt="Карта" /> */}
                    <MapService apikey={process.env.API_KEY || ""}/>
                </div>
            </section>
        </div >
    )
}
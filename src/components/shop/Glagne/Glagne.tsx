import { Button } from "react-bootstrap";
import japan_girl from '@/public/img_app/art_girl.webp';
import rice from '@/public/img_app/rice.webp';
import pai_mai from '@/public/img_app/pai-mei.webp';
import road from '@/public/img_app/Scene_2.gif';
import Link from "next/link";
import styles from "./styles.module.css";
import classNames from 'classnames';
import Image from "next/image";
import { getAllStocksFromPrisma } from "@/src/services/stock";
import { getAllStocks } from "@/src/app/api/auth/[...nextauth]/actionStock";

export default async function Navigation() {
    const stocks = await getAllStocks();

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
                <div className={classNames(styles.home__img, styles.home__img_route)}>
                    <h4>Схема проезда</h4>
                    <Image width={800} height={650} src={road} alt="Карта" />
                </div>
                {/* <div className={styles.home__map}>
                    <a
                        href="https://yandex.ru/maps/37166/bakal/search/%D1%80%D1%8B%D0%B1%20%D1%80%D0%B8%D1%81/?utm_medium=mapframe&utm_source=maps"
                        style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
                    >
                        Рыба&Рис в Бакале
                    </a>
                    <a
                        href="https://yandex.ru/maps/37166/bakal/?utm_medium=mapframe&utm_source=maps"
                        style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}
                    >
                        Бакал
                    </a>
                    <iframe
                        title="yandex_map"
                        src="https://yandex.ru/map-widget/v1/?ll=58.814795%2C54.938172&mode=search&oid=131386570138&ol=biz&sll=58.811208%2C54.938172&sspn=0.016476%2C0.005603&text=%D1%80%D1%8B%D0%B1%20%D1%80%D0%B8%D1%81&z=16.2"
                        width="400"
                        height="400"
                        allowFullScreen={true}
                        style={{ position: "relative" }}
                    />
                </div> */}
            </section>
        </div >
    )
}
import { Stock } from "@prisma/client";
import { Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import MapService from "../Map/Map";
import japan_girl from '@/public/img_app/art_girl.webp';
import classNames from 'classnames';
import styles from "./styles.module.scss";

export default async function Home({ stocks }: { stocks: Stock[] }) {

    return (
        <div className={classNames(styles.home, "container")}>
            <section className={styles.home__section}>
                <div className={styles.home__img}>
                    <Image width={800} height={1200} src={japan_girl} alt="Гейша с зонтиком" />
                </div>
                <div className={styles.home__text_container}>
                    <div className={styles.home__text}>
                        <h4>О нас</h4>
                        <p>Мы рады приветствовать Вас в нашем сервисе по доставке &#171;Рыба&Рис!&#187;</p>
                        <p>Здесь вы можете заказать доставку суши, роллов и пиццы</p>
                        <p>Мы работаем: пн-пт с 11:00 до 23:00, сб-вс с 12:00 до 23:00 <br />(заказы принимаем до 22:00)</p>
                        <p>Бесплатная доставка от 600 руб</p>
                    </div>
                    <div className={styles.home__text}>
                        <h4>Наши контакты</h4>
                        <p>Вы можете найти нас по адресу <Link href={"#map"}>Бакал, ул. Ленина, д.5</Link></p>
                        <p>Вы так-же можете оформить заказ по телефонам:</p>
                        <div>
                            <div className={styles.home__contact_mobyle}>
                                <Link href={"tel:+79089392212"}>
                                    <Button variant="dark">+7(908)939-22-12</Button>
                                </Link>
                                <Link href={"tel:+79127728948"}>
                                    <Button variant="dark">+7(912)772-89-48</Button>
                                </Link>
                            </div>
                            <div className={styles.home__contact_pc}>
                                <span><u>+7 (908) 939-22-12</u></span>
                                <br />
                                <span><u>+7 (912) 772-89-48</u></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {stocks.some(stock => stock.show) &&
                <section className={classNames(styles.home__section, styles.discription)}>
                    <div className={styles.home__stocks}>
                        <h3>АКЦИИ</h3>
                        <div className={styles.home__stocks_grid}>
                            {stocks.filter(stock => stock.show).map((stock) => {
                                return (
                                    <div className={styles.home__stock} key={stock.id}>
                                        <h4>{stock.title}</h4>
                                        <div>
                                            {stock.body.split(/\\n*/).map((paragraf, index) => <p key={index}>{paragraf}</p>)}
                                        </div>
                                        {stock.img &&
                                            <div className={styles.home__stock_img}>
                                                <Image width={400} height={400} src={`https://fish-rice-bucket.s3.cloud.ru/${stock.img}`} alt="Акция" />
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            }

            <section className={styles.home__section} id="map">
                <div className={styles.home__img_route}>
                    <h4>Схема проезда</h4>
                    <Link href={"https://yandex.ru/maps/37166/bakal/?ll=58.810689%2C54.938218&mode=poi&poi%5Bpoint%5D=58.810636%2C54.938389&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D131386570138&z=18.8"} target="__blank">открыть на карте</Link>
                    <MapService apikey={process.env.API_KEY || ""} />
                </div>
            </section>
        </div >
    )
}
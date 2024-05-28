"use client"

import type { Set, Dish } from "@prisma/client/edge";
import { Carousel, CarouselItem, CarouselCaption, Button, ButtonGroup } from 'react-bootstrap';
import styles from "./styles.module.css";
import Image from "next/image";

type TSetComponent = {
    set: Set,
    dishes: Dish[]
}

export default function SetComponent({ set, dishes }: TSetComponent) {

    return (
        <div className={styles.set__root}>
            <h5>{set.name}</h5>
            {set.discription && <p>{set.discription}</p>}
            <div className={styles.set__dishes}>
                <Carousel interval={null} variant="dark">
                    {dishes.map((dish) => (
                        <CarouselItem key={dish.id}>
                            <div className={styles.set__dish}>
                                <Image
                                    height={150}
                                    width={150}
                                    src={`/img_dishes/${dish.img}`}
                                    alt={dish.name}
                                />
                            </div>
                            <CarouselCaption>
                                <span className={styles.set__dish_name}>{dish.name}</span>
                            </CarouselCaption>
                        </CarouselItem>
                    ))}
                </Carousel>
            </div>
            <div className={styles.set__dish_info}>
                <div>
                    <p>{set.price}₽ за набор</p>
                </div>
                <ButtonGroup>
                    <Button variant="dark" onClick={() => { }}>+</Button>
                    <Button variant="dark" onClick={() => { }}>-</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}
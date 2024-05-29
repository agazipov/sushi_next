import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';
import { imgParser } from "@/lib/imgParser";
import { Dish } from "@prisma/client";
import { memo } from 'react';
import Image from "next/image";
import styles from "./styles.module.css";

interface IImgView {
    dish: Dish
}

const ImgView = memo(function ImgView({ dish }: IImgView) {
    const nameImgList = imgParser(dish);

    return (
        <div className={styles.dish__wrapper}>
            {nameImgList.length > 1 ?
                <Carousel interval={null} variant="dark">
                    {nameImgList.map((img) => (
                        <CarouselItem key={img.url}>
                            <div className={styles.dish__img}>
                                <Image
                                    height={150}
                                    width={150}
                                    src={`/img_dishes/${img.url}`}
                                    alt={img.name}
                                />
                            </div>
                            <CarouselCaption>
                                <span className={styles.dish__caption}>{img.name}</span>
                            </CarouselCaption>
                        </CarouselItem>
                    ))}
                </Carousel>
                :
                <div className={styles.dish__img}>
                    <Image
                        height={112}
                        width={112}
                        src={`/img_dishes/${nameImgList[0].url}`}
                        alt={nameImgList[0].name}
                    />
                </div>
            }
            <div className={styles.dish__desc}>
                <p>{dish.compound}</p>
            </div>
        </div>
    )
})

export default ImgView;
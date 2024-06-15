import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap';
import { imgNameParser } from "@/lib/imgParser";
import { Dish } from "@prisma/client";
import { memo } from 'react';
import Image from "next/image";
import styles from "./styles.module.scss";

interface IImgView {
    dish: Dish,
    mod: string
}

const ImgView = memo(function ImgView({ dish, mod }: IImgView) {
    const nameImgList = imgNameParser(dish);

    return (
        <div className={styles.dish__img_wrapper}>
            {nameImgList.length > 1 ?
                <div className={styles.dish__caruosel}>
                    <Carousel interval={null} variant="dark">
                        {nameImgList.map((img, index) => (
                            <CarouselItem key={index}>
                                <div className={styles.dish__img}>
                                    <Image
                                        height={140}
                                        width={140}
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
                </div>
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
            {mod === "default" &&
                <div className={styles.dish__desc}>
                    <p>{dish.compound}</p>
                </div>
            }
        </div>
    )
})

export default ImgView;
"use client"

import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import styles from "./styles.module.scss";

export default function MapService({ apikey }: { apikey: string }) {
    return (
        <YMaps query={{ apikey }}>
            <Map
                className={styles.mapBody}
                state={{
                    center: [54.938105, 58.810548],
                    zoom: 16,
                    controls: [],
                }}
            >
                <Placemark geometry={[54.938389, 58.810628]} />
                <ZoomControl options={{ float: "right" } as any} />
            </Map>
        </YMaps>
    )
};
'use client'

import { useState } from "react";
import { fetchTelegram } from "../../services/telegram"; 
import styles from "./page.module.css";

export default function Home() {
    const [text, setText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleSend = async () => {
        const send = {
            chat_id: 415893733,
            text: text
        }
        const message = await fetchTelegram(send);
        console.log('message', message);
        
    }


    return (
        <main className={styles.main}>
            <div>{text}</div>
            <input type="text" onChange={handleChange}/>
            <button onClick={handleSend}>send bot</button>
        </main>
    );
}

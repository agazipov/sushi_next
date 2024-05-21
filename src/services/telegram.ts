export async function fetchTelegram(message: string) {
    const bodyParser = {
        chat_id: 0,
        text: message,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Подтвердить',
                        callback_data: "order_success"
                    },
                ], [
                    {
                        text: 'Отменить',
                        callback_data: "order_cancel"
                    }
                ]
            ]
        }
    }


    // BOT_TOKEN
    const response = await fetch(`https://api.telegram.org/bot${'123'}/sendMessage`, {
        //   next: { tags: ["config"] },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(bodyParser)
    });
    const telegram = await response.json();

    return telegram;
}
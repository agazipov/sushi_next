export async function fetchTelegram(message: string, chat: string, bot: string) {
    const bodyParser = {
        chat_id: chat,
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

    const response = await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyParser)
    });
    const result = await response.json();
    return result;
}
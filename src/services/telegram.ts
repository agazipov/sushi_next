export async function fetchTelegram(message: any) {
    const response = await fetch("https://api.telegram.org/bot7180326823:AAGaFuKbSjmx3m_5hSsXF-qFCt6tfUtNNM8/sendMessage", {
        //   next: { tags: ["config"] },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(message)
    });
    const telegram = await response.json();

    return telegram;
}
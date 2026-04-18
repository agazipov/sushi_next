export async function fetchVK(message: string, userId: number, accessToken: string) {
    const bodyParser = {
        access_token: accessToken,
        user_id: userId,
        message: message,
        random_id: Date.now(), // уникальный ID для предотвращения дублей
        v: '5.199' // версия API
    }

    const response = await fetch(`https://api.vk.com/method/messages.send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(bodyParser)
    });
    
    const result = await response.json();
    
    // Проверка на ошибки VK API
    if (result.error) {
        console.error('VK API Error:', result.error);
        throw new Error(`VK Error: ${result.error.error_msg}`);
    }
    
    return result;
}
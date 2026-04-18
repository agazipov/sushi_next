export async function fetchVK(message: string, userId: string, accessToken: string) {
    // VK API принимает параметры как application/x-www-form-urlencoded, не JSON.
    // Иначе сервер не разбирает тело и возвращает ошибку (в Postman часто уже выбран нужный тип).
    const body = new URLSearchParams({
        access_token: accessToken,
        user_id: String(userId),
        message,
        random_id: String(Date.now()),
        v: '5.199',
    });

    const response = await fetch('https://api.vk.com/method/messages.send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: body.toString(),
    });
    
    const result = await response.json();
    
    // Проверка на ошибки VK API
    if (result.error) {
        console.error('VK API Error:', result.error);
        throw new Error(`VK Error: ${result.error.error_msg}`);
    }
    
    return result;
}
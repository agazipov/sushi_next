export async function fetchWhatsApp(
    message: string,
    chat: string,
    apiUrl: string,
    idInstance: string,
    apiTokenInstance: string
) {
    const bodyParser = {
        chatId: `${chat}@g.us`,
        message: message,
    }
    console.log('chat', chat);
    
    const URL = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyParser)
    });
    const result = await response.json();
    return result;
}
export default function processResForStock(message: string) {
    let result = "";
    switch (message) {
        case "file create":
            result = "Акция успешно создана";
            break;
        case "file created, picture not recorded":
            result = "Ацкия создана, картинка не перезаписана";
            break;
        case "picture name is taken":
            result = "Измените название картинки";
            break;
        case "file update":
            result = "Акция успешно изменена";
            break;
        case "file update, picture exist":
            result = "Акция изменена с той-же картинкой";
            break;
        case "file update, picture not recorded":
            result = "Акция изменена, картинка не перезаписана";
            break;
        case "file delete":
            result = "Акция удалена";
            break;
        case "file delete, picture not found":
            result = "Акция удалена, картинка не найдена";
            break;
        case "file delete, picture was not deleted":
            result = "Акция удалена, ошибка при удалении картинки";
            break;
        case "request processing error":
            result = "Что-то пошло не так";
            break;
        default:
            result = "Непредвиденный результат("
            break;
    }
    return result;
}
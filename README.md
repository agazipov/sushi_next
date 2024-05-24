В приложении используется UI-kit bootstrap и модули css.
В качестве стейт-менеждера: redux-toolkit.
Для авторизации применяется nextAuth.
Все данные содержатся в БД SQlite3 и интегрируются через ОРМ Prisma.


## Структура приложения

1. lib      - вспомогательне функции приложения
2. prisma   - файлы БД
3. public   - статика (картинки)
4. src      - основной каталог проекта
5. styles   - глобальные стили


## Структура директории src

1. app          - роуты
2. components   - компоненты страниц (компоненты разделены на две директории: admin и shop)
3. context      - обертки провайдеров
4. services     - api для запросов
5. types        - типы используемыые в приложении (основные типы сгенерированы из схемы БД)
6. middleware   - доступность приложжения от nextAuth


## Роутинг в app

Прилоение разделено на две части: админку(admin) и магазин(shop). 
1. shop     
    - Магазин предназначен для клиентов и предстовляет собой систему быстрых заказов. 
    Заказ отправляется диспетчеру в ТГ-бот. Возможно расширение функционала добавлением возможности быстрой покупки.
    Роут магазина не индексируется (взят в ()), для отображения его по пути "/". 
2. admin    
    - Админка необходима для редактирования меню и акции магазина. Доступ реализован с помощью nextAuth.
3. api     
    - В директории api роуты для запросов из админки и файлы библиотеки nextAuth.
4. lib
    - В директории lib файлы стейт-менеджера redux. Он используется для работы корзины и обработки заказов.
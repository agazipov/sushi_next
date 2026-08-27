/* eslint-disable react/no-unescaped-entities */
"use client"

import { Button } from 'react-bootstrap';
import { MetricOrder } from "@prisma/client";
import PasswordChange from "../PasswordChange/PasswordChange";
import { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { resetMetrickOrder } from '@/src/services/metric';

export default function AdminHome({ metric }: { metric: MetricOrder }) {
    const [view, setView] = useState('');

    return (
        <div className={classNames(styles.root, "container")}>
            <p>Здравствуйте, администратор. <br />Добро пожаловать на страницу управления вашим приложением "Рыба&Рис"!</p>
            <div className={styles.metric}>
                <h4>Статистика приложения</h4>
                <p>Заказано на сумму: {metric.price} ₽</p>
                <p>Заказано блюд: {metric.countDishes}</p>
                <p>Всего заказов: {metric.allOrders}</p>
            </div>
            <div className={styles.btn_group}>
                <Button
                    variant="info"
                    className='mb-3'
                    onClick={() => setView(prev => prev !== "info" ? "info" : "")}
                >Информациия</Button>
                <Button
                    variant="info"
                    className='mb-3'
                    onClick={() => setView(prev => prev !== "setting" ? "setting" : "")}
                >Сменить пароль</Button>
                <Button
                    variant="info"
                    className='mb-3'
                    onClick={() => resetMetrickOrder()}
                >Сбросить статистику</Button>
            </div>
            {view === "info" && <div className={styles.rulse}>
                <div>
                    <h5>Изменение и добавление блюд</h5>
                    <p>Для изменения или добавления блюда перейдите в интересующую вас категорию и выберите опцию "Изменить" для редактирования или нажмите кнопку "Добавить блюдо" для создания нового блюда. В открывшейся форме заполните необходимые поля. Для того, чтобы назначить акцию для блюда, напишите условия акции в поле "Акция". Все блюда с установленными акциями будут помечены в списке звездочкой. Для удаления акции оставьте поле "Акция" пустым. </p>
                    <p><u>Обратите внимание!</u> Пункт "Вариант" необходим для указания варианта порции по умолчанию. Если вы не указываете цену для большой порции, необходимо переключить поле вариант на среднюю порцию, иначе в магазине данная позиция будет отображаться не корректно.</p>
                </div>
                <div>
                    <h5>Изменение и добавление картинок у блюд</h5>
                    <p>В форме блюда можно загрузить jpeg, png или webp — сервер сам сделает webp и уменьшит картинку. Несколько файлов склеятся через "/" и в магазине станут каруселью. Текстовое поле с именем файла тоже можно заполнить вручную: все названия есть во вкладке "Галерея". Для подписей на слайдере в поле "Состав" перечислите названия через запятую после "Включает: ". Пример — в категории "Сеты".</p>
                </div>
                <div>
                    <h5>Удаление блюд</h5>
                    <p>Удаление блюд выполняется на вкладке необходимой вам категории, выбором опции "Удаление".</p>
                </div>
                <div>
                    <h5>Добавление и удаление картинок в галерею</h5>
                    <p>Картинки загружаются из форм блюд и акций. Удаление — на вкладке "Галерея". CyberDuck по-прежнему можно использовать: это тот же бакет. Имена лучше указывать латиницей. Фон сервер не убирает.</p>
                </div>
                <div>
                    <h5>Редактирование акции</h5>
                    <p>Редактирование акций осуществляется на вкладке "Акции" заполнением необходимых полей. Поле "Отображение на сайте" показывает или скрывает акцию на главной странице магазина. Картинку можно загрузить прямо в форме. Для переносов в описании используйте разделитель "\n" (без кавычек).</p>
                </div>
            </div>}
            <div className={styles.setting}>
                {view === "setting" && <PasswordChange setView={setView} />}
            </div>
        </div>
    );
}
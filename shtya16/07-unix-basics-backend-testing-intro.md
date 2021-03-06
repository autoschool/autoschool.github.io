## Тестирование бэкенда. Практика

[Презентация](https://speakerdeck.com/alexvox/ru-backend-testing-intro)

### Описание API

Документация API Weather лежит здесь: [Weather Application API documentation](http://weather.lanwen.ru/api.html)

### Настройка

Чтобы делать запросы с помощью `curl`, вам нужно:

* Установить `VirtualBox`. Дистрибутив лежит в папке `"ШАТ"` на Рабочем столе. Все настройки оставляем по умолчанию.
* Запустить `VirtualBox`, в меню `"Машина - Добавить"` выбрать файл виртуалки `"Рабочий стол\ШАТ\VirtualBox VMs\ubuntu\ubuntu"` и нажать `"Открыть"`.
* В окне `VirtualBox` выбираем появившуюся виртуалку и нажимаем кнопку `"Запустить"`.
* После старта `Ubuntu` открываем в ней `Терминал`, в котором делаем все запросы.   

### Задание

* Опираясь на документацию по API, придумать и сделать на виртуалке запросы с различными параметрами к бэкенду погодного сервиса, необходимые и достаточные чтобы его протестировать. 
* Записать полученные вами проверки в [TMS](https://testpalm-school.yandex-team.ru/) в виде набора тест-кейсов. 

Напомнить себе, как работать с кейсами в TMS можно в [Описании предыдущего практического задания](https://github.com/autoschool/autoschool.github.io/blob/master/shtya16/06-intro-in-testing-web-interfaces.md)

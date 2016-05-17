# Ваш первый автотест мобильного приложения

### Презентация

 [Слайды](https://speakerdeck.com/d0lfin/avtomatizatsiia-tiestirovaniia-mobil-nykh-prilozhienii)

### Практика

#### Настраиваем окружение

1. Устанавливаем [Ansible](https://www.ansible.com) `sudo apt-get install ansible -y`
2. Скачиваем "playbook" для настройки окружения `wget http://autoschool.github.io/files/install-appium-environment.yml`
3. Выполняем "playbook" `ansible-playbook -i "127.0.0.1," install-appium-environment.yml -k -K`
4. Перезаходим в систему, чтобы обновились значения глобальных переменных системы
5. Устанавливаем [Appium](http://appium.io/) `npm i appium@1.4.16`, появится каталог **node_modules**
6. Проверяем корректность устрановки `node node_modules/appium/bin/appium-doctor.js --android`
6. Запускаем сервер `node node_modules/appium/bin/appium.js`
7. В соседней вкладке выполняем `android avd` и запускаем эмулятор

#### Работаем с инспектором интерфейса приложения

8. Скачиваем тестируемое приложение `wget http://autoschool.github.io/files/ya-metro.apk`
9. Устанавливаем приложение на эмулятор `adb install ya-metro.apk`
10. Запускаем приложения **Яндекс.Метро** на эмуляторе
11. Запускаем инспектор `uiautomatorviewer` и нажимаем в интерфейсе на кнопку "Device Screenshot"
12. Изучаем атрибуты элементов (нам пригодятся **class** и **resource-id**)

#### Дорабатываем имеющийся репозиторий

Работаем с репозиторием [practice2016](https://github.com/autoschool/practice2016/)

13. Создаем новую ветку
14. В **steps-module**, рядом с `ru.qatools.school.rules.WebDriverRule` создаем подобное правило `ru.qatools.school.rules.MobileDriverRule`,  
    в котором **driver** будет инициализироваться следующим образом:  
```java
DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
desiredCapabilities.setCapability("platformName", "Android");
desiredCapabilities.setCapability("deviceName", "Android");
desiredCapabilities.setCapability("app", "http://autoschool.github.io/files/ya-metro.apk");
desiredCapabilities.setCapability("appWaitActivity", "ru.yandex.metro.MainActivity");
driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub"), desiredCapabilities);
```

15. В **steps-module** cоздаем пакет `ru.qatools.school.screens`, аналогичный `ru.qatools.school.pages`. В нем будут описания двух экранов 
    приложения: `MainScreen.java` и `SelectStationScreen.java`
16. В **steps-module** в пакете `ru.qatools.school.steps` необходимо создать каталог `mobilesteps`, в котором будет содержаться класс 
    с описанием степов для работы с приложением
17. В **commons-module** создаем пакет `ru.qatools.school.mobiletests`, в котором будет располагаться класс с тестом

#### Пишем тест

Не забудьте про новое правило **MobileDriverRule**, а для поиска элементов экрана используйте селекторы **className** и **id**

Сценарий.

    1. Тапаем по полю ввода начальной станции
    2. В поле поиска станции вводим текст "Arbatskaya"
    3. Тапаем по первому результату поиска
    4. Тапаем по полю ввода конечно станции
    5. В поле поиска станции вводим текст "Borisovo"
    6. Тапаем по первому результату поиска
    7. Проверяем, что время в пути превышает 10 минут
    
#### Сохраняем

18. Закоммитить и запушить все это дело в GitHub
19. Создать пулл-реквест в основной репозиторий из интерфейса GitHub
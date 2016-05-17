# Ваш первый автотест мобильного приложения

### Презентация

 [Слайды](https://speakerdeck.com/d0lfin/avtomatizatsiia-tiestirovaniia-mobil-nykh-prilozhienii)

### Практика

#### Настраиваем окружение (Ubuntu)

1. Устанавливаем [Ansible](https://www.ansible.com) `sudo apt-get install ansible -y`
2. Скачиваем "playbook" для настройки окружения `wget http://autoschool.github.io/files/install-appium-environment.yml`
3. Выполняем "playbook" `ansible-playbook -i "127.0.0.1," install-appium-environment.yml -k -K`
4. Перезаходим в систему, чтобы обновились значения глобальных переменных системы
5. Устанавливаем [Appium](http://appium.io/) `npm i appium@1.4.16`, появится каталог **node_modules**
6. Проверяем корректность устрановки `node node_modules/appium/bin/appium-doctor.js --android`
7. Запускаем сервер `node node_modules/appium/bin/appium.js`
8. В соседней вкладке выполняем `android avd` и запускаем эмулятор

#### Настраиваем окружение (Windows)

1. Скачиваем и устанавливаем [Android SDK](https://dl.google.com/android/installer_r24.4.1-windows.exe)
2. Установить [Intel HAXM](https://software.intel.com/sites/default/files/managed/dd/21/haxm-windows_v6_0_1.zip)
3. Открываем **Android SDK Manager**, нажимаем **Deselect All** и выбираем "Android SDK Tools", 
   "Android SDK Platform-tools" и "Android SDK Build-tools"; **Android 4.4.2 (API19)**: Intel x86 Atom System Image, ARM EABI v7a System Image, SDK Platform;
   **Extras:** Intel x86 Emulator Accelerator
4. В пункте меню **Tools** выбираем **AVD Manager** и создаем с помощью него новое устройство (Nexus 4, No skin). 
   Если в пункте 2 HAXM успешно установился, то создаем и запускаем эмулятор с архитектурой x86, иначе arm
5. Скачиваем и запускаем [Appium](https://bitbucket.org/appium/appium.app/downloads/AppiumForWindows_1_4_16_1.zip) 
   (необходим .NET Framework 4.5)

#### Работаем с инспектором интерфейса приложения (Ubuntu)

1. Скачиваем тестируемое приложение `wget http://autoschool.github.io/files/ya-metro.apk`
2. Устанавливаем приложение на эмулятор `adb install ya-metro.apk`
3. Запускаем приложения **Яндекс.Метро** на эмуляторе
4. Запускаем инспектор `uiautomatorviewer` и нажимаем в интерфейсе на кнопку "Device Screenshot"
5. Изучаем атрибуты элементов (нам пригодятся **class** и **resource-id**)

#### Работаем с инспектором интерфейса приложения (Windows)

1. Скачиваем тестируемое [приложение](http://autoschool.github.io/files/ya-metro.apk)
2. В интерфейсе Appium кликаем на иконку с роботом ставим галку в чекбоксе **Application Path** и выбираем скаченное приложение
3. На том же экране настроек прописываем путь **SDK Path**: C:\Users\username\AppData\Local\Android\android-sdk (или тот что указали при установке)
4. Прописываем любое значение в поле **Device name**
5. Кликаем по иконке с изображением человека и в **Custom Server Flags** прописываем `--command-timeout "20000"`
6. Нажимаем на кнопку запуска и следом на кнопку с "Лупой"
7. Изучаем атрибуты элементов (нам пригодятся **class** и **resource-id**)

#### Дорабатываем имеющийся репозиторий

Работаем с репозиторием [practice2016](https://github.com/autoschool/practice2016/)

1. Создаем новую ветку
2. В **steps-module**, рядом с `ru.qatools.school.rules.WebDriverRule` создаем подобное правило `ru.qatools.school.rules.MobileDriverRule`,  
    в котором **driver** будет инициализироваться следующим образом:  
```java
DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
desiredCapabilities.setCapability("platformName", "Android");
desiredCapabilities.setCapability("deviceName", "Android");
desiredCapabilities.setCapability("app", "http://autoschool.github.io/files/ya-metro.apk");
desiredCapabilities.setCapability("appWaitActivity", "ru.yandex.metro.MainActivity");
driver = new RemoteWebDriver(new URL("http://127.0.0.1:4723/wd/hub"), desiredCapabilities);
```

3. В **steps-module** cоздаем пакет `ru.qatools.school.screens`, аналогичный `ru.qatools.school.pages`. В нем будут описания двух экранов 
    приложения: `MainScreen.java` и `SelectStationScreen.java`
4. В **steps-module** в пакете `ru.qatools.school.steps` необходимо создать каталог `mobilesteps`, в котором будет содержаться класс 
    с описанием степов для работы с приложением
5. В **commons-module** создаем пакет `ru.qatools.school.mobiletests`, в котором будет располагаться класс с тестом

#### Пишем тест

Не забудьте про новое правило **MobileDriverRule**, а для поиска элементов экрана используйте селекторы **className** и **id**. 
Для того чтобы тест запустился у вас должен быть запущен сервер **Appium** и подключен телефон или эмулятор.

Сценарий.

    1. Тапаем по полю ввода начальной станции
    2. В поле поиска станции вводим текст "Arbatskaya"
    3. Тапаем по первому результату поиска
    4. Тапаем по полю ввода конечно станции
    5. В поле поиска станции вводим текст "Borisovo"
    6. Тапаем по первому результату поиска
    7. Проверяем, что время в пути превышает 10 минут
    
#### Сохраняем

1. Закоммитить и запушить все это дело в GitHub
2. Создать пулл-реквест в основной репозиторий из интерфейса GitHub
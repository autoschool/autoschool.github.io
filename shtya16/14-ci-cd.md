# Инструменты непрерывной интеграции

### Презентация

 [Слайды](https://speakerdeck.com/pleskav/cd-lecture)

### Практика

#### Что нужно сделать?

Создать задачу, которая будет делать следующее
- клонировать код из репозитория https://github.com/autoschool/practice2016.git
- запускать системные автотесты
- строить отчет c помощью Allure Jenkins Plugin

#### Шаги (Windows)

1. Скачиваем jenkins.war с https://jenkins.io
2. Запускаем дженкинс
`java -Dhudson.model.DirectoryBrowserSupport.CSP="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" -Djenkins.model.DirectoryBrowserSupport.CSP="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" -jar jenkins.war --httpPort=9090`

3. Добавляем плагины `Allure Jenkins Plugin` , `Git plugin`
и настраиваем  [Allure Jenkins Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Allure+Plugin)

4. Создаем задачу
Задачу нужно научить делать следующее
- клонировать код из репозитория `https://github.com/autoschool/practice2016.git`
- запускать системные автотесты mvn clean test
- строить отчет c помощью `Allure Jenkins Plugin`
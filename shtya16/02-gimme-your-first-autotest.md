## Даешь свой первый автотест!

### Слайды:
- [Презентация](https://speakerdeck.com/lanwen/ru-gimme-your-first-autotest)

### Практика:

#### Скачиваем

1. Поставить инструментарий - IDEA, maven, git, java
2. Форкнуть к себе репозиторий (в ветке **step-1**) [practice2016:step-1](https://github.com/autoschool/practice2016/tree/step-1) и склонировать форк
3. Создать ветку 

#### Правим

4. Создать новый модуль с названием `commons-module`
5. Создать зависимость модуля `commons-module` на модуль `steps-module` 

```xml
<dependency>
    <groupId>ru.qatools.school</groupId>
    <artifactId>steps-module</artifactId>
    <version>${project.version}</version>
</dependency>
```

6. Переместить тестовый класс в новый модуль в полностью аналогичное положение (в папку `test` под тем же пакетом)
7. Добавить общую зависимость (в родительский *pom.xml*) на `junit` версии `4.12` (см. junit.org)
8. Добавить в класс степов метод, верифицирующий текущее положение через `assertThat`
9. Добавить содержимому тестового класса необходимых деталей

#### Сохраняем

10. Закоммитить и запушить все это дело в GitHub
11. Создать пулл-реквест в основной репозиторий из интерфейса GitHub

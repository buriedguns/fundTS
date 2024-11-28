## Структура проекта

    .
    ├── models  # Модели данных
    ├── pages   # POM со страницами, элементами и общими методами
    └── tests   # тесты

## Установка и запуск

Для успешного запуска тестов и просмотра отчетов на вашей машине должны быть установлены:

- [NodeJS](https://nodejs.org/en/download/package-manager)
- [Allure](https://allurereport.org/docs/install/)

### Ставим зависимости:

```shell
npm install
```

### Запускаем тесты:

```shell
npx playwright test
```

Тесты запустятся в параллель, как в browser, так и mobile view

После прогона будет сгенерирова allure отчет

### Смотрим отчет о пройденных тестах:

```shell
allure serve ./allure-results
```

Если тест упадет, то к отчету будет приложет скриншот в момент падения

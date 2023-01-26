# Платформа-визитница VISITKI
Задание в рамках проектного месяца для студентов курса «Веб-разработчик плюс» - создать внутренний сервис, который сделает эту практику самопрезентации студентов удобной и интерактивной: студенты будут публиковать свои визитки, давать обратную связь и изучать визитки друг друга.
Инициализация выполнена с помощью [Create React App](https://github.com/facebook/create-react-app).

## Основная функциональность
1. Заполнение собственной визитки.
2. Просмотр всех визиток когорты.
3. Просмотр детальной версии визитки.
4. Комментирование (или реакция эмоджи) визитки целиком или отдельных её блоков.
5. Просмотр комментариев (реакций) на свою визитку (недоступно другим студентам).
6. Пост-модерация реакций (для кураторов).

## Описание проекта
Неавторизованный пользователь видит только страницу авторизации.
После авторизации через Яндекс ID пользователь попадает на страницу, соответствующую его роли:
1. Если это студент, он попадает на главную страницу с визитками студентов своей когорты. Роут — `/`.
2. Если это куратор, его переадресует на главную страницу админки для модерирования комментариев. Роут — `/admin/`.

### Страница с детальной информацией
Отображение визитки студента с личной информацией, варианты оформления: “серьезный”, “дерзкий”, “романтичный”. Есть возможность комментирования и реагирования. Роут - `/detailinfo/:id`.
### Страница профиля
На странице профиля студент может заполнить или изменить информацию о себе. Роут - Роут — `/profile`.
### Страница карты
На странице карты используется [встроенная Яндекс Карта](https://yandex.ru/dev/maps/jsapi/). Роут — `/map`.
### Административная страница: модерирование комментариев
Главная страница админки для кураторов, на которой они могут видеть список всех комментариев, фильтровать их по имени отправителя, получателя и номеру когорты, удалять те, что нарушают правила. Роут - `/admin`.
### Административная страница: управление когортами
Дополнительная страница админки для кураторов, на которой они могут видеть список всех студентов, удалять студента. Роут - `/admin/users`.
Можно фильтровать список и изменять на месте отдельные профили (только email и номер когорты). Если студент уже авторизовывался и заполнял свой профиль, будет отображаться имя, по нажатию на которое куратор может перейти на страницу детальной информации студента.
Данные когорт могут быть загружены массово в виде CSV или XLSX файлов.


## Макеты и описания страниц
[Макет в Фигме](https://www.figma.com/file/nKBudPP12bvNm15W486Y9R/WEB_RUS_STUD_soft_skills?node-id=36%3A4&t=uygCRuNlobmHjz43-0)

## Схема и заглушка для API
В работе изпользовалась заглушка https://visitki.practicum-team.ru/api



In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

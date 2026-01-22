# Практическая работа

[Макет](<https://www.figma.com/design/dH8CEXUS49cXV2ESnwnnIP/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0-%D0%B4%D0%BB%D1%8F-Stellar-Burgers?node-id=0-1&p=f&t=cMDukS9WxSq5cryx-0>)


# Запуск приложения:

1. Выполнить команду `npm install`.


## Этапы работы (Выполнено):

1. Разверните проект и ознакомьтесь с кодом. Вам предстоит работать с компонентом `form`, находящимся в `src/components`

2. Попробуйте запустить тесты командой `npm run test` и убедитесь, что они не проходят.

3. Попробуйте запустить интеграционные тесты командой `npm run cypress`, выберите `component testing`, затем браузер (например, Chrome) и затем файл с тестами `contentForm.cy.tsx`. Убедитесь, что тесты не проходят.

4. Добавьте необходимую функциональность. Для удобства вы можете смотреть в код тестов, чтобы видеть, что они ожидают и что именно не так. Ваша задача - написать всю функциональность, чтобы все тесты прошли успешно.

## Текущая реализация :

1. Внесены изменения в файл компонента из библиотеки: `index.js`, находящийся в `node_modules\@ya.praktikum\react-developer-burger-ui-components\dist\index.js`.

2. Был добавлен стиль `input_status_all_valid`, находящийся в `node_modules\@ya.praktikum\react-developer-burger-ui-components\dist\ui`. Стиль применяется если каждое поле формы валидно.

3. Описаны типы для нового пропса `allValid` компонента `input` в файле `input.d.ts` находящийся в `node_modules\@ya.praktikum\react-developer-burger-ui-components\dist\ui`.

4. Добавлен патч `@ya.praktikum+react-developer-burger-ui-components+1.14.0.patch` находится в `/patches`.
  Сравнивает содерижимое папки `node-modules` и обновляет только те файлы которые были модифицированы автором этой работы.

5. Добавлена команда `"postinstall": "patch-package"` автовыполнения патча в поле `"scripts"` в файле `package.json`.

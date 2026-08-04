CUT

### Современный сайт московского барбершопа

Точная форма · Персональный стиль · Спокойная атмосфера

[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

![Превью CUT](https://raw.githubusercontent.com/vbnmsa/CUT/main/public/cut-hero.png)

## О проекте

CUT — адаптивный сайт барбершопа в центре Москвы. Пользователь может изучить услуги и специальные предложения, подобрать мастера, выбрать удобные дату и время, а затем оформить онлайн-запись.

Проект объединяет выразительную типографику, тёмную визуальную систему и подробный пользовательский сценарий — от знакомства с барбершопом до подтверждения визита.

## Возможности

- адаптивный интерфейс для компьютеров, планшетов и телефонов;
- каталог стрижек, ухода и дополнительных услуг;
- выбор услуги с отображением цены и продолжительности;
- карточки пяти барберов с опытом, специализацией и рейтингом;
- выбор мастера, даты и доступного времени;
- онлайн-запись с контактными данными клиента;
- специальные предложения и проверка условий скидки;
- подарочные сертификаты;
- отзывы клиентов и раздел FAQ;
- плавная навигация, интерактивные элементы и hero-анимация;
- маска и проверка номера телефона;
- отдельные проверки безопасности и поиск секретов в коде.

## Технологии

- React 19;
- TypeScript;
- Vite 8;
- Tailwind CSS 3;
- Lucide React;
- PostCSS и Autoprefixer;
- CSS-анимации и адаптивная верстка.

## Структура

```text
CUT/
├── public/               # изображения, видео и заголовки безопасности
├── scripts/              # проверки безопасности
├── src/
│   ├── App.tsx           # интерфейс и логика приложения
│   ├── main.tsx          # точка входа
│   └── *.css             # компоненты, секции и адаптивные стили
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Публикация

Проект можно опубликовать на Vercel, Cloudflare Pages или другом сервисе статического хостинга.

Параметры сборки:

```text
Build command: pnpm build
Output directory: dist
```

## Безопасность

Правила сообщения об уязвимостях описаны в [SECURITY.md](SECURITY.md). Результаты внутренней проверки находятся в [SECURITY_AUDIT.md](SECURITY_AUDIT.md).

## Автор

[vbnmsa](https://github.com/vbnmsa)

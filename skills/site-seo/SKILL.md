---
name: site-seo
description: Доводит сайт до находимости — meta-теги, Open Graph и Twitter-карточки, JSON-LD разметка, sitemap.xml, robots.txt, canonical, alt и иерархия заголовков. Используй перед деплоем лендинга, портфолио, промо-страницы или магазина, чтобы страница нормально выглядела в поиске и при расшаривании. Без скриптов и API — правит HTML напрямую. Работает в связке с site-director (процесс) и site-quality (ворота).
metadata:
  author: Sergey Yelpin
  version: 1.0.0
  part-of: site-studio
---

# site-seo — находимость сайта

> Часть сборника **site-studio**. Вызывается site-director перед деплоем.

Красивый сайт, который нельзя найти и который уродливо разворачивается в мессенджере, — недоделан. `site-seo` закрывает SEO-основу без тяжести: **чек-лист + шаблоны, никаких скриптов и API.** Читаешь HTML, сверяешь, правишь файлы. Прогоняй перед деплоем; после — обнови sitemap и отправь в Search Console.

## Meta — на каждой странице своё

- [ ] `<title>` — уникальный, 50–60 символов, суть + бренд. Не «Главная».
- [ ] `<meta name="description">` — 140–160 символов, живая, с призывом. Не дублировать между страницами.
- [ ] `<link rel="canonical">` — абсолютный URL страницы. Против дублей.
- [ ] `<html lang="…">` выставлен верно.
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">`.

## Расшаривание — Open Graph + Twitter

Без них ссылка в Telegram/WhatsApp/LinkedIn — голый URL. Обязательно:

```html
<meta property="og:title"       content="…">
<meta property="og:description" content="…">
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://site.tld/">
<meta property="og:image"       content="https://site.tld/og.jpg"> <!-- 1200×630, < 1 МБ, абсолютный URL -->
<meta name="twitter:card"       content="summary_large_image">
```

- [ ] `og:image` реально существует, 1200×630, абсолютный путь (не относительный).

## Структурированные данные — JSON-LD

Одна разметка под тип страницы, в `<head>`:

- **Портфолио/личный сайт:** `Person` + `WebSite`.
- **Проект/кейс:** `CreativeWork`.
- **Компания/лендинг:** `Organization` + `WebSite`.
- **Магазин:** `Product` + `Offer` (цена, наличие).

```html
<script type="application/ld+json">
{ "@context":"https://schema.org", "@type":"Person",
  "name":"…", "url":"https://site.tld/", "jobTitle":"…", "sameAs":["…"] }
</script>
```

- [ ] Валидна (проверить в Rich Results Test), поля заполнены реальными данными.

## Инфраструктура — sitemap + robots

**`robots.txt`** в корне:
```
User-agent: *
Allow: /
Sitemap: https://site.tld/sitemap.xml
```

**`sitemap.xml`** — все реальные URL с `<lastmod>`. Для лендинга — хотя бы один `<url>`.

- [ ] Оба доступны по прямой ссылке, URL абсолютные и живые.

## Контент и техника

- [ ] Один `<h1>` на страницу; заголовки идут по уровням, без прыжков h1→h3.
- [ ] У всех значимых картинок — осмысленный `alt` (не имя файла).
- [ ] Внутренние ссылки не битые; внешние — по делу.
- [ ] Всё по HTTPS; смешанного контента нет.
- [ ] `loading="lazy"` на некритичных картинках (перф — за site-quality).

## После деплоя

- [ ] Sitemap отправлен в Google Search Console.
- [ ] Расшаривание проверено (og-превью реально рисуется).

## Связка

Вызывает **site-director** перед шагом деплоя. Не спорь с **site-quality**: находимость не оправдывает дешевизну — если ради SEO лезет мусорный текст или сдвиги, режь текст, а не правила. `site-seo` — про «нашли и кликнули», а не «напихали ключей».

# Site Studio

**🇷🇺 Русский** · [🇬🇧 English](README.en.md)

**Skills для Claude Code, которые собирают сайты уровня студии, а не AI-шаблона.**

![License](https://img.shields.io/badge/license-MIT-green)
![Skills](https://img.shields.io/badge/skills-4-blue)
![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-8A2BE2)

Один плагин, четыре связанных скилла и референс-библиотека. Каждый скилл срабатывает сам, но работают они как один конвейер: дирижёр ведёт процесс и в нужный момент вызывает движение, ворота качества и SEO. В основе — правила против «дешёвого» результата из практики, а не абстрактные гайдлайны.

Скиллы — **дирижёры, а не «мышцы»**. Реальную генерацию вкуса, компонентов и картинок делают внешние инструменты (UI UX Pro Max, встроенный `frontend-design`, 21st.dev, GSAP, Spline). Задача сборника — держать уровень и порядок.

## Состав

| Скилл | Роль | Отвечает за |
|---|---|---|
| **site-director** | дирижёр · точка входа | процесс от концепта до деплоя, спецификация `DESIGN.md`, вызов остальных, режим rebuild |
| **site-motion** | движение | анимация на GSAP с мерой (2–3 точки, easing, scroll, reduced-motion) |
| **site-quality** | ворота качества | токены, состояния, WCAG 2.2, формы, UX-тексты, Core Web Vitals, анти-дёшево |
| **site-seo** | находимость | meta, Open Graph, JSON-LD, sitemap, robots — без скриптов и API |

## Как это работает

```
                 запрос: «собери лендинг…»
                          │
                          ▼
          ┌──────────── site-director ────────────┐
          │  1. точка зрения                        │
          │  2. DESIGN.md (спец. до кода) ──────────┼─► утверждение словами
          │  3. вкус: UI UX Pro Max / frontend-design
          │  4. реальные изображения                │
          │  5. компоненты → единая сетка           │
          │  6. движение ──────────► site-motion    │  GSAP, 2–3 точки
          │  7. ворота ────────────► site-quality   │  contrast-check.js, CWV
          │  8. находимость ───────► site-seo       │  OG, JSON-LD, sitemap
          │  9. мобайл + деплой (Vercel)            │
          └─────────────────────────────────────────┘
```

Единый источник правды — файл `DESIGN.md`, который `site-director` пишет в корень проекта **до вёрстки**. Он не теряется, когда чат подрезает историю, и правится словами. Референс-библиотека (13 модулей) подгружается только когда доходит до нужного шага, а не висит в контексте.

## Установка

### Claude Code (плагин)

```
/plugin marketplace add Yelpin/ux-ui-design-website
```
```
/plugin install site-studio@yelpin-site-studio
```

Скиллы триггерятся сами. Скрипт `contrast-check.js` доступен по `${CLAUDE_PLUGIN_ROOT}/skills/site-quality/scripts/contrast-check.js`.

### Claude.ai (загрузка скиллов)

Settings → Capabilities → Skills → **Add skill**. Загрузи каждую папку из `skills/` отдельным zip (в архиве `SKILL.md` должен лежать в корне).

### Вручную (любой Claude Code)

Скопируй нужные папки из `skills/` в `~/.claude/skills/`. Каждый скилл самодостаточен.

## Структура

```
ux-ui-design-website/
├── .claude-plugin/
│   ├── plugin.json          # манифест плагина
│   └── marketplace.json     # маркетплейс (для /plugin marketplace add)
├── skills/
│   ├── site-director/       # SKILL.md + references/ ×6
│   ├── site-motion/         # SKILL.md + references/gsap-recipes.md
│   ├── site-quality/        # SKILL.md + references/ ×6 + scripts/contrast-check.js
│   └── site-seo/            # SKILL.md
├── template/                # шаблон нового скилла
├── LICENSE
└── README.md
```

## Референс-библиотека

SKILL.md короткие — глубина вынесена в `references/*.md` и читается по требованию.

- **site-director** — стилевые направления (+ стоп-лист клише), паттерны секций, визуальная система (типо-шкала, 60/30/10, oklch, 8pt), эмоциональный дизайн, адаптив.
- **site-quality** — законы UX и гештальт, доступность WCAG 2.2, формы, UX-письмо, интеракции, воспринимаемая скорость.
- **site-motion** — 7 GSAP-канонов кодом.

Библиотека заточена под сайты и не дублирует вкус-инструмент: это запасной вариант и авторский подход, а не второй каталог палитр.

## Честная граница

Сборник задаёт процесс и уровень. Итог = скиллы + реальные инструменты (UI UX Pro Max, 21st.dev, GSAP) + **твои изображения и бриф на входе**. Без реальных фото и без твоего вкуса даже идеальный процесс даёт средний сайт. Сборник это честно проговаривает, а не обещает магию.

## Лицензия

MIT © 2026 [Sergey Yelpin](https://yelpin.github.io)

> Автор — UX/UI/AI-дизайнер. Скиллы собраны из реальной практики сборки сайтов. Замечания и предложения — через Issues.

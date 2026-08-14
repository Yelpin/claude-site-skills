# GSAP-рецепты — каноны, не копипаста

Готовые скелеты под 2–3 точки движения. Бери нужное, подгоняй тайминг под бренд. Плагины GSAP с 2025 бесплатны.
Всё анимируем только через `transform` и `opacity`. Каждый рецепт глушится под `prefers-reduced-motion`.

## 0. Гейт reduced-motion (оборачивай всё нефункциональное)

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
gsap.registerPlugin(ScrollTrigger, SplitText);

if (!reduce) {
  // ... вся декоративная анимация здесь
} else {
  gsap.set('[data-anim]', { opacity: 1, y: 0 }); // всё сразу видимо, без движения
}
```

## 1. Вход заголовка — SplitText со stagger

```js
const split = new SplitText('.hero h1', { type: 'words' });
gsap.from(split.words, {
  yPercent: 100, opacity: 0, duration: 0.9, ease: 'power4.out',
  stagger: 0.06,
});
```

## 2. Ревил секций — один раз, при входе в кадр

```js
gsap.utils.toArray('[data-reveal]').forEach((el) => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 80%', once: true },
  });
});
```

## 3. Сигнатурный скролл-момент А — параллакс фонового фото

```js
gsap.to('.hero-bg', {
  yPercent: 20, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
});
```

## 4. Сигнатурный скролл-момент Б — горизонтальный pin-скролл галереи

```js
const track = document.querySelector('.gallery-track');
gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.gallery', pin: true, scrub: 1,
    end: () => '+=' + (track.scrollWidth - window.innerWidth),
    invalidateOnRefresh: true,
  },
});
```

## 5. Счётчик цифр вверх (движение со смыслом — показывает результат)

```js
gsap.utils.toArray('[data-count]').forEach((el) => {
  const to = { val: 0 };
  gsap.to(to, {
    val: Number(el.dataset.count), duration: 1.6, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => { el.textContent = Math.round(to.val).toLocaleString(); },
  });
});
```

## 6. Микро — магнитная кнопка (дозированно, для игривых брендов)

```js
const btn = document.querySelector('.magnetic');
btn?.addEventListener('pointermove', (e) => {
  const r = btn.getBoundingClientRect();
  gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3,
                 y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.4 });
});
btn?.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' }));
```

## Тайминги (шпаргалка)
- Появление: `power3.out` / `power4.out`, 0.6–0.9 c.
- Реакция на действие: 0.12–0.2 c.
- `elastic` / `back` — только игривые бренды, редко.
- Скролл-эффекты: `ease: 'none'` + `scrub`.

## Референс-воркфлоу
Нашёл эффект на **madewithgsap.com** → покажи модели → попроси разобрать в приёмы → повтори своим кодом из этих канонов. Чужой пен целиком не копируй.

#!/usr/bin/env node
/**
 * contrast-check.js — проверка контраста по WCAG 2.x. Без зависимостей.
 *
 * Использование:
 *   node contrast-check.js "#111111" "#ffffff"          одна пара (ink на bg)
 *   node contrast-check.js "#111" "#fff" 24              с кеглем в px (крупный ≥ 24px или ≥ 19px bold)
 *   node contrast-check.js --tokens tokens.json          пакетная проверка из файла
 *
 * Формат tokens.json:
 *   [ { "label": "body", "fg": "#333", "bg": "#fff", "size": 16, "bold": false }, ... ]
 *
 * Коды возврата (различай!):
 *   0 — всё прошло AA.
 *   1 — контраст провален → возврат на переделку (ворота site-quality).
 *   2 — ошибка ввода (битый hex, нет файла, кривой кегль) → чини команду, а не палитру.
 */

'use strict';
const fs = require('fs');

function parseHex(hex) {
  let h = String(hex).trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`битый hex: "${hex}"`);
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}

// относительная яркость по WCAG
function luminance([r, g, b]) {
  const lin = c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(fg, bg) {
  const L1 = luminance(parseHex(fg));
  const L2 = luminance(parseHex(bg));
  const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

// крупный текст по WCAG: ≥ 24px обычный или ≥ 18.66px (14pt) bold
function isLarge(size, bold) {
  if (!size) return false;
  return size >= 24 || (bold && size >= 18.66);
}

function evaluate({ label, fg, bg, size, bold }) {
  const r = ratio(fg, bg);
  const large = isLarge(size, bold);
  const aa = large ? 3 : 4.5;
  const aaa = large ? 4.5 : 7;
  return {
    label: label || `${fg} на ${bg}`,
    ratio: Math.round(r * 100) / 100,
    large,
    passAA: r >= aa,
    passAAA: r >= aaa,
  };
}

function print(res) {
  const mark = res.passAA ? '✓' : '✗';
  const grade = res.passAAA ? 'AAA' : res.passAA ? 'AA' : 'FAIL';
  const kind = res.large ? 'крупный' : 'обычный';
  console.log(`${mark} ${String(res.ratio).padEnd(6)} ${grade.padEnd(4)} [${kind}]  ${res.label}`);
  return res.passAA;
}

// Ошибка ввода — код 2, чтобы её нельзя было спутать с провалом контраста (код 1).
function fail(msg) {
  console.error('Ошибка: ' + msg);
  process.exit(2);
}

function readTokens(path) {
  let raw;
  try {
    raw = fs.readFileSync(path, 'utf8');
  } catch (e) {
    fail(e.code === 'ENOENT' ? `файл не найден: ${path}` : `не прочитать ${path}: ${e.message}`);
  }
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail(`битый JSON в ${path}: ${e.message}`);
  }
  if (!Array.isArray(data)) fail(`${path}: ожидается массив объектов [{label,fg,bg,size,bold}]`);
  data.forEach((row, i) => {
    if (!row || !row.fg || !row.bg) fail(`${path}: запись #${i + 1} без обязательных полей fg и bg`);
  });
  return data;
}

function main() {
  const argv = process.argv.slice(2);
  let results = [];

  if (argv[0] === '--tokens') {
    if (!argv[1]) fail('укажи путь: --tokens tokens.json');
    results = readTokens(argv[1]).map(evaluate);
  } else if (argv.length >= 2) {
    const [fg, bg, size] = argv;
    if (size !== undefined && (isNaN(Number(size)) || Number(size) <= 0)) {
      fail(`кегль должен быть положительным числом, получено "${size}"`);
    }
    results = [evaluate({ fg, bg, size: size ? Number(size) : undefined })];
  } else {
    console.error('Использование: node contrast-check.js "#ink" "#bg" [кегль] | --tokens file.json');
    process.exit(2);
  }

  console.log('  ratio  grade [тип]     пара');
  console.log('  ' + '-'.repeat(48));
  const allPass = results.map(print).every(Boolean);
  const failed = results.filter(r => !r.passAA).length;
  console.log('  ' + '-'.repeat(48));
  console.log(allPass ? '  Все пары прошли WCAG AA.' : `  Провалов AA: ${failed}. Правь токены — это ворота site-quality.`);
  process.exit(allPass ? 0 : 1);
}

try {
  main();
} catch (e) {
  // например, битый hex в аргументе или в tokens.json — это ошибка ввода, не провал контраста
  fail(e.message);
}

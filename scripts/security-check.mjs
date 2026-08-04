import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const app = read('src/App.tsx')
const html = read('index.html')
const vite = read('vite.config.ts')
const pkg = JSON.parse(read('package.json'))
const headers = read('public/_headers')

const checks = [
  ['React-код не использует небезопасную HTML-вставку', !/dangerouslySetInnerHTML|\.innerHTML\s*=/.test(app)],
  ['React-код не выполняет динамический JavaScript', !/\beval\s*\(|new\s+Function\s*\(/.test(app)],
  ['Клиент не собирает номер карты или CVC', !/cc-number|cc-csc|cardNumber|setCardNumber|\bcvc\b/i.test(app)],
  ['Клиент не сохраняет персональные или платёжные данные в Web Storage', !/localStorage|sessionStorage/.test(app)],
  ['Карта изолирована sandbox и не получает Referer', /<iframe[^>]+referrerPolicy="no-referrer"[^>]+sandbox=/.test(app)],
  ['HTML запрещает передачу Referer до применения серверных заголовков', /<meta\s+name="referrer"\s+content="no-referrer"\s*\/>/.test(html)],
  ['CSP запрещает встраивание сайта и object-src', /frame-ancestors 'none'/.test(vite) && /object-src 'none'/.test(vite)],
  ['Dev/preview задают раздельные security headers', /server:\s*\{\s*headers:\s*developmentSecurityHeaders\s*\}/.test(vite) && /preview:\s*\{\s*headers:\s*productionSecurityHeaders\s*\}/.test(vite)],
  ['Production CSP не разрешает inline-скрипты', /const productionSecurityHeaders[\s\S]*?script-src 'self';/.test(vite)],
  ['Production-шаблон содержит CSP и HSTS', /Content-Security-Policy:/.test(headers) && /Strict-Transport-Security:/.test(headers)],
  ['Публичные source maps отключены', /sourcemap:\s*false/.test(vite)],
  ['Версии верхнеуровневых зависимостей зафиксированы', !Object.values({ ...pkg.dependencies, ...pkg.devDependencies }).some(value => value === 'latest' || /^[~^*]/.test(value))],
]

const failed = checks.filter(([, ok]) => !ok)
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`)
if (failed.length) process.exit(1)

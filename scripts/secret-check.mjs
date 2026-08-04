import { readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const ignoredDirectories = new Set(['.git', 'node_modules', 'dist', '.pnpm-store', 'coverage'])
const ignoredFiles = new Set(['scripts/secret-check.mjs'])
const textExtensions = new Set([
  '.cjs', '.conf', '.css', '.html', '.ini', '.js', '.json', '.jsx', '.md',
  '.mjs', '.ps1', '.sh', '.toml', '.ts', '.tsx', '.txt', '.yaml', '.yml',
])

const rules = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['GitHub token', /\bgh[opusr]_[A-Za-z0-9_]{30,}\b/],
  ['OpenAI API key', /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ['Stripe live key', /\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{30,}\b/],
  ['Slack token', /\bxox[baprs]-[0-9A-Za-z-]{20,}\b/],
  ['credential in URL', /https?:\/\/[^\s/:]+:[^\s/@]+@/],
  ['hard-coded credential', /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|password)\s*[:=]\s*['"][^'"]{12,}['"]/i],
]

const findings = []

function scan(directory, relative = '') {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = relative ? `${relative}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) scan(join(directory, entry.name), relativePath)
      continue
    }
    if (ignoredFiles.has(relativePath) || !textExtensions.has(extname(entry.name).toLowerCase())) continue

    const content = readFileSync(join(directory, entry.name), 'utf8')
    for (const [rule, pattern] of rules) {
      if (pattern.test(content)) findings.push({ file: relativePath, rule })
    }
  }
}

scan(root)

if (findings.length) {
  for (const finding of findings) console.error(`FAIL ${finding.rule}: ${finding.file}`)
  console.error('Potential secrets found. Values are intentionally not printed.')
  process.exit(1)
}

console.log('PASS No common secret patterns found')

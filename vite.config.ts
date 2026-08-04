import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const productionSecurityHeaders = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://db.onlinewebfonts.com; font-src 'self' data: https://fonts.gstatic.com https://db.onlinewebfonts.com https://*.onlinewebfonts.com; img-src 'self' data: https://images.unsplash.com; frame-src https://www.openstreetmap.org; connect-src 'self' ws: wss:",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '0',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

// React Fast Refresh injects a small inline preamble in development only.
// Production preview and public hosting keep the strict script-src above.
const developmentSecurityHeaders = {
  ...productionSecurityHeaders,
  'Content-Security-Policy': productionSecurityHeaders['Content-Security-Policy'].replace("script-src 'self'", "script-src 'self' 'unsafe-inline'"),
}

export default defineConfig({
  plugins: [react()],
  build: { sourcemap: false },
  server: { headers: developmentSecurityHeaders },
  preview: { headers: productionSecurityHeaders },
})

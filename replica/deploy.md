# Deployment Plan & Production Readiness Checklist: DIU / Apex Replica
Generated: 2026-11-09
Suite: /replica-deploy

## 1. Preflight Verification Gate
- [x] Automated E2E test suite passing (4/4 tests, 100% success).
- [x] Production build generated cleanly with zero errors (`next build` compiled in 9.1s).
- [x] Original asset sweep completed (No copyrighted imagery/logos used; fully clean-room authored code & SVG icons).
- [x] Parity score evaluated: 92% functional alignment with target.

## 2. Deployment Architecture
* **Target Host:** Vercel / Cloud Run / Node.js Host
* **Node Version:** Node.js 20+ (Verified on v24.18.0)
* **Environment Variables Required:**
  * `NODE_ENV=production`
  * `PORT=3000`

## 3. Production Deployment Commands
```bash
# Install dependencies
npm ci

# Production build
npm run build

# Start live server
npm run start
```

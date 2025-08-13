# ---------- deps: install node_modules with cache ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# ---------- builder: build Next.js (standalone) ----------
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# If your build needs env at build-time, pass them as --build-arg in CI
RUN npm run build

# ---------- runner: minimal production image ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only what the standalone server needs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]

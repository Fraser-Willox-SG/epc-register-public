# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=20.14.0

# ---- Base ----
FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---- Deps (cache) ----
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# ---- Build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node scripts/gen-sgds-ambient.cjs && npm run build

# ---- Runner (standalone) ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Needed so Playwright is available at runtime
COPY --from=deps /app/node_modules ./node_modules

# Install Chromium and Linux dependencies in the runtime image
RUN ./node_modules/.bin/playwright install --with-deps chromium

EXPOSE 3000
CMD ["node", "server.js"]
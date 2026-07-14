# syntax=docker/dockerfile:1
FROM node:22-slim

# Chromium is required by the scraper implementation.
RUN apt-get update \
    && apt-get install -y --no-install-recommends chromium fonts-ipafont-gothic \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/workers/package.json ./packages/workers/package.json
RUN pnpm install --frozen-lockfile

COPY packages/database ./packages/database
COPY packages/workers ./packages/workers

USER node
CMD ["pnpm", "--filter", "@foppa-bank/workers", "run", "start"]

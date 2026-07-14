# syntax=docker/dockerfile:1
FROM node:22-slim AS build

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/workers/package.json ./packages/workers/package.json
RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY packages/database ./packages/database
COPY packages/types ./packages/types
RUN pnpm --filter @foppa-bank/api build

FROM node:22-slim AS production
ENV NODE_ENV=production
WORKDIR /app

# Preserve the workspace layout because pnpm creates workspace symlinks in
# node_modules. A later optimization can use `pnpm deploy` once all workspace
# packages have production entry points.
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/packages/database ./packages/database
COPY --from=build /app/packages/types ./packages/types

USER node
EXPOSE 8080
CMD ["node", "apps/api/dist/infrastructure/api/main.js"]

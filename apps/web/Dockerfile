# syntax=docker/dockerfile:1
FROM node:22-slim AS build

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

# Copy workspace manifests first so dependency installation remains cached when
# application source files change.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/workers/package.json ./packages/workers/package.json
RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
COPY packages/types ./packages/types
RUN pnpm --filter hexagonal-react build

FROM nginx:1.27-alpine AS production
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

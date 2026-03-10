# Stage 1: Build
FROM node:24-slim AS builder

# Set the working directory to the root of the monorepo
WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy monorepo configuration files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy the specific app and shared packages needed
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/

# Install dependencies for the entire workspace
RUN pnpm install --frozen-lockfile

# Copy the source code for the frontend and shared types
COPY apps/web ./apps/web
COPY packages/types ./packages/types

# Change to the web app directory and build
WORKDIR /app/apps/web
# Using pnpm to run your build script (standard React build)
RUN pnpm build

# Stage 2: Production (Serve with Nginx)
FROM nginx:alpine AS production

# Copy the build artifacts from the builder stage
# Adjust 'dist' to 'build' if your bundler output differs
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Add custom Nginx config to support SPA routing (Hexagonal UI)
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

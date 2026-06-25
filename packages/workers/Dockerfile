# packages/workers/Dockerfile
FROM node:24-slim

# Install system dependencies for headless browsers
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the shared package and the worker code
COPY package.json ./
COPY packages/database ./packages/database
COPY packages/workers ./packages/workers

# Install dependencies (using workspaces)
RUN pnpm install

# Command to run the worker
CMD ["npm", "run", "start", "--workspace=@foppa-bank/workers"]

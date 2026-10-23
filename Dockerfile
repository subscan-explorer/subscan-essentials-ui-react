FROM node:24.22.1-alpine AS builder
WORKDIR /app

# Install native dependencies on the same libc/architecture as the runtime.
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:24.22.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# The Node image's node user matches the production UID/GID 1000 contract.
COPY --from=builder --chown=node:node /app/next.config.js ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Next's standalone output omits the writable image cache.
RUN mkdir -p .next/cache \
    && chown node:node .next .next/cache

USER node

EXPOSE 3000

CMD ["node", "server.js"]

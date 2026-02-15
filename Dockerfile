FROM node:24.13.1 AS base


FROM base AS deps
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --include=dev --unsafe-perm --include-optional

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Dummy variables for build
ENV PAYLOAD_SECRET=temporary_secret_for_build_only
ENV SMTP_HOST=localhost
ENV SMTP_USER=dummy
ENV SMTP_PASS=dummy

RUN npx next build --experimental-build-mode compile

FROM base AS runner
WORKDIR /app

LABEL org.opencontainers.image.source=https://github.com/ales17/vylety-web

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/node_modules/@libsql/linux-x64-musl ./node_modules/@libsql/linux-x64-musl
# COPY --from=builder /app/node_modules/libsql ./node_modules/libsql


COPY --from=builder /app/public ./public

RUN mkdir -p data/db && chown nextjs:nodejs data/db
RUN mkdir -p data/uploads && chown nextjs:nodejs data/uploads

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs /app/data 

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
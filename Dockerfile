# Deps
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

ARG FONTAWESOME_NPM_AUTH_TOKEN

COPY . .

ENV FONTAWESOME_NPM_AUTH_TOKEN ${FONTAWESOME_NPM_AUTH_TOKEN}

RUN npm ci

# Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Run
FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 8080

ENV PORT 8080

CMD ["node", "./dist/index.js"]
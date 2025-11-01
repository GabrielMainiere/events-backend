
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG DATABASE_URL="postgresql://postgres:postgres@localhost:5432/msnotifications?schema=public"
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

RUN npm run build


FROM node:20-alpine

RUN apk add --no-cache wget

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/proto ./proto

COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000 50051

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["sh", "-c", "npx prisma migrate deploy && exec node --experimental-global-webcrypto dist/main.js"]
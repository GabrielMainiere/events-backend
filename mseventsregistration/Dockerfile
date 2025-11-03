
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci 

COPY . .

ARG DATABASE_URL="postgresql://postgres:postgres@localhost:5435/msevents?schema=public"
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

RUN npm run build


FROM node:20-alpine

RUN apk add --no-cache wget

WORKDIR /usr/src/app

# Copy package files for metadata
COPY package*.json ./

# Copy built artifacts and node_modules from builder (ensures dist exists)
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/proto ./proto
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3003 50053

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3003/ || exit 1

# Run migrations and start the app. Use exec to forward signals.
# Auto-detect main.js location to handle different NestJS CLI configurations
CMD ["sh", "-c", "npx prisma migrate deploy && MAIN_FILE=$(find dist -name 'main.js' | head -1) && exec node $MAIN_FILE"]
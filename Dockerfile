# Stage 1: Build
FROM node:18-alpine AS builder

# Cài dependencies cần thiết để build
RUN apk add --no-cache bash

WORKDIR /app

# Cài pnpm global ở builder
RUN npm install -g pnpm

# Copy file package và lock file để cài packages
COPY package.json pnpm-lock.yaml ./

# Cài dependencies
RUN pnpm install --frozen-lockfile

# Copy toàn bộ source code vào image
COPY . .

# Build ứng dụng Next.js
RUN pnpm build

# Stage 2: Production (runtime)
FROM node:18-alpine AS runner

RUN apk add --no-cache bash

WORKDIR /app

# Cài pnpm global để chạy lệnh trong container runtime
RUN npm install -g pnpm

# Copy các thư mục và file cần thiết từ builder sang runner
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/.env ./.env

# Mở cổng 3000 để bind port
EXPOSE 3000

# Lệnh chạy ứng dụng (dùng pnpm vì đã cài)
CMD ["pnpm", "start"]

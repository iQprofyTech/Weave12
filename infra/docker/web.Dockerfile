FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
RUN pnpm i --frozen-lockfile
RUN pnpm -r build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/apps/web/dist ./dist
EXPOSE 5173
CMD ["pnpm", "preview", "--host", "0.0.0.0"]
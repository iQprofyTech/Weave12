FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm install --ignore-scripts
WORKDIR /app/apps/api
COPY --from=builder /app/apps/api/dist ./dist
EXPOSE 8080
CMD ["npm","run","start"]

# FROM node:20-alpine AS builder
# WORKDIR /app
# COPY . .
# RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
# RUN pnpm i --frozen-lockfile
# RUN pnpm -r build

# FROM node:20-alpine
# WORKDIR /app/apps/api
# COPY --from=builder /app/apps/api/dist ./dist
# EXPOSE 8080
# CMD ["node", "dist/server.js"]

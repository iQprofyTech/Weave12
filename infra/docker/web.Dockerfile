FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
WORKDIR /app/apps/web
CMD ["npm","run","dev"]

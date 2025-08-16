FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm install --ignore-scripts
WORKDIR /app/apps/worker
CMD ["npm","run","start"]

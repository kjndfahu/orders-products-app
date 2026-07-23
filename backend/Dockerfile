FROM node:20-alpine

RUN apk add --no-cache openssl mariadb-client

WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --prefer-offline

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]

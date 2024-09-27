
FROM node:20 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20 AS runner

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next

COPY --from=builder /app/next.config.mjs ./

RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]

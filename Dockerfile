FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3500
CMD [ "npm","run","start" ]

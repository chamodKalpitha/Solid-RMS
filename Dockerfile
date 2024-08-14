FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npx prisma generate
COPY . .
EXPOSE 3500
CMD [ "npm","run","start" ]
FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx prisma studio
EXPOSE 3500
CMD [ "npm","run","start" ]

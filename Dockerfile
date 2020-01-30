FROM node:latest

WORKDIR /var/www/app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
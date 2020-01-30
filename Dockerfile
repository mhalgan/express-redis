FROM node:latest

WORKDIR /var/www/app

COPY package.json ./

# Remove cert validation because of "self signed certificate" error behind company proxy
RUN yarn config set strict-ssl false
RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
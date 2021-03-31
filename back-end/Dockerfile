FROM node:12-alpine

WORKDIR /app

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install nodemon -g
RUN npm install express
RUN npm install mysql
RUN npm install mysql2

CMD ["npm", "start"]
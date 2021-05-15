# base image
FROM node:14.16.0-alpine

# Set working directory
WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install @material-ui/core --silent
RUN npm install @material-ui/icons --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install react-router-dom -g --silent
RUN npm install http-proxy-middleware --silent
RUN npm install react-facebook-login --silent

# Start app
CMD ["npm", "start"]
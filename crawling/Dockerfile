# base image
FROM node:14.16.0-alpine

# Set working directory
WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN apk update
RUN apk add software-properties-common
RUN apk add python3.8
RUN apk add python3-pip
RUN pip3 install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN apk add chromium
apk add chromium-chromedriver

# Start app
CMD ["npm", "start"]
FROM node:12.8-alpine

# set working directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add project files
COPY . .

# run app
EXPOSE 8082
CMD [ "node", "src/server.js" ]

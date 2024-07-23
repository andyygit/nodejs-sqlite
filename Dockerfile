FROM node:current-slim

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL info

EXPOSE 3000
WORKDIR /myApp
COPY src .
RUN npm install
RUN npm run init
CMD ["node", "index.js"]
# need old index.js file from https://github.com/andyygit/nodejs-sqlite/tree/7f405dd924df6e29fda1897ba0391563d7398774
# how to expose logs?
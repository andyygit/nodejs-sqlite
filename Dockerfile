FROM node:current-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL info

EXPOSE 3000
WORKDIR /myApp
COPY src .
RUN npm install
RUN npm run init
CMD ["node", "index.js"]

# expose logs?
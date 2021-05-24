FROM node:latest As development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . /usr/src/app

RUN npm run build

FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

COPY --from=development /usr/src/app/dist ./dist

#RUN node --require ts-node/register ./node_modules/typeorm/cli.js migration:generate -n init
#RUN node --require ts-node/register ./node_modules/typeorm/cli.js migration:run

CMD ["node", "dist/src/main"]

EXPOSE 50051

FROM node

WORKDIR /back

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]

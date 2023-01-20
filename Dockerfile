FROM node:16.3.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8080 8000

CMD ["npm", "run", "start"]

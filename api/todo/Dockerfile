FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /root/
COPY /build ./
COPY package.json ./
RUN npm install --omit=dev

CMD [ "node", "app.js" ]
EXPOSE 80
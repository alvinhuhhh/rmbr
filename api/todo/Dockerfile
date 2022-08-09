FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /root/
COPY /build ./
COPY package.json ./
COPY server.crt ./
COPY server.key ./
RUN npm install --omit=dev
CMD [ "node", "app.js" ]
EXPOSE 443
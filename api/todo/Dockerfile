FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /root/
COPY /build ./
COPY package.json ./
RUN npm install --omit=dev

COPY ssl/private.key ssl/
COPY ssl/certificate.crt ssl/
COPY ssl/ca_bundle.crt ssl/
COPY ssl/6C8CC160AA79C5242666D6778CB576C6.txt ssl/

CMD [ "node", "app.js" ]
EXPOSE 80 443
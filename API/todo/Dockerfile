FROM node:16 AS build
WORKDIR /temp
COPY . .
RUN npm install typescript
RUN npx tsc

FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /root/
COPY --from=build /temp/build ./
COPY --from=build /temp/package.json ./
RUN npm install --omit=dev
CMD [ "node", "app.js" ]
EXPOSE 3000
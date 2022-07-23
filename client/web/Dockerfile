FROM node:16 AS build
WORKDIR /root
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /root/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;" ]
EXPOSE 3001
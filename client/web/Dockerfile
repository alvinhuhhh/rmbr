FROM nginx:alpine
COPY /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /ssl/domain.crt /etc/ssl
COPY /ssl/private.key /etc/ssl
CMD [ "nginx", "-g", "daemon off;" ]
EXPOSE 443
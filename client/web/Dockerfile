FROM nginx:alpine
COPY /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY domain.crt /etc/ssl
COPY private.key /etc/ssl

CMD [ "nginx", "-g", "daemon off;" ]
EXPOSE 443
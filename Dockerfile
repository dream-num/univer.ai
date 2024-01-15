FROM nginx:latest

COPY ./dist /usr/share/nginx/html

RUN sed -i 's/listen\s*80;/listen 3020;/g' /etc/nginx/conf.d/default.conf

EXPOSE 3020

CMD ["nginx", "-g", "daemon off;"]

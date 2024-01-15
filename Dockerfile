FROM node:18.17.0 AS base

WORKDIR /dist
COPY . .
RUN npm i -g pnpm
RUN pnpm install

RUN pnpm build

FROM nginx:latest

COPY --from=base /dist /usr/share/nginx/html

RUN sed -i 's/listen\s*80;/listen 3020;/g' /etc/nginx/conf.d/default.conf

EXPOSE 3020

CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine AS builder
WORKDIR /usr/src/front


COPY package*.json .

RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.24.0
COPY --from=builder /usr/src/front/dist /usr/share/nginx/html
COPY  nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g", "daemon off;"]

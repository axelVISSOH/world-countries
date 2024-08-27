#React app image for build
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

#configure nginx for the build app

FROM nginx:stable-alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
# syntax = docker/dockerfile:experimental
# develop stage
FROM node:18-alpine as develop-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn global add @quasar/cli
COPY . .

# build stage
FROM develop-stage as build-stage
RUN yarn install --frozen-lockfile
RUN quasar build

# production stage
FROM nginx:1.19.0-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
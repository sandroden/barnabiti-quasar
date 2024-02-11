# syntax = docker/dockerfile
# develop stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn global add @quasar/cli@2.3.0
RUN yarn install --frozen-lockfile
COPY . .
RUN quasar build

# production stage
FROM nginx:1.25.0-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
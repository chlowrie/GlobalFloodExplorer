FROM node:latest as build-stage
WORKDIR app
COPY package*.json /app/
RUN yarn install
COPY ./ /app/
RUN yarn run build

FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/cong.d/default.conf

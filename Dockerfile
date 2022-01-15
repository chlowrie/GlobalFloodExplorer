FROM node:latest as build-stage
WORKDIR app
COPY ./ /app/
RUN yarn add package.json
RUN yarn run build

FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/cong.d/default.conf

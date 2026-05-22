FROM node:20-alpine as front-build

COPY ./front /src

WORKDIR /src

RUN npm ci \
    && npx @angular/cli build --optimization

FROM gradle:8-jdk21-alpine as back-build

COPY ./back /src

WORKDIR /src

RUN gradle build -x test

FROM caddy:2-alpine as front

COPY --from=front-build /src/dist/microcrm/browser /app/front
COPY misc/docker/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
EXPOSE 443

FROM eclipse-temurin:21-jre-alpine as back

COPY --from=back-build /src/build/libs/*.jar /app/back/microcrm.jar

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "/app/back/microcrm.jar"]
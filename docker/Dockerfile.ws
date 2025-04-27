FROM oven/bun:1

WORKDIR /usr/src/app

COPY ./apps/ws-server ./apps/ws-server
COPY ./packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./turbo.json dest./turbo.json

RUN bun install
RUN bun db:generate

EXPOSE 8081

CMD [ "bun", "run", "start:ws" ]
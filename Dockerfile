# Ubuntu Image for API
FROM ubuntu:24.04 AS api_ubuntu
RUN apt-get -y update && apt-get -y install g++ curl cmake libasio-dev

# API Server
FROM api_ubuntu AS backend
WORKDIR /usr/local/chatroom-api/
COPY chatroom-backend ./
RUN mkdir ./build
WORKDIR /usr/local/chatroom-api/build
RUN cmake ..
RUN make
RUN useradd http
USER http
CMD ["./chatroom-api"]

# Static Site
FROM node:bookworm AS chatroom_static_dev
WORKDIR /usr/local/chatroom-static/
CMD npm install && npm run dev


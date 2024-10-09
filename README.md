# Simple WebSocket Chat

Right now, it's just anonymous unauthenticated broadcasting to all other clients.

The docker compose mounts the chatroom-static path and runs the vite development server
to serve the client html/js. It also spins up the program in chatroom-backend which
provides the websocket server for broadcasting messages to other clients. The web
paths are routed between the two servers with traefik. 

To host the webapp on localhost:4500, run the following commands:

```
git clone https://github.com/Dyslectric/simple-ws-chat.git
cd simple-ws-chat
docker compose down
docker compose build
docker compose up -w # Or docker compose watch if on windows
```

After running these commands, the api should rebuild any time a file in
chatroom-backend is changed. You may open as many clients as you want on
localhost:4500 and click "Connect to WebSocket" on each. When a message
is sent by a client, it will be received by all others.

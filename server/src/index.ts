import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { NETWORK_CONFIG, PROJECT_NAME } from "@mumoo/shared";

const port = Number(process.env.PORT ?? NETWORK_CONFIG.defaultPort);

const server = createServer((_request, response) => {
  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.end(`${PROJECT_NAME} server is running\n`);
});

const websocketServer = new WebSocketServer({
  server,
  path: NETWORK_CONFIG.websocketPath
});

websocketServer.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "welcome", project: PROJECT_NAME }));
});

server.listen(port, () => {
  console.log(`${PROJECT_NAME} server listening on http://127.0.0.1:${port}`);
  console.log(`WebSocket endpoint ready at ws://127.0.0.1:${port}${NETWORK_CONFIG.websocketPath}`);
});

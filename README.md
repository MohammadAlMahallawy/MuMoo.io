# MuMoo.io

This is my remake of my beloved childhood game, MooMoo.io. Since the original is now mostly deserted, I decided to remake the game from scratch with modern web technology.

## Current Progress

- Added the general project structure.
- Added a Vite + TypeScript client.
- Added PixiJS for future rendering work.
- Added a resize-aware PixiJS rendering window with a background, game loop, delta time, and FPS counter.
- Added a local player entity with placeholder rendering, WASD movement, rotation, and camera follow.
- Added a Node.js + TypeScript WebSocket server.
- Added shared configuration for client and server.

## Setup

Install dependencies from the repository root:

```sh
npm install
```

Run both the client and server:

```sh
npm run dev
```

Run them separately:

```sh
npm run dev:client
npm run dev:server
```

Default local URLs:

- Client: http://127.0.0.1:5173
- Server: http://127.0.0.1:3001
- WebSocket: ws://127.0.0.1:3001/ws

## Project Layout

- `client/` - Vite, TypeScript, and PixiJS browser client.
- `server/` - Node.js, TypeScript, and WebSocket server.
- `shared/` - Shared constants and types used by both client and server.
- `docs/` - Roadmap and architecture documentation.

/* ===
Manage the Server: start and stops
=== */

import express from 'express';
import fs from 'fs';
import http from 'http';
import socket from 'socket.io';
import stoppable from 'stoppable';
import userHome from 'user-home';

import Watcher from './Watcher';
import SocketManager from './SocketManager';

const app = express();
const server = stoppable(http.Server(app));
const PUBLIC_PATH = `${userHome}/Carbon`;
const HOST = 'http://localhost:';
let PORT;

const io = socket(server);
const watcher = new Watcher();
const socketManager = new SocketManager();

if (!fs.existsSync(PUBLIC_PATH)) {
  fs.mkdir(PUBLIC_PATH);
}

// Start the server
const startServer = port => {
  PORT = port || 3333;
  app.use(express.static(PUBLIC_PATH));

  app.get('/', (req, res) => {
    res.sendFile(`${PUBLIC_PATH}/index.html`);
  });

  io.on('connection', client => {
    socketManager.addClient(client);
  });

  server.listen(PORT, () => {
    console.log(`Server running at ${HOST}${PORT}`);
  });
};

const stopServer = () => {
  // Stop the watcher
  if (watcher) {
    watcher.stop();
  }
  server.stop();
  console.log(`Server at ${HOST}${PORT} stopped`);
};

export {
  io,
  watcher,
  socketManager,
  startServer,
  stopServer
};


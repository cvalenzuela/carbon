/* @flow */
/* ===
Server Actions: Manage the Server actions, like starting and stopping the server.
This only creates the right object to be dispatched.
=== */

import { ipcRenderer } from 'electron';

// Possible Server States
const START_SERVER = 'START_SERVER';
const STOP_SERVER = 'STOP_SERVER';
const ADD_CLIENT = 'ADD_CLIENT';
const REMOVE_CLIENT = 'REMOVE_CLIENT';
const SET_URL = 'SET_URL';
const SET_IP = 'SET_IP';
const SET_PORT = 'SET_PORT';
const SET_WORLD_PUBLIC = 'SET_WORLD_PUBLIC';

// Start Server
const startServer = () => {
  ipcRenderer.send('startServer', { port: 3333 });
  return ({
    type: START_SERVER
  });
};

// Stop Server
const stopServer = () => {
  ipcRenderer.send('stopServer');
  return ({
    type: STOP_SERVER
  });
};

// Set (or store) the current IP Address of the Server.
const setURL = (url: string) => (
  {
    type: SET_URL,
    url
  }
);

// Set (or store) the current IP Address of the Server.
const setIP = (ip: string) => (
  {
    type: SET_IP,
    ip
  }
);

// Set (or store) the current IP Address of the Server.
const setPort = (port: number) => (
  {
    type: SET_PORT,
    port
  }
);

// Set to world public available
const setWorldPublic = (worldPublic: boolean) => (
  {
    type: SET_WORLD_PUBLIC,
    worldPublic
  }
);

// Start Server
const addClient = (client: Object) => (
  {
    type: ADD_CLIENT,
    client
  }
);

// Stop Server
const removeClient = (client: Object) => (
  {
    type: REMOVE_CLIENT,
    client
  }
);

export {
  START_SERVER,
  STOP_SERVER,
  ADD_CLIENT,
  REMOVE_CLIENT,
  SET_URL,
  SET_IP,
  SET_PORT,
  SET_WORLD_PUBLIC,
  startServer,
  stopServer,
  setURL,
  setIP,
  setPort,
  addClient,
  removeClient,
  setWorldPublic
};

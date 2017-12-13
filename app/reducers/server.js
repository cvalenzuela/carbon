/* @flow */
/* ===
Server Reducer: Changes the state of the server.
Is child of the Root Reducer.
=== */

import {
  START_SERVER,
  STOP_SERVER,
  ADD_CLIENT,
  REMOVE_CLIENT,
  SET_URL,
  SET_IP,
  SET_PORT,
  SET_WORLD_PUBLIC
} from '../actions/server';

export type serverStatusType = {
  serverStatus: string,
  url: string,
  ip: string,
  port: number,
  clients: Array<mixed>,
  worldPublic: boolean
};

type actionType = {
  +type: string,
  client?: Object,
  url?: string,
  ip?: string,
  port?: number,
  worldPublic?: boolean
};

// Set the status of the server
const serverStatus = (state: string = 'STOPPED', action: actionType) => {
  switch (action.type) {
    case START_SERVER:
      return 'RUNNING';
    case STOP_SERVER:
      return 'STOPPED';
    default:
      return state;
  }
};

// Set the URL of the server
const url = (state: string = 'http://000.00.000.000:0001', action: actionType) => {
  switch (action.type) {
    case SET_URL:
      return action.url;
    default:
      return state;
  }
};

// Set the IP of the server
const ip = (state: string = '000.00.000.000', action: actionType) => {
  switch (action.type) {
    case SET_IP:
      return action.ip;
    default:
      return state;
  }
};

// Set the Port of the server
const port = (state: number = 3333, action: actionType) => {
  switch (action.type) {
    case SET_PORT:
      return action.port;
    default:
      return state;
  }
};

const worldPublic = (state: boolean = false, action: actionType) => {
  switch (action.type) {
    case SET_WORLD_PUBLIC:
      return action.worldPublic;
    default:
      return state;
  }
};

// Add or remove clients
const clients = (state: Array<mixed> = [], action: actionType) => {
  let index = -1;
  if (action.client) {
    index = state.findIndex(c => c.id === action.client.id);
  }
  switch (action.type) {
    case ADD_CLIENT:
      return [...state, action.client];
    case REMOVE_CLIENT:
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export {
  serverStatus,
  worldPublic,
  url,
  ip,
  port,
  clients
};

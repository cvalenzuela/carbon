/* @flow */
/* ===
Root Reducer: This handles the state update giving the responsibility of changing
the state to specific child-reducers.
=== */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { serverStatus, clients, url, ip, port, worldPublic } from './server';
import files from './files';

const rootReducer = combineReducers({
  files,
  clients,
  serverStatus,
  url,
  ip,
  port,
  worldPublic,
  router,
});

export default rootReducer;

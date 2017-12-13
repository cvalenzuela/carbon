/* ===
Handle Socket Connections from clients.
=== */

import generateName from 'sillyname';
import updateClients from './../main.dev';
import { watcher, io } from './index';

class SocketManager {
  constructor() {
    this.clients = {};
  }

  addClient(client) {
    const id = client.client.id;
    // Check if this user is not already register
    if (!Object.prototype.hasOwnProperty.call(this.clients, id)) {
      const headers = client.client.request.headers;
      const clientData = {
        id,
        username: generateName(),
        userAgent: headers['user-agent'],
        cookie: headers.cookie
      };

      // Store the client the in the clients object
      this.clients[id] = clientData;
      // Emit the username and current files to the new user
      client.emit('newConnection', {
        clientData,
        files: watcher.files
      });
      // Send the new client to App
      updateClients({
        clients: this.clients,
        action: 'ADD_CLIENT',
        lastClient: clientData
      });

      client.on('disconnect', () => {
        try {
          delete this.clients[id];
          updateClients({
            clients: this.clients,
            action: 'REMOVE_CLIENT',
            lastClient: clientData
          });
        } catch (error) {
          console.log('deleting the user');
        }
        io.sockets.emit('clientsUpdate', this.clients);
      });
    }
  }

  static emit(msg, data) {
    io.sockets.emit(msg, data);
  }
}

export default SocketManager;

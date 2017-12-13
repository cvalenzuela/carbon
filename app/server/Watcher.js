/* ===
Watch files and folders for changes
=== */

import fs from 'fs';
import SocketManager from './SocketManager';

class Watcher {
  constructor() {
    this.files = [];
    this.watchers = {};
  }

  addFile(file) {
    // Start watching the file
    const watcher = fs.watch(file.path, { encoding: 'buffer' }, () => {
      fs.readFile(file.path, (err, Content) => {
        const index = this.files.findIndex(f => f.path === file.path);
        if (Buffer.isBuffer(Content)) {
          this.files[index].content = Content.toString('utf8');
        }
        SocketManager.emit('fileHasChanged', this.files[index]);
      });
    });
    this.watchers[file.id] = watcher;

    // Send the new file too all clients
    fs.readFile(file.path, (err, Content) => {
      if (Buffer.isBuffer(Content)) {
        const File = {
          ...file,
          content: Content.toString('utf8')
        };
        SocketManager.emit('newFile', File);
        this.files.push(File);
      }
    });
  }

  removeFile(file) {
    const index = this.files.findIndex(f => f.id === file.id);
    this.files.splice(index, 1);
    this.watchers[file.id].close();
    delete this.watchers[file.id];
    SocketManager.emit('fileHasBeenRemoved', file);
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
  }
}

export default Watcher;

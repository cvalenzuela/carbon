/* @flow */
/* ===
Files Actions: Manage the Files actions, like adding and removing individual files.
This only creates the right object to be dispatched.
=== */

import path from 'path';
import { ipcRenderer } from 'electron';
import detect from 'language-detect';
import { UUIID } from './../utils/utils';

// Possible Server States
const ADD_FILE = 'ADD_FILE';
const REMOVE_FILE = 'REMOVE_FILE';

// Add a File to Watch
const addFile = (fromFolder: boolean, File: Object) => {
  let extension = null;
  let shortName = File.name;
  let language = null;
  let folder = false;
  if (fromFolder === true) {
    folder = true;
  }
  language = (detect.sync(File.path)).toLowerCase();
  extension = path.extname(File.path);
  if (File.name.length > 13) {
    shortName = File.name.split('.')[0];
    shortName = `${shortName.substring(0, 7)}...${shortName.substring(shortName.length - 2, shortName.length)}${extension}`;
  }
  const file = {
    id: UUIID(),
    lastModified: File.lastModified,
    lastModifiedDate: File.lastModifiedDate,
    name: File.name,
    path: File.path,
    webkitRelativePath: File.webkitRelativePath,
    size: File.size,
    type: File.type,
    language,
    extension,
    shortName,
    folder
  };
  ipcRenderer.send('addFileToWatch', file);
  return ({
    type: ADD_FILE,
    file
  });
};

// Remove a File that was being watch
const removeFile = (File: Object) => {
  ipcRenderer.send('removeFileFromWatch', File);
  return ({
    type: REMOVE_FILE,
    file: File
  });
};

export {
  ADD_FILE,
  REMOVE_FILE,
  addFile,
  removeFile
};

/* @flow */
/* ===
Files View Component
=== */

import React, { Component } from 'react';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

import File from './../containers/File';
import styles from './styles/Files.css';

class Files extends Component {
  props: {
    files: Array<Object>,
    addFile: (boolean, Object) => void
  };
  state: {
    style: {
      transform?: string,
      textAlign?: string
    }
  };
  constructor() {
    super();
    this.state = {
      style: {
        transform: 'scale(1.00)',
        textAlign: 'center'
      }
    };
  }

  componentWillReceiveProps(props: Object) {
    if (props.files.length === 0) {
      this.setState({
        style: {
          textAlign: 'center'
        }
      });
    }
  }

  setStyle = (scale: number, align: string) => {
    if (this.props.files.length > 0) {
      this.setState({
        style: {
          textAlign: 'left',
          transform: `scale(${scale})`
        }
      });
    } else {
      this.setState({
        style: {
          textAlign: align,
          transform: `scale(${scale})`
        }
      });
    }
  }

  dragOver = (event: Object) => {
    event.preventDefault();
    this.setStyle(1.01, 'center');
  }

  dragLeave = (event: Object) => {
    event.preventDefault();
    this.setStyle(1, 'center');
  }

  drop = (event: Object) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i += 1) {
      fs.lstat(files.item(i).path, (err, stats) => {
        if (stats.isFile()) {
          this.props.addFile(false, files.item(i));
        } else if (stats.isDirectory()) {
          fs.readdir(files.item(i).path, (e, folderFiles) => {
            folderFiles.forEach(f => {
              if (f !== '.DS_Store') {
                const fPath = path.join(files.item(i).path, f);
                const fStats = fs.statSync(fPath);
                const file = {
                  lastModified: fStats.ctime,
                  lastModifiedDate: fStats.ctime,
                  name: f,
                  path: fPath,
                  size: fStats.size,
                  type: mime.lookup(fPath),
                  webkitRelativePath: '',
                  fromFolder: true
                };
                this.props.addFile(true, file);
              }
            });
          });
        } else {
          console.log('Only files and folders for now');
        }
      });
    }
    this.setStyle(1.01, 'left');
  }

  render() {
    const { files } = this.props;

    return (
      <div
        className={styles.Files}
        onDrop={this.drop}
        onDragOver={this.dragOver}
        onDragLeave={this.dragLeave}
        style={this.state.style}
      >
        {files.length > 0 ? files.map((file) => <File key={file.id} file={file} />) :
        <h4 className={styles.Instructions}>Files (click or drop)</h4> }
      </div>
    );
  }
}

export default Files;

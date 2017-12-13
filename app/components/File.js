/* @flow */
/* ===
File View Component
=== */

import React, { Component } from 'react';

import TiDelete from 'react-icons/lib/ti/delete';
import GoFileCode from 'react-icons/lib/go/file-code';
import GoFileDirectory from 'react-icons/lib/go/file-directory';
import GoFileText from 'react-icons/lib/go/file-text';

import styles from './styles/File.css';

class File extends Component {
  props: {
    removeFile: Object => void,
    file: Object
  }

  state: {
    isHovering: boolean
  }

  constructor() {
    super();
    this.state = {
      isHovering: false
    };
  }

  toggleHoverState = (state: boolean) => {
    this.setState({
      isHovering: state
    });
  }

  render() {
    const { removeFile, file } = this.props;
    let iconType = <GoFileCode className={styles.FileIcon} />;
    let folder = null;
    if (file.folder) {
      folder = <GoFileDirectory className={styles.FolderIcon} />;
    } else if (file.language === 'text') {
      iconType = <GoFileText className={styles.FileIcon} />;
    }

    return (
      <div role="article" className={styles.Element}>
        <TiDelete
          className={styles.CloseIcon}
          role="button"
          tabIndex={0}
          onClick={() => removeFile(file)}
        />
        {folder}
        {iconType}
        <div className={styles.File} id={file.id} onMouseEnter={() => { this.toggleHoverState(true); }} onMouseLeave={() => { this.toggleHoverState(false); }}>
          {file.shortName}
        </div>
        { this.state.isHovering && <div className={styles.FilePath}> {file.path} </div> }
      </div>
    );
  }
}

export default File;

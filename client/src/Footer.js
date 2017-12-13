// Client
// Footer

import React, { Component } from 'react';
import fileDownload from 'react-file-download';

import './styles/Footer.css';

class Footer extends Component {
  props: {
    files: Array,
    currentFile: number
  }

  handleClick = () => {
    const index = this.props.files.findIndex(f => f.id === this.props.currentFile);
    const file = this.props.files[index];
    fileDownload(file.content, file.name);
  }

  render() {
    return (
      <div id="footer">
        <span role="button" tabIndex={0} onClick={this.handleClick} id="saveBtn">Save</span>
      </div>
    );
  }
}

export default Footer;

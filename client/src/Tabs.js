// Tabs

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
  render() {
    return (
      <div>
        {this.props.files.map(file =>
          (<Tab
            key={file.id}
            name={file.name}
            id={file.id}
            currentFile={this.props.currentFile}
            changeContent={this.props.changeContent}
          />)
        )}
      </div>
    );
  }
}

Tabs.propTypes = {
  files: PropTypes.array.isRequired,
  currentFile: PropTypes.string.isRequired,
  changeContent: PropTypes.func.isRequired
};

export default Tabs;

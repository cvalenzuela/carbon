// Client
// Tab

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/Tab.css';

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: '#000000'
    };
  }

  componentWillMount() {
    if (this.props.id === this.props.currentFile) {
      this.changeBackground(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentFile === this.props.id) {
      this.changeBackground(true);
    } else {
      this.changeBackground(false);
    }
  }

  changeBackground(active) {
    let color = '#000000';
    if (active) {
      color = '#029861';
    }
    this.setState({
      background: color
    });
  }

  handleClick = () => {
    this.props.changeContent(this.props.id);
  }

  render() {
    return (
      <div
        role="button"
        tabIndex={0}
        className="Tab"
        onClick={this.handleClick}
        style={{ background: this.state.background }}
      >
        {this.props.name}
      </div>);
  }
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  currentFile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  changeContent: PropTypes.func.isRequired
};

export default Tab;

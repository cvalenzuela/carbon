// Client
// Settings

import React, { Component } from 'react';
import { dracula, atomOneDark, monokaiSublime, atomOneLight, solarizedDark } from 'react-syntax-highlighter/dist/styles';

import './styles/Settings.css';

class Settings extends Component {
  props: {
    changeStyle: (Object) => void
  }

  constructor(props) {
    super(props);
    this.state = {
      name: 'Theme',
      currentStyle: dracula,
      show: false
    };
  }

  handleClick() {
    const show = !this.state.show;
    this.setState({
      show
    });
  }

  render() {
    let dropdown = null;

    if (this.state.show) {
      dropdown = (
        <div id="dropdown">
          <div role="button" tabIndex={0} onClick={() => this.props.changeStyle(dracula)}>Dracula</div>
          <div role="button" tabIndex={0} onClick={() => this.props.changeStyle(atomOneLight)}>Light</div>
          <div role="button" tabIndex={0} onClick={() => this.props.changeStyle(atomOneDark)}>One Dark</div>
          <div role="button" tabIndex={0} onClick={() => this.props.changeStyle(monokaiSublime)}>Monokai</div>
          <div role="button" tabIndex={0} onClick={() => this.props.changeStyle(solarizedDark)}>Solarized</div>
        </div>);
    }

    return (
      <div id="settings">
        <div role="button" tabIndex={0} id="settingsBtn" onClick={() => this.handleClick()}>
          {this.state.name}
        </div>
        {dropdown}
      </div>
    );
  }
}

export default Settings;

// Client
// User

import React, { Component } from 'react';
import greeting from 'greeting';
import ContentEditable from 'react-contenteditable';

import './styles/User.css';

class User extends Component {
  props: {
    username: string
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      greeting: greeting.random()
    };
  }

  handleChange = (evt) => {
    this.setState({
      username: evt.target.value
    });
  }

  render() {
    return (
      <div>
        <span id="name">{this.state.greeting}, <ContentEditable html={this.props.username} disabled={false} onChange={this.handleChange} id="username" /></span>
      </div>
    );
  }
}

export default User;

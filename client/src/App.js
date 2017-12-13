// Client
// App

import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/styles';
import io from 'socket.io-client';
import update from 'immutability-helper';

import Tabs from './Tabs';
import User from './User';
import Footer from './Footer';
import Settings from './Settings';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io.connect('', { query: '' }),
      currentFile: '0',
      files: [],
      username: '',
      style: dracula
    };
  }

  componentWillMount() {
    this.state.socket.on('connect', () => {
      console.log('You are now connected to the server');
    });

    this.state.socket.on('newConnection', data => {
      console.log(`${data.clientData.username} is your username and we are currently watching ${data.files.length} files`);
      let currentFile = '0';
      if (data.files.length > 0) {
        currentFile = data.files[0].id;
      }
      this.setState({
        files: data.files,
        username: data.clientData.username,
        currentFile
      });
    });

    // New file has been added
    this.state.socket.on('newFile', file => {
      let currentFile = this.state.currentFile;
      if (this.state.files.length === 0) {
        console.log('assigning the current file to ', file.id);
        currentFile = file.id;
      }
      this.setState({
        files: update(this.state.files, { $push: [file] }),
        currentFile
      });
    });

    // A file has been removed
    this.state.socket.on('fileHasBeenRemoved', file => {
      const index = this.state.files.findIndex(f => f.id === file.id);
      this.setState({
        files: update(this.state.files, { $splice: [[index, 1]] })
      });
    });

    // A file has changed
    this.state.socket.on('fileHasChanged', file => {
      const index = this.state.files.findIndex(f => f.id === file.id);
      const files = this.state.files;
      files[index].content = file.content;
      this.forceUpdate();
    });
  }

  emitDemo() {
    this.state.socket.emit('demo', '0');
  }

  changeContent = (id) => {
    this.setState({
      currentFile: id
    });
  }

  changeStyle = (style) => {
    this.setState({
      style
    });
  }

  render() {
    let textToRender = null;
    const index = this.state.files.findIndex(f => f.id === this.state.currentFile);
    if (this.state.files.length > 0) {
      textToRender = (
        <SyntaxHighlighter
          showLineNumbers="true"
          language={this.state.files[index].language}
          style={this.state.style}
        >
          {this.state.files[index].content}
        </SyntaxHighlighter>);
    }
    return (
      <div className="App">
        <User username={this.state.username} />
        <Settings changeStyle={this.changeStyle} />
        <Tabs
          files={this.state.files}
          changeContent={this.changeContent}
          currentFile={this.state.currentFile}
        />
        {textToRender}
        <Footer currentFile={this.state.currentFile} files={this.state.files} />
      </div>
    );
  }
}

export default App;

/* @flow */
/* ===
Toolbar View Component
=== */

import React, { Component } from 'react';
import { ipcRenderer, shell } from 'electron';
import log from 'electron-log';

import ngrok from 'ngrok';
import Play from 'react-icons/lib/md/play-arrow';
import Stop from 'react-icons/lib/md/stop';
import GoGlobe from 'react-icons/lib/go/globe';

import styles from './styles/Toolbar.css';


class Toolbar extends Component {
  props: {
    serverStatus: string,
    startServer: () => void,
    stopServer: () => void,
    setURL: (string) => void,
    setIP: (string) => void,
    setPort: (string) => void,
    url: string,
    ip: string,
    port: number,
    addClient: (string) => void,
    removeClient: (string) => void,
    clients: Array < mixed > ,
    worldPublic: boolean,
    setWorldPublic: (boolean) => void
  };
  state: {
    lastClient: string,
    msg: string,
    logs: Object,
    showClients: boolean,
    timeout: number
  };

  constructor() {
    super();
    this.state = {
      msg: '',
      lastClient: '',
      timeout: 0,
      showClients: false,
      logs: {
        top: '1em',
        borderBottom: '2px solid #186926'
      }
    };
    ipcRenderer.on('IPAddress', (event, arg) => {
      this.props.setURL(`http://${arg.ip}:${arg.port}`);
      this.props.setIP(arg.ip);
      this.props.setPort(arg.port);
    });
    ipcRenderer.on('updateClients', (event, arg) => {
      if (arg.action === 'ADD_CLIENT') {
        this.props.addClient(arg.lastClient);
        this.setState({
          msg: 'Welcome',
          lastClient: arg.lastClient.username,
          logs: {
            top: '2.3em',
            borderBottom: '2px solid #186926'
          }
        });
      } else {
        this.props.removeClient(arg.lastClient);
        this.setState({
          msg: 'See ya!',
          lastClient: arg.lastClient.username,
          logs: {
            top: '2.3em',
            borderBottom: '2px solid #691850'
          }
        });
      }
      this.hideLog(3000);
    });
  }

  openBrowser = (event: Object) => {
    event.preventDefault();
    shell.openExternal(this.props.url);
  }

  clearTimeout() {
    clearTimeout(this.state.timeout);
  }

  hideLog(time: number) {
    this.setState({
      timeout: setTimeout(() => {
        this.setState({
          logs: {
            top: '1em'
          }
        });
      }, time)
    });
  }

  toggleClients = () => {
    this.setState({
      showClients: !this.state.showClients
    });
  }

  makeWorldPublic = () => {
    this.clearTimeout();
    if (this.props.serverStatus === 'RUNNING' && !this.props.worldPublic) {
      ngrok.connect(this.props.port, (err, url) => {
        if (err) {
          log.error(err);
        }
        this.props.setURL(url);
        log.info(url);
        this.props.setWorldPublic(true);
        this.setState({
          msg: 'You are now sharing with the world!',
          lastClient: '',
          logs: {
            top: '2.3em',
            borderBottom: '2px solid #186926'
          }
        });
      });
    } else if (this.props.serverStatus === 'RUNNING' && this.props.worldPublic) {
      this.props.setURL(`http://${this.props.ip}:${this.props.port}`);
      ngrok.disconnect();
      ngrok.kill();
      this.props.setWorldPublic(false);
      this.setState({
        msg: 'Just sharing locally!',
        lastClient: '',
        logs: {
          top: '2.3em',
          borderBottom: '2px solid #186926'
        }
      });
    } else {
      this.setState({
        msg: 'Click Start and then share with the world',
        lastClient: '',
        logs: {
          top: '2.3em',
          borderBottom: '2px solid #691850'
        }
      });
    }
    this.hideLog(5000);
  }

  render() {
    const { serverStatus, startServer, stopServer, url, clients } = this.props;
    const clientsSize = Object.values(clients).length;
    let playPauseBtn;
    let ribbon;
    let connections = 'Connection';
    if (clientsSize > 1 || clientsSize === 0) {
      connections = 'Connections';
    } else {
      connections = 'Connection';
    }
    if (serverStatus === 'STOPPED') {
      playPauseBtn = <Play className={styles.PlayBtn} onClick={startServer}/>;
      ribbon = { top: '-40px' };
    } else {
      playPauseBtn = <Stop className={styles.PlayBtn} onClick={stopServer} />;
      ribbon = { top: '0px' };
    }

    let clientsDropdown = null;
    if (this.state.showClients) {
      clientsDropdown = (
        <div className={styles.DropdownClients} >
          {
            clients.map((c: Object) =>
            (
              <div key={c.id} className={styles.Client}> { c.username } </div>)
            )
          }
        </div>);
    }

    return (
      <div>
        <div className={styles.Toolbar}>
          { playPauseBtn }
          <GoGlobe className={styles.MakePublic} onClick={this.makeWorldPublic} />

          <div className={styles.logHidder}>{this.state.msg}<span>{` ${this.state.lastClient}`}</span></div>
          <p className={styles.logs} style={this.state.logs} >
            {this.state.msg}<span>{` ${this.state.lastClient}`}</span>
          </p>

          <div
            role="button"
            tabIndex={0}
            onClick={this.toggleClients}
            className={styles.clientConnected}
          >
            <span>{clientsSize}</span> {connections}
          </div> {clientsDropdown}
        </div>

        <div className={styles.ribbon} style={ribbon}>
          <div>
            Live at <span role="button" tabIndex={0} onClick={this.openBrowser} > { url } </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;

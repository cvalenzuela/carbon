/* @flow */
/* ===
Toolbar View Component
=== */

import React, { Component } from 'react';
import wifiName from 'wifi-name';

import Wifi from 'react-icons/lib/md/wifi';
import styles from './styles/Footer.css';
import { worldPublic } from '../reducers/server';

class Footer extends Component {
  props: {
    files: Array<Object>,
    serverStatus: string,
    worldPublic: boolean
  }

  state: {
    wifiName: string
  };

  updateWifi: Function;

  constructor() {
    super();
    this.state = {
      wifiName: ''
    };
    this.updateWifi = this.updateWifi.bind(this);
  }

  componentWillMount() {
    this.updateWifi();
  }

  updateWifi() {
    wifiName()
      .then(name => this.setState({ wifiName: name }))
      .catch(() => this.setState({ wifiName: 'No connection' }));
  }

  render() {
    const { files, serverStatus, worldPublic } = this.props;
    let filesMsg = 'File';
    if (files.length > 1 || files.length === 0) {
      filesMsg = 'Files';
    }
    let background = { background: '#272727' };
    let color = { color: '#797979' };
    let borderBottom = { borderBottom: '1px solid #797979' };

    if (serverStatus === 'RUNNING') {
      background = { background: '#029861' };
      color = { color: '#f3f3f3' };
      borderBottom = { borderBottom: '1px solid #f3f3f3' };
    }
    let availability = 'Available to anyone connected to';

    if (worldPublic) {
      availability = 'Available to anyone connected to the internet!';
    }

    return (
      <div className={styles.Footer} style={background}>
        <div className={styles.AmountOfFiles} style={color}>Sharing {files.length} {filesMsg}</div>

        <div className={styles.Wifi}>
          <p
            className={styles.WifiName}
            style={color}
          >{availability} <span style={borderBottom}>{this.state.wifiName}</span></p>
          <Wifi role="button" tabIndex={0} onClick={this.updateWifi} className={styles.WifiIcon} style={color} />
        </div>
      </div>
    );
  }
}

export default Footer;

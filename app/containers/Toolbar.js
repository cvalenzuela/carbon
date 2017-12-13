/* ===
Toolbar Container: manages the Toolbar logic
=== */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toolbar from '../components/Toolbar';
import * as ServerActions from '../actions/server';

const mapStateToProps = state => (
  {
    serverStatus: state.serverStatus,
    url: state.url,
    ip: state.ip,
    port: state.port,
    clients: state.clients,
    worldPublic: state.worldPublic
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(ServerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

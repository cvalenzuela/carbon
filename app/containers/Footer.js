/* ===
Footer Container: manages the Footer logic
=== */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import * as ServerActions from '../actions/server';

const mapStateToProps = state => (
  {
    files: state.files,
    serverStatus: state.serverStatus,
    worldPublic: state.worldPublic
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(ServerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

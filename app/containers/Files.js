/* ===
Files Container: manages the Files logic
=== */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Files from '../components/Files';
import * as FilesActions from '../actions/files';

const mapStateToProps = state => (
  {
    files: state.files
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(FilesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Files);

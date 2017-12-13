/* ===
File Container: manages individual File logic
=== */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import File from '../components/File';
import * as FilesActions from '../actions/files';

const mapStateToProps = state => (
  {
    files: state.files
  }
);

const mapDispatchToProps = dispatch => bindActionCreators(FilesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(File);

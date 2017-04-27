import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import ModuleInventoryList from './ModuleInventoryList';


class SelectMoudles extends Component {
  // this.props.params.projectId
  componentDidMount() {
    this.props.getData('modules');
  }

  render() {
    return (
      <div>
        <h1>
                Select Your Components
            </h1>
        <div>
          <ModuleInventoryList />
        </div>
        <div>
          <Link style={{ margin: '10px' }} to="/design">Next</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  getData: url => dispatch(actions.fetchModules(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectMoudles);

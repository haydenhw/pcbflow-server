import React, { Component } from 'react';
import React from 'react';

import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';

import shortid from 'shortid';
import PropTypes from 'prop-types';

shortid.generate();

LandingPageCard.propTypes = {
};

className: PropTypes.string.isRequired,
icon: PropTypes.array.isRequired,
title: PropTypes.object.isRequired,
content: PropTypes.number.isRequired,
content: PropTypes.func.isRequired,
content: PropTypes.bool.isRequired,
className: PropTypes.string,
icon: PropTypes.array,
title: PropTypes.object,
content: PropTypes.number,

PropTypes.string.isRequired,
PropTypes.array.isRequired,
PropTypes.object.isRequired,
PropTypes.number.isRequired,
PropTypes.func.isRequired,
PropTypes.bool.isRequired,
PropTypes.string,
PropTypes.array,
PropTypes.object,
PropTypes.number,


export default class extends Component {
  
}

export default function() {
  
}


const mapStateToProps = state => ({

});

export default connect(mapStateToProps)();
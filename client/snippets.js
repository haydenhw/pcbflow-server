import React, { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';

shortid.generate();

LandingPageCard.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default class extends Component {
  
}

export default function() {
  
}


const mapStateToProps = state => ({

});

export default connect(mapStateToProps)();
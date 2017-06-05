import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownContent(props) {
  const { children, shouldRender } = this.props;
  
  return (
    <div>
      {shouldRender && children}
    </div>
  );
}

DropdownTrigger.propTypes = {
  children.PropTypes.object,
  shouldRender.PropTypes.bool
}
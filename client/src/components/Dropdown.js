import React from 'react';
import PropTypes from 'prop-types';
import DropdownTrigger from 'DropdownTrigger'
import DropdownContent from 'DropdownContent'

export default function DropdownMenu(props) {
  const { children, items, renderMenuItem, shouldRenderMenu } = props;

  const renderList = () => {
    if (shouldRenderMenu) {
      return (
        <List 
          items=
          renderItem={renderMenuItem} 
          wrapperClass="dropdown-content"
        />
      )
    }
  }
  return(
    <div className="dropdown">
    </div>
  );
}

DropdownMenu.propTypes = {
  children.PropTypes.array.isRequired,
}
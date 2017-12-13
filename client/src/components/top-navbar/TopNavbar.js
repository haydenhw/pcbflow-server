import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import PopupMenu from 'components/universal/PopupMenu';
import PopupMenuTrigger from 'components/universal/PopupMenuTrigger';
import PopupMenuContent from 'components/universal/PopupMenuContent';
import TopNavbarEditableText from './TopNavbarEditableText';
import TopNavbarSaveButton from './TopNavbarSaveButton';
import TopNavbarButton from './TopNavbarButton';

import './top-navbar-styles/TopNavbar.css';

const titleStyle = {
  color: 'white',
  fontSize: '20px',
};

export default function TopNavbar(props) {
  const {
    handleExportButtonClick,
    handleHomeButtonClick,
    handleIndexButtonClick,
    handleMenuClick,
    handleSaveButtonCLick,
    handleNameChange,
    isNavMenuActive,
    projectName,
    recordSavedChanges,
    routeToProjects,
    updateLastSaved,
    updateThumbnail,
  } = props;

  return (
    <div className="navWide">
      <div className="iconWrapper" onClick={handleIndexButtonClick}>
        <FontAwesome
          className="fa-folder-open"
          name="fa-folder-open"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
      </div>
      <TopNavbarEditableText
        text={projectName}
        handleNameChange={handleNameChange}
      />

      <div className="nav-button-group">
        <TopNavbarSaveButton
          updateThumbnail={updateThumbnail}
          updateLastSaved={updateLastSaved}
          recordSavedChanges={recordSavedChanges}
        />
        <TopNavbarButton
          className="nav-button export-button"
          handleClick={handleExportButtonClick}
          icon={<FontAwesome name="fa-file-pdf-o" className="fa-file-pdf-o" />}
          text="Export"
        />
        <TopNavbarButton
          className="nav-button home-button"
          handleClick={handleHomeButtonClick}
          icon={<span className="icon-home" />}
          text=""
        />
        <PopupMenu>
          <PopupMenuTrigger handleClick={handleMenuClick}>
            <TopNavbarButton
              className="nav-button"
              icon={<span className="icon-menu" />}
              text=""
            />
          </PopupMenuTrigger>
          <PopupMenuContent isActive={isNavMenuActive}>
            <li className="popup-menu-item">
              <span className="popup-menu-item-icon icon-home" />
              <span className="popup-menu-item-text">Home</span>
            </li>
            <li className="popup-menu-item">
              <FontAwesome name="fa-file-pdf-o" className="popup-menu-item-icon fa-file-pdf-o" />
              <span className="popup-menu-item-text">Export PDF</span>
            </li>
          </PopupMenuContent>
        </PopupMenu>
      </div>
    </div>
  );
}

TopNavbar.propTypes = {
  handleNameChange: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  recordSavedChanges: PropTypes.func.isRequired,
  updateLastSaved: PropTypes.func.isRequired,
  updateThumbnail: PropTypes.func.isRequired,
};

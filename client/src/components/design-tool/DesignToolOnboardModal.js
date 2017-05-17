import React from 'react';

import Modal from 'components/modal/Modal';
import './design-tool-styles/DesignToolOnboardModal.css'

export default function DesignToolOnboardModal() {
  return (
    <Modal>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close">&times;</span>
          <h2>Modal Header</h2>
        </div>
        <div className="modal-body">
          <p>Some text in the Modal Body</p>
          <p>Some other text...</p>
        </div>
        <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>
    </Modal>
  )
}
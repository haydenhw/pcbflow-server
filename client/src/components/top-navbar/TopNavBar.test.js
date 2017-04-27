import React from 'react';
import ReactDOM from 'react-dom';

import { projectsUrl } from '../../config/endpointUrls';
import { SaveButton } from './TopNavbarSaveButton';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SaveButton />, div);
});

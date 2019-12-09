import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import GroopSettings from './GroopSettings';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><GroopSettings /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
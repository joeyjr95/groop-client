import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import RegistrationRoute from './RegistrationRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><RegistrationRoute /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
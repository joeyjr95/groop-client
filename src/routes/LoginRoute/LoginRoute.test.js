import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import LoginRoute from './LoginRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><LoginRoute/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
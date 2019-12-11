import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import EditTask from './EditTask';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EditTask /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
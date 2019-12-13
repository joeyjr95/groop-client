import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><PrivateRoute /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<PrivateRoute />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

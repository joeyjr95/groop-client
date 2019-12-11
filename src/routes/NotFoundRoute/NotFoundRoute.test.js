import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import NotFoundRoute from './NotFoundRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Router><NotFoundRoute /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<NotFoundRoute />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

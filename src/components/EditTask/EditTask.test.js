import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import EditTask from './EditTask';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EditTask /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<EditTask />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

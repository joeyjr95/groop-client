import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from './LoginForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><LoginForm /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<LoginForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

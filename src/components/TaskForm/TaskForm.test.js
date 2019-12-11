import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import TaskForm from './TaskForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {
    path: {
      item_id: 2,
    }
  }
  const location = {
    pathname: '/dasboard'
  }

  ReactDOM.render(<Router><TaskForm location={location} match={match}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<TaskForm location={location} match={match}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

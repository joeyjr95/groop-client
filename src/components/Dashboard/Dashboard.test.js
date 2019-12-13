import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from './Dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {
    path: {
      item_id: 2,
    }
  }

  ReactDOM.render(<Router><Dashboard match={match}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the UI as expected', () => {
  const tree = renderer
    .create(<Dashboard match={match}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

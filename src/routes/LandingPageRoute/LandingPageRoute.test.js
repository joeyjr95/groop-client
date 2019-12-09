import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import LandingPageRoute from './LandingPageRoute';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {
    params: {
      group_id: 3
    },
    path: {
      item_id: 2,
    }
  }
  const user = {
    id: 'username1'
  }

  ReactDOM.render(<Router><LandingPageRoute user={user} match={match}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
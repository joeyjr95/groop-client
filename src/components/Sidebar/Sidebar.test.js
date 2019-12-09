import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from './Sidebar';

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

  ReactDOM.render(<Router><Sidebar user={user} match={match}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
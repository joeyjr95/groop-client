import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Filter from './Filter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {
    path: {
      item_id: 2,
    }
  }

  ReactDOM.render(<Router><Filter match={match}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import TaskItem from './TaskItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {
    path: {
      item_id: 2,
    }
  }
  const task = {
    date_due: '',
    completed: true
  }

  ReactDOM.render(<Router><TaskItem task={task} match={match}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
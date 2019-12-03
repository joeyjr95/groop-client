import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Dashboard.scss';

export default class DashBoardRoute extends Component {
  render() {
    return (
      <div className="dashboard">
        <Dashboard {...this.props} />
        <Sidebar {...this.props} />
      </div>
    );
  }
}

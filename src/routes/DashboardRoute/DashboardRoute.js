import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.scss';

export default class DashBoardRoute extends Component {
  state = {
    showMenu: false,
  };

  hideMenu = () => {
    this.setState({ showMenu: false });
  };

  render() {
    return (
      <div className="dashboard">
        <button
          className="ham-button"
          type="button"
          aria-label="open sidebar"
          onClick={() => this.setState({ showMenu: true })}
        >
          <FontAwesomeIcon icon={faAngleRight} id="openIcon" />
        </button>
        <Dashboard {...this.props} />
        <Sidebar
          {...this.props}
          visibility={this.state.showMenu}
          hideMenu={() => this.hideMenu()}
        />
      </div>
    );
  }
}

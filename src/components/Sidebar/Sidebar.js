import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import GroopContext from '../../contexts/GroopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsersCog,
  faAngleLeft,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Image from './menuIcon.png';

export default class Sidebar extends Component {
  static contextType = GroopContext;

  handleLogout = () => {
    this.props.logout();
  };

  renderSidebar = () => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    const currentGroup = this.context.currentGroup || '';
    const groups = this.context.groups || [];

    const groupLinks = groups.map(group => {
      return <Link to={`../group/${group.group_id}`}>{group.name}</Link>;
    });

    if (path === dashboard) {
      return (
        <div
          className={
            this.props.visibility
              ? 'dashboard-sidenav'
              : 'dashboard-sidenav--hidden dashboard-sidenav'
          }
        >
          <div className="outer-container">
            <nav>
              <button
                className="ham-button-menu"
                type="button"
                onClick={() => this.props.hideMenu()}
              >
                <FontAwesomeIcon icon={faAngleLeft} id="openIcon" />
              </button>
              <Link to="/settings" className="settings-button-menu">
                <FontAwesomeIcon icon={faCog} />
              </Link>
              <Link
                onClick={() => this.handleLogout()}
                to="/login"
                className="settings-button-menu"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Link>
            </nav>
            <div className="sidebar-section-label">
              {this.props.user.username}
            </div>
            <Link to="/add-group">New Group</Link>
            <Link to={`/calendar${this.props.location.pathname}`}>
              Calendar
            </Link>
          </div>
          <div className="groups-container">
            <div className="sidebar-section-label">Groups</div>
            {groupLinks}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            this.props.visibility
              ? 'dashboard-sidenav'
              : 'dashboard-sidenav--hidden dashboard-sidenav'
          }
        >
          <div className="outer-container">
            <nav>
              <button
                className="ham-button-menu"
                type="button"
                onClick={() => this.props.hideMenu()}
              >
                <FontAwesomeIcon icon={faAngleLeft} id="openIcon" />
              </button>
              <Link to="/settings" className="settings-button-menu">
                <FontAwesomeIcon icon={faCog} />
              </Link>
              {currentGroup.owner_id === this.props.user.id ? (
                <Link
                  to={`/groupsettings/${this.props.match.params.group_id}`}
                  className="settings-button-menu"
                >
                  <FontAwesomeIcon icon={faUsersCog} id="groupSettingsIcon" />
                </Link>
              ) : null}
              <Link
                onClick={() => this.handleLogout()}
                to="/login"
                className="settings-button-menu"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Link>
            </nav>
            <div className="sidebar-section-label">
              {this.props.user.username}
            </div>
            <Link to="/dashboard">Dashboard</Link>
            <Link to={`/calendar/${this.props.match.params.group_id}`}>
              Calendar
            </Link>
            <Link to={`/add-task/${this.props.match.params.group_id}`}>
              Add Task
            </Link>
          </div>
        </div>
      );
    }
  };
  render() {
    return this.renderSidebar();
  }
}

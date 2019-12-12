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
      return (
        <Link
          to={`../group/${group.group_id}`}
          key={`group${group.group_id}`}
          className="sb-links"
        >
          {group.name}
        </Link>
      );
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
                aria-label="close sidebar"
                onClick={() => this.props.hideMenu()}
              >
                <div id="sb-close-icon" className="tooltip-wrapper">
                  <FontAwesomeIcon icon={faAngleLeft} id="closeIcon" />
                </div>
              </button>
              <Link
                to="/settings"
                aria-label="account settings"
                className="settings-button-menu"
              >
                <div id="sb-accsettings-icon" className="tooltip-wrapper">
                  <FontAwesomeIcon id="SettingsIcon" icon={faCog} />
                </div>
              </Link>
              <Link
                onClick={() => this.handleLogout()}
                to="/login"
                aria-label="sign out"
                className="settings-button-menu"
              >
                <div id="sb-logout-icon" className="tooltip-wrapper">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
              </Link>
            </nav>
            <div className="sidebar-section-label">
              {this.props.user.username}
            </div>
            <Link to="/add-group" className="sb-links">
              Create Group
            </Link>
            <Link
              to={`/calendar${this.props.location.pathname}`}
              className="sb-links"
            >
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
                aria-label="close sidebar"
                onClick={() => this.props.hideMenu()}
              >
                <FontAwesomeIcon icon={faAngleLeft} id="openIcon" />
              </button>
              <Link
                to="/settings"
                aria-label="account settings"
                className="settings-button-menu"
              >
                <div id="sb-accsettings-icon" className="tooltip-wrapper">
                  <FontAwesomeIcon icon={faCog} />
                </div>
              </Link>
              {currentGroup.owner_id === this.props.user.id ? (
                <Link
                  to={`/groupsettings/${this.props.match.params.group_id}`}
                  aria-label="group-settings"
                  className="settings-button-menu"
                >
                  <div id="sb-gsettings-icon" className="tooltip-wrapper">
                    <FontAwesomeIcon icon={faUsersCog} id="groupSettingsIcon" />
                  </div>
                </Link>
              ) : null}
              <Link
                onClick={() => this.handleLogout()}
                to="/login"
                arialabel="sign out"
                className="settings-button-menu"
              >
                <div id="sb-logout-icon" className="tooltip-wrapper">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
              </Link>
            </nav>
            <div className="sidebar-section-label">
              {this.props.user.username}
            </div>
            <Link to="/dashboard" className="sb-links">
              Dashboard
            </Link>
            <Link
              to={`/calendar/${this.props.match.params.group_id}`}
              className="sb-links"
            >
              Calendar
            </Link>
            <Link
              to={`/add-task/${this.props.match.params.group_id}`}
              className="sb-links"
            >
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

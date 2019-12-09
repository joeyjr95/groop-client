import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import GroopContext from '../../contexts/GroopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { push as Menu } from 'react-burger-menu';
import Image from './menuIcon.png';

export default class Sidebar extends Component {
  static contextType = GroopContext;

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
          <div className="flexbox-container">
            <button
              className="ham-button-menu"
              type="button"
              onClick={() => this.props.hideMenu()}
            ></button>
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
          <div className="stretch"></div>
        </div>
      );
    } else {
      return (
        <div
          className={
            this.props.visibility ? 'sidenav' : 'sidenav--hidden sidenav'
          }
        >
          <div id="outer-container">
            <button
              className="ham-button-menu"
              type="button"
              onClick={() => this.props.hideMenu()}
            ></button>
            <Link to="/dashboard">Dashboard</Link>
            <Link to={`/calendar/${this.props.match.params.group_id}`}>
              Calendar
            </Link>
            <Link to={`/add-task/${this.props.match.params.group_id}`}>
              Add Task
            </Link>
            {currentGroup.owner_id === this.props.user.id ? (
              <Link to={`/groupsettings/${this.props.match.params.group_id}`}>
                <FontAwesomeIcon icon={faUsersCog} id="groupSettingsIcon" />
              </Link>
            ) : (
              <></>
            )}
            {/* </Menu> */}
          </div>
        </div>
      );
    }
  };
  render() {
    return this.renderSidebar();
  }
}

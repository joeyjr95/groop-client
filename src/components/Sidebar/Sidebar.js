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
        <div className="dashboard-sidenav">
          <div className="flexbox-container">
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
        <div className="sidenav">
          <div id="outer-container">
            {/* <Menu */}
            {/*   pageWrapId={'page-wrap'} */}
            {/*   outerContainerId={'outer-container'} */}
            {/*   width={200} */}
            {/*   isOpen={true} */}
            {/*   customBurgerIcon={<img src={Image} />} */}
            {/*   right */}
            {/* > */}
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

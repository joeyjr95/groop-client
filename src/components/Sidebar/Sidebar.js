import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { push as Menu } from "react-burger-menu";
import Image from './menuIcon.png'

export default class Sidebar extends Component {

  renderSidebar = () => {
    const path = this.props.match.path;
    const dashboard = "/dashboard";

    if (path === dashboard) {
      return (
        <div className="dashboard-sidenav">
          <div className="flexbox-container">
            <Link to="/add-group">Add Groop</Link>
            <Link to={`/calendar${this.props.location.pathname}`}>
              Calendar
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="sidenav">
          <div id="outer-container">
            <Menu
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
              width={200}
              isOpen={ true }
              customBurgerIcon={ <img src={Image} /> }
              right
            >
              <Link to="/dashboard">Dashboard</Link>
              <Link to={`/calendar/${this.props.match.params.group_id}`}>
                Calendar
              </Link>
              <Link to={`/add-task/${this.props.match.params.group_id}`}>
                Add Task
              </Link>
              <Link to={`/groupsettings/${this.props.match.params.group_id}`}>
                <FontAwesomeIcon icon={faUsersCog} id="groupSettingsIcon" />
              </Link>
            </Menu>
          </div>
        </div>
      );
    }
  };
  render() {
    console.log(this.props.match.path);
    return this.renderSidebar();
  }
}

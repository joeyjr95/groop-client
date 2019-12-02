import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidenav">
          <div className='flexbox-container'>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/hub">Groops</Link>
        <Link to={`/add-task/${this.props.match.params.group_id}`}>Add Task</Link>
        <Link to="/settings">Settings</Link>
        </div>
      </div>
    );
  }
}

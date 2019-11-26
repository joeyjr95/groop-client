import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./DashboardRoute.scss";

export default class DashBoardRoute extends Component {
  render() {
    return (
      <div className="dashboard">
        <Link
          tag={Link}
          to="/add-task"
          type="button"
          className="NewTaskButton"
        >
          Create New Task
        </Link>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';

import TaskItem from '../../components/TaskItem/TaskItem';

export default class Dashboard extends Component {
  static contextType = GroopContext;
  componentDidMount() {
    this.getAllTasks();
    this.getUserGroups();
  }

  getAllTasks = () => {
    console.log('getting all tasks');
    GroopService.getAllTasks().then(data => {
      this.context.setUserTasks(data);
    });
  };

  getUserGroups = () => {
    GroopService.getUserGroups().then(data => {
      console.log(data);
      this.context.setGroups(data);
    });
  };

  render() {
    const { userTasks = [], groups = [] } = this.context;
    console.log(userTasks);
    return (
      <section className="dashboard-c">
        <h2>My Taskboard</h2>
        <p id="date">Today's date</p>
        <div className="groups">
          <label htmlFor="group-menu" id="label-group-menu">
            Members
          </label>
          <ul className="group-menu" role="menu">
            {groups.map(group => (
              <Link
                key={group.name}
                id={group.name}
                to={`/group/${group.group_id}`}
                aria-live="polite"
              >
                {group.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className="dashboard-task-list-container">
          <div id="dashboard-fixed-container">
            <label htmlFor="dashboard-task-list" id="dashboard-label-task-list">
              Today's tasks
            </label>
          </div>
          <ul className="dashboard-task-list">
            {userTasks.map((task, i) => (
              <TaskItem
                getTasks={() => this.getAllTasks()}
                task={task}
                {...this.props}
                key={`task${i}`}
              />
            ))}
          </ul>
        </div>

        <Link id="group-link" to="/hub">
          Groups
        </Link>
      </section>
    );
  }
}

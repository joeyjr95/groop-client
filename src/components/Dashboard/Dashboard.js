import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';

import TaskItem from '../../components/TaskItem/TaskItem';

export default class Dashboard extends Component {
  static contextType = GroopContext;
  componentDidMount() {
    GroopService.getAllTasks().then(data => {
      this.context.setUserTasks(data);
    });
    GroopService.getUserGroups().then(data => {
      console.log(data);
      this.context.setGroups(data);
    });
  }
  date = (separator=" / ") =>{
    const date = new Date()
    const today = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${month}${separator}${today}${separator}${year}`
  }
  render() {
    
    const { userTasks = [], groups = [] } = this.context;
    console.log(userTasks);
    return (
      <section className="dashboard-c">
        <h2>My Taskboard</h2>
        <p id="date">{this.date()}</p>
      <div className="main-dashboard-section">
        <div className="groups">
          <label htmlFor="group-menu" id="label-group-menu">
            Groups
          </label>
          <ul className="group-menu" role="menu">
            {groups.map(group => (
              <li className="group-list-item"><Link key={group.name} id={group.name} to={`/group/${group.group_id}`} aria-live="polite">
                {group.name}
              </Link></li>
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
              <TaskItem task={task} {...this.props} key={`task${i}`} />
            ))}
          </ul>
        </div>
        </div>
      </section>
    );
  }
}

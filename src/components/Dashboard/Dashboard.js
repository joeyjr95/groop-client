import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import Filter from '../../components/Filter/Filter';
import TaskItem from '../../components/TaskItem/TaskItem';
import moment from 'moment';
import './Dashboard.scss';

export default class Dashboard extends Component {
  static contextType = GroopContext;
  componentDidMount() {
    this.getAllTasks();
    this.getUserGroups();
  }
  getAllTasks = async () => {
    const tasks = await GroopService.getAllTasks();
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let filteredTasks = tasks.filter(task => {
      let task_due_date = new Date(task.date_due);
      return task_due_date >= today ? 1 : 0;
    });
    this.context.setUserTasks(filteredTasks);
    this.context.setFilteredTasks(filteredTasks);
  };

  getUserGroups = () => {
    GroopService.getUserGroups().then(data => {
      this.context.setGroups(data);
    });
  };

  deleteTask = async id => {
    const deleted = await GroopService.apiDeleteTask(id);
    if (deleted == null) {
      let updatedTasks = await GroopService.getAllTasks();
      this.context.setUserTasks(updatedTasks);
      this.context.setFilteredTasks(updatedTasks);
    }
  };

  date = (separator = ' / ') => {
    const date = new Date();
    const today = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}${separator}${today}${separator}${year}`;
  };

  render() {
    const { userTasks = [], groups = [], filteredTasks = [] } = this.context;
    return (
      <section className="dashboard-c">
        <h2>Taskboard</h2>
        <p id="date">{this.date()}</p>
        <div className="filter">
          <Filter {...this.props} />
        </div>
        <div className="main-dashboard-section">
          <div className="groups">
            <label htmlFor="group-menu" id="label-group-menu">
              Groups
            </label>
            <ul className="group-menu" role="menu">
              {groups.map(group => (
                <li className="group-list-item">
                  <Link
                    key={group.name}
                    id={group.name}
                    to={`/group/${group.group_id}`}
                    aria-live="polite"
                  >
                    {group.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="dashboard-task-list-container">
            <div id="dashboard-fixed-container">
              <label
                htmlFor="dashboard-task-list"
                id="dashboard-label-task-list"
              >
                Upcoming Tasks
              </label>
            </div>
            <ul className="dashboard-task-list">
              {filteredTasks.map((task, i) => {
                console.log(task);
                return (
                  <TaskItem
                    getTasks={() => this.getAllTasks()}
                    task={task}
                    {...this.props}
                    key={`task${i}`}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

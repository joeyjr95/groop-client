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
  getAllTasks = () => {
    GroopService.getAllTasks().then(data => {
      const tasksWithDates = this.TasksWithDatesInbetween(data);
      this.context.setUserTasks(tasksWithDates);
      this.context.setFilteredTasks(tasksWithDates);
    });
  };
  TasksWithDatesInbetween = data => {
    let tasksWithDatesFiltered = data.map(tasks => {
      console.log(tasks);
      let taskDates = this.getFullDates(tasks);
      console.log(taskDates);

      return { ...tasks, taskDates };
    });

    let currentDate = moment().format('MMM Do YY');
    let todaysTasks = tasksWithDatesFiltered.filter(tasks => {
      return tasks.taskDates.includes(currentDate);
    });
    return todaysTasks;
  };
  getFullDates = data => {
    let dates = [],
      currentDate = new Date(data.time_start),
      addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= new Date(data.date_due)) {
      dates.push(moment(currentDate).format('MMM Do YY'));
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  getUserGroups = () => {
    GroopService.getUserGroups().then(data => {
      console.log(data);
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
                Today's tasks
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

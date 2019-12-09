import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import Filter from '../../components/Filter/Filter';
import TaskItem from '../../components/TaskItem/TaskItem';
//mport moment from 'moment';

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

    // filter expired tasks (date due before today)
    let filteredTasks = tasks.filter(task => {
      let task_due_date = new Date(task.date_due);
      return task_due_date >= today ? 1 : 0;
    });

    // sort by ascending date due
    filteredTasks.sort((a, b) => {
      return new Date(a.date_due) < new Date(b.date_due) ? false : true;
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
    const { filteredTasks = [] } = this.context;
    return (
      <section className="dashboard-c">
        <h2>Agenda</h2>
        <p id="date">{this.date()}</p>
        <Filter {...this.props} />
        <div className="main-dashboard-section">
          <div className="dashboard-task-list-container">
            <label htmlFor="dashboard-task-list" id="dashboard-label-task-list">
              Upcoming Tasks
            </label>
            <ul className="dashboard-task-list">
              {filteredTasks.length !== 0 ? (
                filteredTasks.map((task, i) => {
                  console.log(task);
                  return (
                    <TaskItem
                      getTasks={() => this.getAllTasks()}
                      task={task}
                      {...this.props}
                      key={`task${i}`}
                    />
                  );
                })
              ) : (
                <div className="empty-list">
                  No Tasks Available.
                  <ol >
                    <li id="grouplink"> <Link to="/add-group">Create a group</Link> to get started. </li>
                    <li> After the group is created, click the group's name on the sidebar under the "Groups" section to create a task.</li>
                    </ol>
                </div>
              )}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

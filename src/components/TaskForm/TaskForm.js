import React, { Component } from 'react';
// import config from "../../config";
// import TokenService from "../../services/token-service";
import GroopService from '../../services/groop-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import './TaskForm.scss';

export default class TaskForm extends Component {
  static contextType = UserContext;
  state = {
    categories: [],
    tasks: [],
    error: null,
    name: {
      value: '',
      touched: false,
    },
    description: {
      value: '',
      touched: false,
    },
    date_due: {
      date: new Date().toISOString().substring(0, 10),
      time: '00:00',
      touched: false,
    },
    time_start: {
      date: new Date().toISOString().substring(0, 10),
      time: '00:00',
      touched: false,
    },
    category: {
      value: 1,
      touched: false,
    },
    priority: {
      value: 1,
      touched: false,
    },
  };

  componentDidMount = () => {
    const group_id = Number(this.props.location.pathname.split('/')[2]);
    this.setState({
      group_id,
    });
    GroopService.getCategories(group_id).then(data =>
      this.setState({ categories: data }),
    );
  };

  handleSubmit = async () => {
    const newTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      user_assigned_id: this.context.user.id,
      time_start: `${this.state.time_start.date}T${this.state.time_start.time}`,
      date_due: `${this.state.date_due.date}T${this.state.date_due.time}`,
      group_id: this.state.group_id,
      priority: parseInt(this.state.priority.value),
      category_id: parseInt(this.state.category.value),
    };

    console.log(newTask);

    const returnedNewTask = await GroopService.postTask(newTask);
    if (!returnedNewTask) {
      this.setState({ error: 'error creating new task' });
    } else {
      this.props.history.goBack();
    }
  };

  handleCategory = value => {
    this.setState({ category: { value, touched: true } });
  };

  handleChangeTaskname = value => {
    this.setState({ name: { value, touched: true } });
  };

  handleChangeTaskdescription = value => {
    this.setState({ description: { value, touched: true } });
  };

  handleChangeTaskDueDate = date => {
    this.setState({
      date_due: { ...this.state.date_due, date, touched: true },
    });
  };
  handleChangeTaskDueDateTime = time => {
    this.setState({
      date_due: { ...this.state.date_due, time, touched: true },
    });
  };
  handleChangeTaskTimeStart = date => {
    this.setState({
      time_start: { ...this.state.time_start, date, touched: true },
    });
  };
  handleChangeTaskTimeStartTime = time => {
    this.setState({
      time_start: { ...this.state.time_start, time, touched: true },
    });
  };
  onPriorityChange = value => {
    this.setState({ priority: { value, touched: true } });
  };

  render() {
    const { categories = [] } = this.state;

    return (
      <section>
        <form className="AddTaskForm">
          <h2>Add Task</h2>
          <label htmlFor="addTaskname" className="AddTaskLabel">
            Task Name
          </label>
          <input
            type="text"
            id="addtaskname"
            name="addtaskname"
            onChange={e => this.handleChangeTaskname(e.target.value)}
            value={this.state.name.value}
          />
          <label htmlFor="taskdescription">Task Description</label>
          <input
            type="textarea"
            name="taskdescription"
            id="taskdescription"
            onChange={e => this.handleChangeTaskdescription(e.target.value)}
            value={this.state.description.value}
          />

          <div className="TaskContainer">
            <div className="dateContainer">
              <div className="task-start">
                <label htmlFor="addTaskTimeStart" className="AddTaskTimeStart">
                  Start Date
                </label>
                <input
                  className="dateInput"
                  type="date"
                  id="addTaskTimeStart"
                  name="addTaskTimeStart"
                  value={this.state.time_start.date}
                  onChange={e => this.handleChangeTaskTimeStart(e.target.value)}
                />
                <label
                  htmlFor="addTaskTimeStart--time"
                  className="AddTaskTimeStart"
                >
                  Start Time
                </label>
                <input
                  className="dateInput"
                  type="time"
                  id="addTaskTimeStart--time"
                  name="addTaskTimeStart--time"
                  value={this.state.time_start.time}
                  onChange={e =>
                    this.handleChangeTaskTimeStartTime(e.target.value)
                  }
                />
              </div>
              <div className="task-end">
                <label htmlFor="addtaskduedate" className="AddTaskDueDate">
                  Due Date
                </label>
                <input
                  className="dateInput"
                  type="date"
                  id="addtaskduedate"
                  name="addtaskduedate"
                  value={this.state.date_due.date}
                  onChange={e => this.handleChangeTaskDueDate(e.target.value)}
                />
                <label
                  htmlFor="addtaskduedate--time"
                  className="AddTaskDueDate"
                >
                  Due Date
                </label>
                <input
                  className="dateInput"
                  type="time"
                  id="addtaskduedate--time"
                  name="addtaskduedate--time"
                  value={this.state.date_due.time}
                  onChange={e =>
                    this.handleChangeTaskDueDateTime(e.target.value)
                  }
                />
              </div>
            </div>

            <label htmlFor="addtaskcategory" className="AddTaskCategory">
              Category
            </label>
            <select
              name="Categories"
              onChange={e => this.handleCategory(e.target.value)}
            >
              {categories.map(category => (
                <option
                  key={`category_${category.id}`}
                  id={category.id}
                  name={category.category_name}
                  value={category.id}
                >
                  {category.category_name}
                </option>
              ))}
            </select>

            <label htmlFor="Priorities" className="Priorities">
              Priority
            </label>
            <select
              name="Priorities"
              onChange={e => this.onPriorityChange(e.target.value)}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
          <div>
            <Button type="button" onClick={this.handleSubmit}>
              Create New Task
            </Button>
            <Button
              type="button"
              onClick={() => this.props.history.goBack()}
              className="ButtonCancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

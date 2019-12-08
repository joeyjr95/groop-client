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
    time_end: {
      value: '',
      touched: false,
    },
    description: {
      value: '',
      touched: false,
    },
    date_due: {
      value: '',
      touched: false,
    },
    time_start: {
      value: '',
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
      time_start: this.state.time_start.value,
      date_due: this.state.date_due.value,
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

  handleChangeTaskDueDate = value => {
    this.setState({ date_due: { value, touched: true } });
  };
  handleChangeTaskTimeStart = value => {
    this.setState({ time_start: { value, touched: true } });
  };
  onPriorityChange = value => {
    this.setState({ priority: { value, touched: true } });
  };

  handleChangeTaskStartDate = value => {
    this.setState({ time_start: { value, touched: true } });
  };

  render() {
    const { categories = [] } = this.state;

    return (
      <section>
        <form className="AddTaskForm">
          <h2>Add Task</h2>
          <br />
          <label htmlFor="addTaskname" className="AddTaskLabel">
            Task Name
          </label>
          <br />
          <input
            type="text"
            id="addtaskname"
            name="addtaskname"
            onChange={e => this.handleChangeTaskname(e.target.value)}
            value={this.state.name.value}
          />
          <br />
          <label htmlFor="taskdescription">Task Description</label>
          <br />
          <input
            type="textarea"
            name="taskdescription"
            id="taskdescription"
            onChange={e => this.handleChangeTaskdescription(e.target.value)}
            value={this.state.description.value}
          />

          <div className="TaskContanier">
            <div className="LeftCont">
              <br />
              <label htmlFor="addTaskTimeStart" className="AddTaskTimeStart">
                Start Date
              </label>
              <br />
              <input
                className="dateInput"
                type="datetime-local"
                id="addTaskTimeStart"
                name="addTaskTimeStart"
                value={this.state.time_start.value}
                onChange={e => this.handleChangeTaskTimeStart(e.target.value)}
              />

              <label htmlFor="addtaskcategory" className="AddTaskCategory">
                Category
              </label>
              <br />
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
            </div>

            <div className="RightCont">
              <br />
              <label htmlFor="addtaskduedate" className="AddTaskDueDate">
                Due Date
              </label>
              <br />
              <input
                className="dateInput"
                type="datetime-local"
                id="addtaskduedate"
                name="addtaskduedate"
                value={this.state.date_due.value}
                onChange={e => this.handleChangeTaskDueDate(e.target.value)}
              />
              <div className="RightCont">
                <label htmlFor="Priorities" className="Priorities">
                  Priority
                </label>
                <br />
                <select
                  name="Priorities"
                  onChange={e => this.onPriorityChange(e.target.value)}
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="FilterButtonContainer">
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

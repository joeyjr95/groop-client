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
      value: '2049-06-30',
      touched: false,
    },
  };

  componentDidMount = () => {
    const group_id = Number(this.props.location.pathname.split('/')[2]);
    this.setState({
      group_id,
    });
  };

  handleSubmit = async () => {
    const newTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      user_assigned_id: this.context.user.id,
      date_due: this.state.date_due.value,
      group_id: this.state.group_id,
    };

    const returnedNewTask = await GroopService.postTask(newTask);
    if (!returnedNewTask) {
      this.setState({ error: 'error creating new task' });
    } else {
      this.props.history.goBack();
    }
  };

  handleChangeTaskname= (value)  => {
    this.setState({ name: { value, touched: true } });
  };

  handleChangeTaskdescription =(value)  => {
    this.setState({ description: { value, touched: true } });
  };

  handleChangeTaskDueDate = (value) => {
    this.setState({ date_due: { value, touched: true } });
  };

  render() {
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
            value ={this.state.description.value}
          />

          <br />
          <label htmlFor="addtaskduedate" className="AddTaskDueDate">
            Due Date
          </label>
          <br />
          <input
            className="dateInput"
            type="date"
            id="addtaskduedate"
            name="addtaskduedate"
            value={this.state.date_due.value}
            onChange={e => this.handleChangeTaskDueDate(e.target.value)}
          />
          <Button
            type="button"
            onClick={this.handleSubmit}
            className="AddTaskButton"
          >
            Create New Task
          </Button>
          <Button
            type="button"
            onClick={() => this.props.history.goBack()}
            className="cancelAddTaskButton"
          >
            Cancel
          </Button>
        </form>
      </section>
    );
  }
}

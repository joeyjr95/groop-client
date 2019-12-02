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
      value: '',
      touched: false,
    },
    creator_id: {
      value: '',
      touched: false,
    },
  };

  handleSubmit = e => {
    e.preventDefault();
    const newTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      user_assigned_id: this.context.user.id,
      date_due: this.state.date_due.value,
      group_id: parseInt(1),
    };
    console.log(newTask);
    GroopService.postTask(newTask);
  };

  handleChangeTaskname = e => {
    this.setState({ name: { value: e.target.value, touched: true } });
  };

  handleChangeTaskdescription = e => {
    this.setState({ description: { value: e.target.value, touched: true } });
  };
  // handleChangeTaskuser_assigned_id = e => {
  //   this.setState({ user_assigned_id: { value: e.target.value, touched: true } });
  // };
  handleChangeTaskDueDate = e => {
    this.setState({ date_due: { value: e.target.value, touched: true } });
  };

  render() {
    // console.log(this.state.name.value)
    // console.log(this.state.user_assigned_id.value)
    // console.log(this.state.date_due.value)
    // console.log(this.state.description.value)
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
            onChange={this.handleChangeTaskname}
          />
          <br />
          <label htmlFor="taskdescription">Task Description</label>
          <br />
          <input
            type="textarea"
            name="taskdescription"
            id="taskdescription"
            onChange={this.handleChangeTaskdescription}
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
            value="1980-08-26"
            onChange={this.handleChangeTaskDueDate}
          />
          <Button
            type="submit"
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

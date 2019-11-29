import React, { Component } from 'react';
// import config from "../../config";
// import TokenService from "../../services/token-service";
import GroopService from '../../services/groop-service';
import UserContext from '../../contexts/UserContext';
import './EditTask.scss';

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
  };

  handleSubmit = e => {
    e.preventDefault();
    const editedTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      date_due: this.state.date_due.value,
      user_assigned_id: this.state.user_assigned_id.value,
      completed: this.state.completed.value,
    };
    console.log(editedTask);
    GroopService.postTask(editedTask);
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
      <section className="edit-task-form">
        <form>
          <h2>Edit Task</h2>
          <label htmlFor="edit-task-name">Task name</label>
          <input
            type="text"
            id="edit-task-name"
            name="edit-task-name"
            onChange={this.handleChangeTaskname}
          />
          {/* {this.state.name.touched && (
            <div className="error">{this.validatename()}</div>
          )} */}
          <label htmlFor="edit-task-due-date">Due Date</label>
          <input
            type="date"
            id="edit-task-due-date"
            name="edit-task-due-date"
            onChange={this.handleChangeTaskDueDate}
          />
          {/* {this.state.year_released.touched && (
            <div className="error">{this.validateDueDate()}</div>
          )} */}
          <label htmlFor="edit-task-completed">Status</label>
          <input
            type="checkbox"
            id="edit-task-completed"
            name="edit-task-completed"
            onChange={this.handleChangeTaskCompleted}
          />
          <label htmlFor="edit-task-assignment">Assigned to</label>
          <select
            id="edit-task-assignment"
            name="edit-task-assignment"
            onChange={this.handleChangeTaskAssignment}
          ></select>
          <label htmlFor="edit-task-desc">Task description</label>
          <input
            id="edit-task-desc"
            name="edit-task-desc"
            onChange={this.handleChangeTaskdescription}
          />
          {/* {this.state.description.touched && (
            <div className="error">{this.validatedescription()}</div>
          )} */}
          <button
            type="submit"
            onClick={this.handleSubmit}
            // disabled={
            //   // this.validatename() ||
            //   // this.validateDueDate() ||
            //   // this.validatedescription() ||
            //   // this.validateuser_assigned_id()
            // }
            className="AddTaskButton"
          >
            Create New Task
          </button>
        </form>
      </section>
    );
  }
}

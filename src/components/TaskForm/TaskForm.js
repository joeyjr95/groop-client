import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../services/token-service";
import GroopService from "../../services/groop-service";
import UserContext from "../../contexts/UserContext";
import "./TaskForm.scss";

export default class TaskForm extends Component {
  static contextType = UserContext;
  state = {
    tasks: [],
    error: null,
    name: {
      value: "",
      touched: false
    },
    description: {
      value: "",
      touched: false
    },
    date_due: {
      value: "",
      touched: false
    },
    creator_id: {
      value: "",
      touched: false
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      user_assigned_id: this.context.user.id,
      date_due: this.state.date_due.value,
      group_id: parseInt(1)
    };
    console.log(newTask)
    GroopService.postTask(newTask)

  }

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


  // validatename() {
  //   const name = this.state.name.value.trim();
  //   if (name.length === 0) {
  //     return "Name is required";
  //   }
  // }

  // validatedescription() {
  //   const description = this.state.description.value.trim();
  //   if (description.length === 0) {
  //     return "description is required";
  //   }
  // }
  
  render() {
    // console.log(this.state.name.value)
    // console.log(this.state.user_assigned_id.value)
    // console.log(this.state.date_due.value)
    // console.log(this.state.description.value)
    return (
      <section className="AddTaskForm">
        <form>
          <h2>Add Task</h2>< br/>
          <label htmlFor="addTaskname" className="AddTaskLabel">
            Task name
          </label>
          <input
            type="text"
            id="addtaskname"
            name="addtaskname"
            onChange={this.handleChangeTaskname}
          />
          {/* {this.state.name.touched && (
            <div className="error">{this.validatename()}</div>
          )} */}
          <br />
          <br />
          <label htmlFor="addtaskduedate" className="AddTaskDueDate">
            Due Date
          </label>
          <br />
          <input
            type="date"
            id="addtaskduedate"
            name="addtaskduedate"
            onChange={this.handleChangeTaskDueDate}
          />
          {/* {this.state.year_released.touched && (
            <div className="error">{this.validateDueDate()}</div>
          )} */}
          <br />
          <label htmlFor="taskdescription">Task description</label>
          <br />
          <input
            name="taskdescription"
            id="taskdescription"
            onChange={this.handleChangeTaskdescription}
          />
          {/* {this.state.description.touched && (
            <div className="error">{this.validatedescription()}</div>
          )} */}
          <br />
          <br />
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

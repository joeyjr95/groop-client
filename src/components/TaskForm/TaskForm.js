import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./TaskForm.css";

export default class TaskForm extends Component {
  state = {
    tasks: [],
    error: null,
    title: {
      value: "",
      touched: false
    },
    info: {
      value: "",
      touched: false
    },
    due_date: {
      value: "",
      touched: false
    },
    task_assignee: {
      value: "",
      touched: false
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: this.state.title.value,
      info: this.state.info.value,
      due_date: this.state.due_date.value,
      assignee: this.state.task_assignee.value,
      groop_id: parseInt(this.props.location.state.collection_id)
    };
    fetch(`${config.API_ENDPOINT}/tasks`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
        return res.json();
      })
      .then(resData => {
        this.setState({
          tasks: resData
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleChangeTaskTitle = e => {
    this.setState({ title: { value: e.target.value, touched: true } });
  };

  handleChangeTaskInfo = e => {
    this.setState({ info: { value: e.target.value, touched: true } });
  };

  validateTitle() {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return "Name is required";
    }
  }

  validateInfo() {
    const info = this.state.info.value.trim();
    if (info.length === 0) {
      return "Info is required";
    }
  }
  
  render() {
    return (
      <section className="AddTaskForm">
        <form>
          <h2>Add Task</h2>< br/>
          <label htmlFor="addTasktitle" className="AddTaskLabel">
            Task Title
          </label>
          <input
            type="text"
            id="addtasktitle"
            name="addtasktitle"
            onChange={this.handleChangeTaskTitle}
          />
          {this.state.title.touched && (
            <div className="error">{this.validateTitle()}</div>
          )}
          <br />
          <label htmlFor="addtaskassignee" className="AddTaskAssignee">
            Task Assignee
          </label>
          <input
            type="text"
            id="addtaskassignee"
            name="addtaskassignee"
            onChange={this.handleChangeTaskAssignee}
          />
          {this.state.image_url.touched && (
            <div className="error">{this.validateAssignee()}</div>
          )}
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
          {this.state.year_released.touched && (
            <div className="error">{this.validateDueDate()}</div>
          )}
          <br />
          <label htmlFor="taskInfo">Task Info</label>
          <br />
          <textarea
            name="taskInfo"
            id="taskInfo"
            onChange={this.handleChangeTaskInfo}
          />
          {this.state.info.touched && (
            <div className="error">{this.validateInfo()}</div>
          )}
          <br />
          <br />
          <button
            type="submit"
            onClick={this.handleSubmit}
            disabled={
              this.validateTitle() ||
              this.validateDueDate() ||
              this.validateInfo() ||
              this.validateAssignee()
            }
            className="AddTaskButton"
          >
            Create New Task
          </button>
        </form>
      </section>
    );
  }
}

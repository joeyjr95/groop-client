import React, { Component } from 'react';
// import config from "../../config";
// import TokenService from "../../services/token-service";
//import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import { Input, Textarea } from '../Form/Form';
import './EditTask.scss';

export default class EditTask extends Component {
  static contextType = UserContext;
  state = {
    task: null,
    error: null,
    categories: [],
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
      value: '',
      touched: false,
    },
    priority: {
      value: '',
      touched: false,
    },
    user_assigned_id: {
      value: '',
      touched: false,
    },
    members: [],
    confirmDelete: false,
  };

  componentDidMount = async () => {
    const taskId = this.props.location.pathname.split('/')[2];
    const task = await GroopService.getTaskById(taskId);
    const members = await GroopService.getGroupMembers(task.group_id);
    const categories = await GroopService.getCategories(task.group_id);

    this.setState({
      name: { value: task.name, touched: false },
      description: { value: task.description, touched: false },
      date_due: {
        date: task.date_due.substring(0, 10),
        time: task.date_due.substring(11, 16),
        touched: false,
      },
      time_start: {
        date:
          task.time_start == null
            ? new Date().toISOString().substring(0, 10)
            : task.time_start.substring(0, 10),
        time:
          task.time_start == null ? '00:00' : task.time_start.substring(11, 16),
        touched: false,
      },
      user_assigned_id: { value: task.user_assigned_id, touched: false },
      members,
      taskId,
      categories,
      category: { value: task.category_id, touched: false },
      priority: { value: task.priority, touched: false },
      completed: task.completed,
    });
  };

  handleSubmit = async () => {
    const editedTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      time_start: `${this.state.time_start.date}T${this.state.time_start.time}`,
      date_due: `${this.state.date_due.date}T${this.state.date_due.time}`,
      user_assigned_id: this.state.user_assigned_id.value,
      priority: this.state.priority.value,
      category_id: this.state.category.value,
      completed: this.state.completed,
    };

    const returnedTask = await GroopService.apiPatchTask(
      this.state.taskId,
      editedTask,
    );
    if (!returnedTask) {
    } else {
      this.props.history.goBack();
    }
  };

  deleteTask = async () => {
    const deleted = await GroopService.apiDeleteTask(this.state.taskId);
    if (deleted == null) {
      this.props.history.goBack();
    }
  };

  requestDelete = () => {
    this.setState({ confirmDelete: true });
  };

  cancelDelete = () => {
    this.setState({ confirmDelete: false });
  };

  handleChangeTaskname = value => {
    this.setState({ name: { value, touched: true } });
  };

  handleChangeTaskdescription = value => {
    this.setState({ description: { value, touched: true } });
  };
  handleChangeTaskAssignment = value => {
    this.setState({ user_assigned_id: { value, touched: true } });
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
  handleCategory = value => {
    this.setState({ category: { value: parseInt(value), touched: true } });
  };
  onPriorityChange = value => {
    this.setState({ priority: { value: parseInt(value), touched: true } });
  };

  render() {
    const { categories = [] } = this.state;
    const deleteUi = this.state.confirmDelete ? (
      <div className="delete-confirmation">
        <Button
          type="button"
          onClick={() => this.deleteTask()}
          className="ButtonCancel"
        >
          Confirm
        </Button>
        <Button
          type="button"
          onClick={() => this.cancelDelete()}
          className="cancelDeleteButton"
        >
          Cancel
        </Button>
      </div>
    ) : (
      <Button
        type="button"
        onClick={() => this.requestDelete()}
        className="ButtonCancel"
      >
        Delete
      </Button>
    );
    const memberOptions = this.state.members.map(member => (
      <option key={`member${member.member_id}`} value={member.member_id}>
        {member.username}
      </option>
    ));
    return (
      <section className="edit-task-form">
        <form>
          <h2>Edit Task</h2>
          <label htmlFor="edit-task-name">Task name</label>
          <Input
            type="text"
            id="edit-task-name"
            name="edit-task-name"
            onChange={e => this.handleChangeTaskname(e.target.value)}
            value={this.state.name.value}
          />
          {/* {this.state.name.touched && (
            <div className="error">{this.validatename()}</div>
          )} */}
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
              <label htmlFor="addtaskduedate--time" className="AddTaskDueDate">
                Due Date
              </label>
              <input
                className="dateInput"
                type="time"
                id="addtaskduedate--time"
                name="addtaskduedate--time"
                value={this.state.date_due.time}
                onChange={e => this.handleChangeTaskDueDateTime(e.target.value)}
              />
            </div>
          </div>

          {/* {this.state.year_released.touched && (
            <div className="error">{this.validateDueDate()}</div>
          )} */}
          <label htmlFor="edit-task-assignment">Assigned to</label>
          <select
            id="edit-task-assignment"
            name="edit-task-assignment"
            onChange={e => this.handleChangeTaskAssignment(e.target.value)}
            value={this.state.user_assigned_id.value}
          >
            {memberOptions}
          </select>

          <label htmlFor="addtaskcategory" className="AddTaskCategory">
            Category
          </label>
          <select
            name="Categories"
            onChange={e => this.handleCategory(e.target.value)}
            value={this.state.category.value}
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
            value={this.state.priority.value}
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>

          <label htmlFor="edit-task-desc">Task description</label>
          <Textarea
            id="edit-task-desc"
            name="edit-task-desc"
            onChange={e => this.handleChangeTaskdescription(e.target.value)}
            value={this.state.description.value}
          />
          {/* {this.state.description.touched && (
            <div className="error">{this.validatedescription()}</div>
          )} */}
          <div className="EditTaskButtonContainer">
            <Button
              type="button"
              onClick={() => this.handleSubmit()}
              // disabled={
              //   // this.validatename() ||
              //   // this.validateDueDate() ||
              //   // this.validatedescription() ||
              //   // this.validateuser_assigned_id()
              // }
              className="editTaskButton"
            >
              Save
            </Button>
            {deleteUi}
            <Button
              type="button"
              onClick={() => this.props.history.goBack()}
              className="cancelEditTaskButton"
            >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

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
    user_assigned_id: {
      value: '',
      touched: false,
    },
    members: [],
    confirmDelete: false,
  };

  async componentDidMount() {
    const taskId = this.props.location.pathname.split('/')[2];
    const task = await GroopService.getTaskById(taskId);
    const members = await GroopService.getGroupMembers(task.group_id);

    this.setState({
      name: { value: task.name, touched: false },
      description: { value: task.description, touched: false },
      date_due: { value: task.date_due.substring(0, 10), touched: false },
      user_assigned_id: { value: task.user_assigned_id, touched: false },
      members,
      taskId,
    });
  }

  async handleSubmit() {
    const editedTask = {
      name: this.state.name.value,
      description: this.state.description.value,
      date_due: this.state.date_due.value,
      user_assigned_id: this.state.user_assigned_id.value,
    };
    const returnedTask = await GroopService.apiPatchTask(
      this.state.taskId,
      editedTask,
    );
    if (!returnedTask) {
    } else {
      this.props.history.goBack();
    }
  }

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
  handleChangeTaskDueDate = value => {
    this.setState({ date_due: { value, touched: true } });
  };

  render() {
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
        {member.fullname}
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
          <label htmlFor="edit-task-due-date">Due Date</label>
          <input
            type="date"
            id="edit-task-due-date"
            name="edit-task-due-date"
            onChange={e => this.handleChangeTaskDueDate(e.target.value)}
            value={this.state.date_due.value}
          />
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

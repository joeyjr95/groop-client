import React from 'react';
import { Link } from 'react-router-dom';
import GroopService from '../../services/groop-service';
import Button from '../Button/Button';
import './TaskItem.scss';

export default class TaskItem extends React.Component {
  goEdit = id => {
    this.props.history.push(`/edit-task/${id}`);
  };

  state = {
    completed: true,
    id: '',
    name: '',
    description: '',
    user_assigned_id: '',
    delete_confirm: false,
  };

  componentDidMount = () => {
    this.setState({
      completed: this.props.task.completed,
      id: this.props.task.id,
      name: this.props.task.name,
      description: this.props.task.description,
      user_assigned_id: this.props.task.user_assigned_id,
    });
  };

  toggleTaskCompleted = async () => {
    const newStatus = this.state.completed ? false : true;
    const newTask = await GroopService.apiPatchTask(this.props.task.id, {
      completed: newStatus,
    });

    if (!newTask) {
      console.log(`toggle didn't work`);
    } else {
      this.setState({ completed: newTask.completed });
    }
  };

  tryDelete = () => {
    this.setState({ delete_confirm: true });
  };

  handleDeleteActions = () => {
    if (this.state.delete_confirm) {
      this.deleteTask();
    } else {
      this.tryDelete();
    }
  };

  deleteTask = async () => {
    const deleted = await GroopService.apiDeleteTask(this.props.task.id);
    if (deleted == null) {
      this.props.getTasks();
    }
  };

  render() {
    return (
      <li className="task-item">
        <input
          id={`task-item-check-${this.props.task.id}`}
          type="checkbox"
          className="task-item__check"
          onChange={() => this.toggleTaskCompleted()}
          value={this.state.completed}
          checked={this.state.completed ? 1 : 0}
        />
        <label
          id={`task-item-check-label-${this.props.task.id}`}
          className="task-item__check-label"
          htmlFor={`task-item-check-${this.props.task.id}`}
        ></label>
        <div className="task-item__info">
          <h3 className="task-item__name">{this.state.name} </h3>
          <p className="task-item__description">{this.state.description}</p>
        </div>
        <div className="task-item__actions">
          <Button
            type="button"
            onClick={() => this.goEdit(this.props.task.id)}
            className="task-item__edit"
          >
            Edit
          </Button>
          <Button type="button" className="task-item__more">
            More
          </Button>
          <Button
            type="button"
            onClick={() => this.handleDeleteActions()}
            className={
              this.state.delete_confirm
                ? 'task-item__delete--confirm'
                : 'task-item__delete'
            }
          >
            {this.state.delete_confirm ? 'confirm' : 'delete'}
          </Button>
        </div>
      </li>
    );
  }
}

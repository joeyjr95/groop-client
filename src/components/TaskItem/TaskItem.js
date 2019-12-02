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
    completed: false,
  };

  async componentDidMount() {
    this.setState({
      completed: this.props.task.completed,
    });
  }

  async toggleTaskCompleted() {
    let newTask;
    this.setState(
      {
        completed: !this.state.completed,
      },
      (newTask = await GroopService.apiPatchTask(this.props.task.id, {
        completed: this.state.completed,
      })),
    );

    if (!newTask) {
      console.log(`toggle didn't work`);
    } else {
      console.log(`toggle worked`);
    }
  }

  render() {
    return (
      <li className="task-item">
        <input
          id={`task-item-check-${this.props.task.id}`}
          type="checkbox"
          className="task-item__check"
          onClick={() => this.toggleTaskCompleted()}
        />
        <label
          id={`task-item-check-label-${this.props.task.id}`}
          className="task-item__check-label"
          htmlFor={`task-item-check-${this.props.task.id}`}
        ></label>
        <div className="task-item__info">
          <h3 className="task-item__name">{this.props.task.name} </h3>
          <p className="task-item__description">
            {this.props.task.description}
          </p>
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
          <Button type="button" className="task-item__more">
            Delete
          </Button>
        </div>
      </li>
    );
  }
}

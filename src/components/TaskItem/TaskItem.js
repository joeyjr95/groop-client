import React from 'react';
import GroopService from '../../services/groop-service';
import Button from '../Button/Button';
import './TaskItem.scss';

export default class TaskItem extends React.Component {
  goEdit = id => {
    this.props.history.push(`/edit-task/${id}`);
  };

  state = {
    completed: this.props.task.completed,
    id: this.props.task.id,
    name: this.props.task.name,
    description: this.props.task.description,
    date_due: this.props.task.date_due.substring(0, 10),
    user_assigned_id: this.props.task.user_assigned_id,
    delete_confirm: false,
    showMore: false,
  };

  componentDidMount = async () => {};

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
      this.props.deleteTask(this.state.id);
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
    const task = this.props.task;
    const taskDetail = this.state.showMore ? (
      <div className="task-detail">
        <div className="task-detail-spacer"></div>
        <div className="task-detail__info">
          {!this.props.dashboard ? (
            <p className="task-detail__item">
              <b>Assigned to:</b> {task.username}
            </p>
          ) : null}
          <p className="task-detail__item">
            <b>Start Time:</b>{' '}
            {new Date(task.time_start).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
          <p className="task-detail__item">
            <b>Category:</b> {task.category_name}
          </p>
          <p className="task-detail__item">
            <b>Description:</b> {task.description}
          </p>
        </div>
        <div className="task-detail-spacer2"></div>
      </div>
    ) : null;
    const taskItemPriority =
      task.priority === 3 ? (
        <>
          <div className="priority-box priority-box--high" />
          <div className="priority-box priority-box--high" />
          <div className="priority-box priority-box--high" />
        </>
      ) : task.priority === 2 ? (
        <>
          <div className="priority-box priority-box--med" />
          <div className="priority-box priority-box--med" />
        </>
      ) : (
        <>
          <div className="priority-box priority-box--low" />
        </>
      );

    return (
      <li
        className={
          this.state.completed ? 'task-item task-item--complete' : 'task-item'
        }
      >

        <input
          id={`task-item-check-${task.id}`}
          type="checkbox"
          className="task-item__check"
          onChange={() => this.toggleTaskCompleted()}
          onMouseDown={e => e.preventDefault()}
          value={this.state.completed}
          checked={this.state.completed ? 1 : 0}
        />
        <label
          id={`task-item-check-label-${task.id}`}
          className="task-item__check-label"
          htmlFor={`task-item-check-${task.id}`}
          onMouseDown={e => e.preventDefault()}
        ></label>
        <div className="task-item__info">
          <h3
            className={
              this.state.completed
                ? 'task-item__name task-item__name--complete'
                : 'task-item__name'
            }
          >
            {task.name}{' '}
          </h3>
          <h4 className="task-item__date_due">
            Due{' '}
            {new Date(task.date_due).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </h4>
          <p className="task-item__description">{task.description}</p>
        </div>
        <div className="task-item__actions">
          <Button
            type="button"
            onClick={() => this.goEdit(task.id)}
            className="task-item__edit"
          >
            Edit
          </Button>
        </div>
      </li>
    );
  }
}

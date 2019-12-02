import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './TaskItem.scss';

export default function TaskItem(props) {
  function goEdit(id) {
    console.log('edit button clicked');
    props.history.push(`/edit-task/${id}`);
  }
  return (
    <li className="task-item">
      <input
        id={`task-item-check-${props.task.id}`}
        type="checkbox"
        className="task-item__check"
      />
      <label
        id={`task-item-check-label-${props.task.id}`}
        className="task-item__check-label"
        htmlFor={`task-item-check-${props.task.id}`}
      ></label>
      <div className="task-item__info">
        <h3 className="task-item__name">{props.task.name} </h3>
        <p className="task-item__description">{props.task.description}</p>
      </div>
      <div className="task-item__actions">
        <Button
          type="button"
          onClick={() => goEdit(props.task.id)}
          className="task-item__edit"
        >
          edit
        </Button>
        <Button type="button" className="task-item__more">
          show more
        </Button>
      </div>
    </li>
  );
}

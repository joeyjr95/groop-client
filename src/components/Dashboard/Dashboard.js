import React, { Component } from "react";
import { Link } from "react-router-dom";
import GroopContext from "../../contexts/GroopContext";
import GroopService from "../../services/groop-service";

export default class Dashboard extends Component {
  static contextType = GroopContext;
  componentDidMount() {
      GroopService.getAllTasks()
      .then( data => {
            this.context.setUserTasks(data)
      })
      GroopService.getUserGroups()
      .then(data =>{
        console.log(data)
        this.context.setGroups(data)
      })

  }
  render() {
      
    const { userTasks = [], groups =[]} = this.context;
    console.log(userTasks)
    return (
      <section className="dashboard-c">
        <h2>My Taskboard</h2>
        <p id="date">Today's date</p>
        <div className="groups">
          <label htmlFor="group-menu" id="label-group-menu">
            Members
          </label>
          <ul className="group-menu" role="menu">
          {groups.map(group => (
              <li key={group.group_id} id={group.group_id} aria-live="polite">
                {group.group_id}
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-task-list-container">
          <div id="dashboard-fixed-container">
            <label htmlFor="dashboard-task-list" id="dashboard-label-task-list">
              Today's tasks
            </label>
          </div>
          <ul className="dashboard-task-list">
          {userTasks.map(task => (
              <li key={task.id} id={task.id} aria-live="polite">
                <p>{task.name}: {task.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <Link id="group-link" to="/hub">
          Groups
        </Link>
      </section>
    );
  }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import GroopContext from "../../contexts/GroopContext";
import GroopService from "../../services/groop-service";

export default class GroopsHub extends Component {
  static contextType = GroopContext;
  componentDidMount() {
    GroopService.getUserGroups().then(data => {
      console.log(data);
      this.context.setGroups(data);
    });
  }
  render() {
    const {groups =[]} = this.context;
    return (
      <section className="groops-hub-c">
        <h2>My Groops</h2>
        <div className="groops-hub">
          <ul className="groops-hub-menu" role="menu">  
              {groups.map(group => (
              <li key={group.group_id} id={group.group_id} aria-live="polite">
                <Link to="/group">{group.group_id}</Link>
              </li>
            ))}
            <li id="groop4">
              <Link to="/add-group"> Add Groop</Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

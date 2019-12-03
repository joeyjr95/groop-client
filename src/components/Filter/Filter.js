import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";

export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    filteredTasks: [],
    selectedUser: null
  };


  filterTasksByUser = () => {
    let groupTasks = this.context.currentGroupTasks;
    console.log(this.context.currentGroupMembers)
    console.log(groupTasks)
    let selectedUser = this.state.selectedUser;
    console.log(selectedUser)
     let filterTasks = groupTasks.filter(tasks => {
         console.log(tasks.user_assigned_id)
      return tasks.user_assigned_id == this.state.selectedUser
        })
     console.log(filterTasks)
  };
  onSelectChange = (e) => {
      this.setState({
          selectedUser: parseInt(e)
      }, this.filterTasksByUser())
      
  }



  render() {
    const { currentGroupMembers = [] } = this.context;
    return (
      <div className="filter">
        <label htmlFor="member-select"> Filter By:</label>
        <select className="member-select" onChange={(e) => this.onSelectChange(e.target.value)}>
          {currentGroupMembers.map(member => (
            <option
              key={member.member_id}
              
              aria-live="polite"
              value={member.member_id}
            >
              {member.username}
            </option>
          ))}
        </select>
        <div>
        </div>
      </div>
    );
  }
}

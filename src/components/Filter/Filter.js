import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";

export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    filteredTasks: [],
    selectedUser: null
  };


  filterTasksByUser = (e) => {
      e.preventDefault()
    let groupTasks = this.context.currentGroupTasks;
    let selectedUser = this.state.selectedUser;
     let filterTasks = groupTasks.filter(tasks => {
         console.log(tasks.user_assigned_id)
      return tasks.user_assigned_id == selectedUser
        })
     console.log(filterTasks)
  };
  onSelectChange = (e) => {
      this.setState({
          selectedUser: parseInt(e)
      })
      
  }



  render() {
    const { currentGroupMembers = [] } = this.context;
    console.log(this.state.selectedUser)
    return (
      <div className="filter">
        <label htmlFor="member-select"> Filter By:</label>
        {/* <select className="member-select" onChange={(e) => this.onSelectChange(e.target.value)}>
          {currentGroupMembers.map(member => (
            <option
              key={member.member_id}
              
              aria-live="polite"
              value={member.member_id}
            >
              {member.username}
            </option>
          ))}
        </select> */}
        <form className="member-select" onSubmit={(e) =>this.filterTasksByUser(e)} >
        <input type="text"
            id="member-select"
            name="member-select"
            onChange={(e) => this.onSelectChange(e.target.value)} />
        </form>
      </div>
    );
  }
}

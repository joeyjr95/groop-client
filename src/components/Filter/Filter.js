import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";

export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
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
        if(!selectedUser){
          this.context.setFilteredTasks(groupTasks)
        }else{
          this.context.setFilteredTasks(filterTasks)
        }
    
     
  };


  onSelectChange = (e) => {
      this.setState({
          selectedUser: e
      })
      
  }



  render() {
    
    console.log(this.state.selectedUser)
    console.log(this.context.filteredTasks)
    return (
      <div className="filter">
        <label htmlFor="member-select"> Search Tasks(by user id for now):</label>
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

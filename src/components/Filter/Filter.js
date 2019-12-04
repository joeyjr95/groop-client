import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";
import './Filter.scss'
export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    selectedUser: ""
  };


  filterTasksByUser = (e) => {
      e.preventDefault()
    let group = this.context.currentGroupMembers
    let groupTasks = this.context.currentGroupTasks;
    let selectedUser = this.state.selectedUser;
    let user = group.find( u => u.username === this.state.selectedUser)

    if(!selectedUser){
      this.context.setFilteredTasks(groupTasks)
    }else if(!user){
      this.context.setFilteredTasks(groupTasks)
      alert('user not in group')
      this.setState({
        selectedUser: ""
    })
    }else if(user.username === selectedUser){
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.user_assigned_id == user.member_id
          })
      this.context.setFilteredTasks(filterTasks)
     }
        
    
     
  };


  onSelectChange = (e) => {
      this.setState({
          selectedUser: e
      })
      
  }
  onReset = (e) =>{
    let groupTasks = this.context.currentGroupTasks;
    e.preventDefault()
    this.setState({
      selectedUser: ""
  })
  this.context.setFilteredTasks(groupTasks)
  
  }


  render() {
    console.log(this.context.filteredTasks)
    return (
      <div className="filter">
        <label htmlFor="member-select"> Search Tasks by User:</label>
        <form className="member-select"  >
        <input type="text"
            id="member-select"
            name="member-select"
            placeholder="enter username here"
            value={this.state.selectedUser}
            onChange={(e) => this.onSelectChange(e.target.value)}/>
            <button onClick={(e) =>this.filterTasksByUser(e)}>Search</button>
            <button onClick={(e) =>this.onReset(e)}>Clear</button>
        </form>
        
      </div>
    );
  }
}

import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";
import "./Filter.scss";
export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    selectedInput: "",
    filter: "User Name"
  };

  filterTasksByUser = e => {
    e.preventDefault();
    let group = this.context.currentGroupMembers;
    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;
    let user = group.find(u => u.username === this.state.selectedInput);
    console.log(groupTasks);
    if (!selectedInput) {
      this.context.setFilteredTasks(groupTasks);
    } else if (!user) {
      this.context.setFilteredTasks(groupTasks);
      alert("user not in group");
      this.setState({
        selectedInput: ""
      });
    } else if (user.username === selectedInput) {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.user_assigned_id == user.member_id;
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };

  searchDescription = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;

    let selectedInput = this.state.selectedInput;
    let filterTasks = groupTasks.filter(tasks => {
      return tasks.description.includes(selectedInput);
    });
    console.log(filterTasks);
    this.context.setFilteredTasks(filterTasks);
  };
  searchTaskName = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;

    let selectedInput = this.state.selectedInput;
    let filterTasks = groupTasks.filter(tasks => {
      return tasks.name.includes(selectedInput);
    });
    console.log(filterTasks);
    this.context.setFilteredTasks(filterTasks);
  };

  search = e => {
    e.preventDefault()
    let groupTasks = this.context.currentGroupTasks
    this.context.setFilteredTasks(groupTasks)
    let filter = this.state.filter
    if(filter === "Task Name"){
      this.searchTaskName(e)
    }else if(filter === "Description"){
      this.searchDescription(e)
    }else if(filter === "User Name"){
      this.filterTasksByUser(e)
    }

  }

  onFilterChange = e => {
    this.setState({
      filter: e
    });
  }

  onSelectChange = e => {
    this.setState({
      selectedInput: e
    });
  };
  onReset = e => {
    let groupTasks = this.context.currentGroupTasks;
    e.preventDefault();
    this.setState({
      selectedInput: ""
    });
    this.context.setFilteredTasks(groupTasks);
  };

  render() {
    console.log(this.state.selectedInput);
    console.log(this.state.filter);
    console.log(this.context.filteredTasks);
    return (
      <div className="filter">
        <label htmlFor="member-select"> Search Tasks by:</label>
        <select
                name="Categories"
                onChange={e => this.onFilterChange(e.target.value)}
              >
                <option value="User Name">User Name</option>
                <option value="Task Name">Task Name</option>
                <option value="Description">Description</option>
              </select>
        <form className="member-select">
          <input
            type="text"
            id="member-select"
            name="member-select"
            placeholder="enter username here"
            value={this.state.selectedInput}
            onChange={e => this.onSelectChange(e.target.value)}
          />
          <button onClick={e => this.search(e)}>Search</button>
          <button onClick={e => this.onReset(e)}>Clear</button>
        </form>
      </div>
    );
  }
}

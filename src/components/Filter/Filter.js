import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";
import "./Filter.scss";
import GroopService from "../../services/groop-service";
export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    selectedInput: "",
    filter: "User Name",
    filterBy: 'Completed',
    categories: [],
    category: 0
  };
  search = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    this.context.setFilteredTasks(groupTasks);
    let filter = this.state.filter;
    if (filter === "Task Name") {
      this.searchTaskName(e);
    } else if (filter === "Description") {
      this.searchDescription(e);
    } else if (filter === "User Name") {
      this.filterTasksByUser(e);
    }
  };
  filter = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    this.context.setFilteredTasks(groupTasks);
    let filter = this.state.filterBy;
    if (filter === "Completed") {
      this.searchCompleted(e);
    } else if (filter === "Incompleted") {
      this.searchIncompleted(e);
    } else if (filter === "High Priority") {
      this.searchHighPriority(e);
    } else if (filter === "Medium Priority") {
      this.searchMediumPriority(e);
    } else if (filter === "Low Priority") {
      this.searchLowPriority(e);
    }
  };
  filterTasksByUser = e => {
    e.preventDefault();
    let group = this.context.currentGroupMembers;
    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;
    let user = group.find(u => u.username === this.state.selectedInput);
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
        return tasks.user_assigned_id === user.member_id;
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
      this.context.setFilteredTasks(filterTasks);
  };
  searchTaskName = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.name.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    
  };
  searchCompleted = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.completed === true;
      });
      this.context.setFilteredTasks(filterTasks);
  };
  searchIncompleted = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    let filterTasks = groupTasks.filter(tasks => {
        return tasks.completed === false;
      });
      this.context.setFilteredTasks(filterTasks);
    
  };
  searchHighPriority = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 3;
      });
      this.context.setFilteredTasks(filterTasks);
  };
  searchMediumPriority = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 2;
      });
      this.context.setFilteredTasks(filterTasks);
  };
  searchLowPriority = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    let filterTasks = groupTasks.filter(tasks => {
      return tasks.priority === 1;
    });
    this.context.setFilteredTasks(filterTasks);
  };
  onSearchChange = e => {
    this.setState({
      filter: e,
    });
  };
  onFilterChange = async(e) => {
    await this.setState({
      filterBy: e,
    });
    this.filter(e)
  };

  onSelectChange = e => {
    this.setState({
      selectedInput: e,
    });
  };

  render() {
    return (
      <div className="filter">
        <label htmlFor="filter">
          {" "}
          Filter by:
          <select
            name="filter-dropdown"
            onChange={e => this.onFilterChange(e.target.value)}
          >
            <option value="Completed">Completed tasks</option>
            <option value="Incompleted">Incomplete tasks</option>
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority">Low Priority</option>
          </select>
        </label>
        <label htmlFor="search">
          {" "}
          Search by:
          <select
            name="search-dropdown"
            onChange={e => this.onSearchChange(e.target.value)}
          >
            <option value="User Name">User Name</option>
            <option value="Task Name">Task Name</option>
            <option value="Description">Description</option>
          </select>
        </label>
        <form className="search">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="search here"
            value={this.state.selectedInput}
            onChange={e => this.onSelectChange(e.target.value)}
          />
          <div className="SearchButtonContainer">
            <button className="Button" onClick={e => this.search(e)}>
              Search
            </button>
            <button className="ButtonCancel" onClick={e => this.onReset(e)}>
              Clear
            </button>
          </div>
        </form>
      </div>
    );
  }
}

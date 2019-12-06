import React, { Component } from "react";
import GroopContext from "../../contexts/GroopContext";
import "./Filter.scss";
export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    selectedInput: "",
    filter: "User Name"
  };
  componentDidMount() {
    const path = this.props.match.path;
    const dashboard = "/dashboard";
    if (path === dashboard) {
      this.setState({ filter: "Task Name" });
    }
  }

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
    const path = this.props.match.path;
    const dashboard = "/dashboard";
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.description.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.description.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };
  searchTaskName = e => {
    const path = this.props.match.path;
    const dashboard = "/dashboard";
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;

    let selectedInput = this.state.selectedInput;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.name.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.name.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    }
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

  onFilterChange = e => {
    this.setState({
      filter: e
    });
  };

  onSelectChange = e => {
    this.setState({
      selectedInput: e
    });
  };
  onReset = e => {
    const path = this.props.match.path;
    const dashboard = "/dashboard";
    let groupTasks = this.context.currentGroupTasks;
    e.preventDefault();
    this.setState({
      selectedInput: ""
    });
    if (path === dashboard) {
      this.context.setFilteredTasks(this.context.userTasks);
    } else {
      this.context.setFilteredTasks(groupTasks);
    }
  };
  render() {
    const path = this.props.match.path;
    const dashboard = "/dashboard";

    if (path === dashboard) {
      return (
        <div className="filter">
          <label htmlFor="member-select"> Search Tasks by:</label>
          <select
            name="Categories"
            onChange={e => this.onFilterChange(e.target.value)}
          >
            <option value="Task Name">Task Name</option>
            <option value="Description">Description</option>
          </select>
          <form className="member-select">
            <input
              type="text"
              id="member-select"
              name="member-select"
              placeholder="search here"
              value={this.state.selectedInput}
              onChange={e => this.onSelectChange(e.target.value)}
            />
            <div className="FilterButtonContainer">
            <button className="Button" onClick={e => this.search(e)}>Search</button>
            <button className="ButtonCancel" onClick={e => this.onReset(e)}>Clear</button>
            </div>
          </form>
        </div>
      );
    } else {
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
              placeholder="search here"
              value={this.state.selectedInput}
              onChange={e => this.onSelectChange(e.target.value)}
            />
            <div className="FilterButtonContainer">
            <button className="Button" onClick={e => this.search(e)}>Search</button>
            <button className="ButtonCancel" onClick={e => this.onReset(e)}>Clear</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

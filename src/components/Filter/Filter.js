import React, { Component } from 'react';
import GroopContext from '../../contexts/GroopContext';
import './Filter.scss';
import GroopService from '../../services/groop-service';

export default class Filter extends Component {
  static contextType = GroopContext;
  state = {
    selectedInput: '',
    filter: 'User Name',
  };
  componentDidMount() {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    if (path === dashboard) {
      this.setState({ filter: 'Task Name' });
      this.getUserGroups()
    }
    console.log(this.context.userTasks)
    
      
  }
  getUserGroups = () => {
    GroopService.getUserGroups().then(data => {
      this.context.setGroups(data);
    });
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
      alert('user not in group');
      this.setState({
        selectedInput: '',
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
    const dashboard = '/dashboard';
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
    const dashboard = '/dashboard';
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
  searchCategory = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.category_id.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.category_id.includes(selectedInput);
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };
  searchCompleted = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.completed === true
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.completed === true
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };
  searchIncompleted = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.completed === false
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.completed === false
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };
  searchHighPriority = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.priority === 3
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 3
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };
  searchMediumPriority = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.priority === 2
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 2
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };
  searchLowPriority = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.priority === 1
      });
      this.context.setFilteredTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 1
      });
      this.context.setFilteredTasks(filterTasks);
    }
  };

  search = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    this.context.setFilteredTasks(groupTasks);
    let filter = this.state.filter;
    if (filter === 'Task Name') {
      this.searchTaskName(e);
    } else if (filter === 'Description') {
      this.searchDescription(e);
    } else if (filter === 'User Name') {
      this.filterTasksByUser(e);
    } else if (filter === 'Category') {
      this.searchCategory(e)
    } else if (filter === 'Completed') {
      this.searchCompleted(e)
    } else if (filter === 'Incompleted') {
      this.searchIncompleted(e)
    } else if (filter === 'High Priority') {
      this.searchHighPriority(e)
    }else if (filter === 'Medium Priority') {
      this.searchMediumPriority(e)
    }else if (filter === 'Low Priority') {
      this.searchLowPriority(e)
    }
  };

  onFilterChange = e => {
    this.setState({
      filter: e,
    });
  };

  onSelectChange = e => {
    this.setState({
      selectedInput: e,
    });
  };
  onReset = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    let groupTasks = this.context.currentGroupTasks;
    e.preventDefault();
    this.setState({
      selectedInput: '',
    });
    if (path === dashboard) {
      this.context.setFilteredTasks(this.context.userTasks);
    } else {
      this.context.setFilteredTasks(groupTasks);
    }
  };
  render() {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    console.log(this.context.groups)
    if (path === dashboard) {
      
      return (
        <div className="filter">
          <label htmlFor="member-select">
            {' '}
            Search by:
            <select
              name="Categories"
              onChange={e => this.onFilterChange(e.target.value)}
            >
              <option value="Task Name">Task Name</option>
              <option value="Description">Description</option>
              <option value="Category">Category</option>
              <option value="Completed">Completed tasks</option>
              <option value="Incompleted">Incomplete tasks</option>
              <option value="High Priority">High Priority</option>
              <option value="Medium Priority">Medium Priority</option>
              <option value="Low Priority">Low Priority</option>
            </select>
          </label>
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
    } else {
      return (
        <div className="filter">
          <label htmlFor="member-select">
            {' '}
            Search by:
            <select
              name="Categories"
              onChange={e => this.onFilterChange(e.target.value)}
            >
              <option value="User Name">User Name</option>
              <option value="Task Name">Task Name</option>
              <option value="Description">Description</option>
              <option value="Category">Category</option>
              <option value="Completed">Completed tasks</option>
              <option value="Incompleted">Incomplete tasks</option>
            </select>
          </label>
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
}

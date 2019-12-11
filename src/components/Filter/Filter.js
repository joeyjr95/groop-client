import React, { Component } from 'react';
import GroopContext from '../../contexts/GroopContext';
import './Filter.scss';
import GroopService from '../../services/groop-service';
export default class Filter extends Component {
  static contextType = GroopContext;

  state = {
    selectedInput: '',
    filter: 'User Name',
    group: 0,
    categories: [],
    groupmembers: [],
    category: 0,
    groupmember: '',
    filterBy: '',
  };

  componentDidMount = async () => {
    if (this.props.match.path === '/dashboard') {
      this.setState({
        filter: 'Task Name',
        categories: [],
        category: 0,
      });
      this.getUserGroups();
    } else {
      let groupCategories = await GroopService.getCategories(
        this.props.match.params.group_id,
      );
      let groupMembers = await GroopService.getGroupMembers(
        this.props.match.params.group_id,
      );
      this.setState({
        group: this.props.match.params.group_id,
        categories: groupCategories,
        groupmembers: groupMembers,
      });
    }
  };

  // get groups user is a member of
  getUserGroups = () => {
    GroopService.getUserGroups().then(data => {
      this.context.setGroups(data);
    });
  };

  // search for string included in task description
  searchDescription = e => {
    e.preventDefault();

    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;

    if (this.props.match.path === '/dashboard') {
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

  // search for string included in task name
  searchTaskName = e => {
    e.preventDefault();

    let groupTasks = this.context.currentGroupTasks;
    let selectedInput = this.state.selectedInput;

    if (this.props.match.path === '/dashboard') {
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

  // searchCompleted = e => {
  //   const path = this.props.match.path;
  //   const dashboard = '/dashboard';
  //   e.preventDefault();
  //   let groupTasks = this.context.currentGroupTasks;
  //   if (path === dashboard) {
  //     let filterTasks = this.context.userTasks.filter(tasks => {
  //       return tasks.completed === true;
  //     });
  //     this.context.setFilteredTasks(filterTasks);
  //   } else {
  //     let filterTasks = groupTasks.filter(tasks => {
  //       return tasks.completed === true;
  //     });
  //     this.context.setFilteredTasks(filterTasks);
  //   }
  // };

  search = e => {
    e.preventDefault();

    let filter = this.state.filter;
    let groupTasks = this.context.currentGroupTasks;
    this.context.setFilteredTasks(groupTasks);

    if (filter === 'Task Name') {
      this.searchTaskName(e);
    } else if (filter === 'Description') {
      this.searchDescription(e);
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

  onFilterChange = e => {
    this.setState({
      filter: e,
    });
  };

  // controlled input for search input
  onSelectChange = e => {
    this.setState({
      selectedInput: e,
    });
  };

  // clear search and reset task list
  onReset = e => {
    let groupTasks = this.context.currentGroupTasks;
    e.preventDefault();
    this.setState({
      selectedInput: '',
    });

    if (this.props.match.path === '/dashboard') {
      this.context.setFilteredTasks(this.context.userTasks);
    } else {
      this.context.setFilteredTasks(groupTasks);
    }
  };

  groupFilter() {
    const groups = this.context.groups || [];
    return (
      <label htmlFor="group-filter-select">
        Group Filter:
        <select
          name="Groups"
          id="group-filter-select"
          onChange={e => this.onGroupFilterChange(Number(e.target.value))}
        >
          <option key={`group_all`} id={0} name="all_groups" value={0}>
            My Tasks (no group selected)
          </option>
          {groups.map(group => (
            <option
              key={`group_${group.group_id}`}
              id={group.group_id}
              name={group.name}
              value={group.group_id}
            >
              {group.name}
            </option>
          ))}
        </select>
      </label>
    );
  }
  onGroupFilterChange = async e => {
    await this.setState({
      group: e,
    });
    this.onGroupFilterSubmit();
  };

  onGroupFilterSubmit = async () => {
    if (this.state.group === 0) {
      let updatedTasks = await GroopService.getAllTasks();
      this.context.setFilteredTasks(updatedTasks);
      this.context.setUserTasks(updatedTasks);
    } else if (this.state.group !== 0) {
      let updatedTasks = await GroopService.getGroupTasks(this.state.group);
      await GroopService.getCategories(this.state.group).then(data =>
        this.setState({ categories: data }),
      );
      await GroopService.getGroupMembers(this.state.group).then(data =>
        this.setState({ groupmembers: data }),
      );
      this.context.setFilteredTasks(updatedTasks);
      this.context.setUserTasks(updatedTasks);
    }
  };

  onCategoryFilterSubmit = () => {
    if (this.state.category === 0) {
      let filterTasks = this.context.userTasks;
      this.context.setFilteredTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    } else if (this.state.category !== 0) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.category_id === this.state.category;
      });
      this.context.setFilteredTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    }
  };

  onMemberFilterSubmit = () => {
    if (this.state.groupmember === 0) {
      let filterTasks = this.context.userTasks;
      this.context.setFilteredTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    } else if (this.state.groupmember !== 0) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.user_assigned_id === this.state.groupmember;
      });
      this.context.setFilteredTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    }
  };

  onCategoryChange = async e => {
    let updatedTasks = await GroopService.getGroupTasks(this.state.group);
    await this.context.setFilteredTasks(updatedTasks);
    await this.context.setUserTasks(updatedTasks);
    await this.setState({
      category: e,
    });
    this.onCategoryFilterSubmit();
  };

  categorySelection() {
    if (this.state.group !== 0) {
      const { categories = [] } = this.state;
      return (
        <label htmlFor="category-select">
          {' '}
          Category:
          <select
            name="categories"
            id="category-select"
            onChange={e => this.onCategoryChange(Number(e.target.value))}
          >
            <option key={`category_all`} id={0} name="all_categories" value={0}>
              All Categories
            </option>
            {categories.map(category => (
              <option
                key={`category_${category.id}`}
                id={category.id}
                name={category.category_name}
                value={category.id}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </label>
      );
    }
  }

  onMemberChange = async e => {
    let updatedTasks = await GroopService.getGroupTasks(this.state.group);
    await this.context.setFilteredTasks(updatedTasks);
    await this.context.setUserTasks(updatedTasks);
    await this.setState({
      groupmember: e,
    });
    this.onMemberFilterSubmit();
  };
  memberSelection() {
    if (this.state.group !== 0) {
      const { groupmembers = [] } = this.state;
      return (
        <label htmlFor="member-select">
          Members:
          <select
            name="members"
            id="member-select"
            onChange={e => this.onMemberChange(Number(e.target.value))}
          >
            <option key={`member_all`} id={0} name="all_members" value={0}>
              All Members
            </option>
            {groupmembers.map(member => (
              <option
                key={`member_${member.id}`}
                id={`member_${member.id}`}
                name={member.username}
                value={member.id}
              >
                {member.username}
              </option>
            ))}
          </select>
        </label>
      );
    }
  }
  render() {
    const path = this.props.match.path;
    const dashboard = '/dashboard';
    if (path === dashboard) {
      return (
        <div className="filter">
          {this.groupFilter()}
          {this.categorySelection()}
          {this.memberSelection()}
          <label htmlFor="search-cat-select">
            Search by:
            <select
              name="select-search-category"
              id="search-cat-select"
              onChange={e => this.onFilterChange(e.target.value)}
            >
              <option value="Task Name">Task Name</option>
              <option value="Description">Description</option>
            </select>
          </label>
          <form className="filter-search-form">
            <input
              type="text"
              id="filter-search-from__input"
              name="filter-search-form-input"
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
          {this.categorySelection()}
          {this.memberSelection()}

          <label htmlFor="search-cat-select">
            Search by:
            <select
              name="select-search-category"
              id="search-cat-select"
              onChange={e => this.onFilterChange(e.target.value)}
            >
              <option value="User Name">User Name</option>
              <option value="Task Name">Task Name</option>
              <option value="Description">Description</option>
            </select>
          </label>

          <form className="filter-search-form">
            <input
              type="text"
              id="filter-search-form__input"
              name="filter-search-form-input"
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

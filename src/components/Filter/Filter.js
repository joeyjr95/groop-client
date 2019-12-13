import React, { Component } from 'react';
import GroopContext from '../../contexts/GroopContext';
import './Filter.scss';
import GroopService from '../../services/groop-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  
  faTimes,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
export default class Filter extends Component {
  static contextType = GroopContext;

  state = {
    selectedInput: '',
    group: 0,
    categories: [],
    groupmembers: [],
    category: 0,
    groupmember: '',
    filterBy: '',
    showFilter: false,
  };

  componentDidMount = async () => {
    if (window.innerWidth > 800) {
      this.setState({
        showFilter: true,
      });
    }
    if (this.props.match.path === '/dashboard') {
      this.setState({
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

  // searchIncompleted = e => {
  //   const path = this.props.match.path;
  //   const dashboard = '/dashboard';

  //   let groupTasks = this.context.currentGroupTasks;
  //   if (path === dashboard) {
  //     let filterTasks = this.context.userTasks.filter(tasks => {
  //       return tasks.completed === false;
  //     });
  //     this.getAllTasks(filterTasks);
  //   } else {
  //     let filterTasks = groupTasks.filter(tasks => {
  //       return tasks.completed === false;
  //     });
  //     this.getAllTasks(filterTasks);
  //   }
  // };
  getAllTasks =(tasks) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // filter expired tasks (date due before today)
    let filteredTasks = tasks.filter(task => {
      let task_due_date = new Date(task.date_due);
      return task_due_date >= today ? 1 : 0;
    });

    // sort by ascending date due
    filteredTasks.sort((a, b) => {
      return new Date(a.date_due) < new Date(b.date_due) ? false : true;
    });

    this.context.setFilteredTasks(filteredTasks);
  };
  searchHighPriority = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';

    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.priority === 3;
      });
      this.getAllTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 3;
      });
      this.getAllTasks(filterTasks);
    }
  };
  searchMediumPriority = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';

    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.priority === 2;
      });
      this.getAllTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 2;
      });
      this.getAllTasks(filterTasks);
    }
  };
  searchLowPriority = e => {
    const path = this.props.match.path;
    const dashboard = '/dashboard';

    let groupTasks = this.context.currentGroupTasks;
    if (path === dashboard) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.priority === 1;
      });
      this.getAllTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return tasks.priority === 1;
      });
      this.getAllTasks(filterTasks);
    }
  };
  // search for string included in task description / taskname
  search = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;

    this.getAllTasks(groupTasks);

    let selectedInput = this.state.selectedInput.toUpperCase();

    if (this.props.match.path === '/dashboard') {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return (
          tasks.description.toUpperCase().includes(selectedInput) ||
          tasks.name.toUpperCase().includes(selectedInput)
        );
      });
      this.getAllTasks(filterTasks);
    } else {
      let filterTasks = groupTasks.filter(tasks => {
        return (
          tasks.description.toUpperCase().includes(selectedInput) ||
          tasks.name.toUpperCase().includes(selectedInput)
        );
      });
      this.getAllTasks(filterTasks);
    }
  };
  filter = e => {
    let groupTasks = this.context.currentGroupTasks;
    this.getAllTasks(groupTasks);
    let filter = this.state.filterBy;
    if (filter === 'High Priority') {
      this.searchHighPriority(e);
    } else if (filter === 'Medium Priority') {
      this.searchMediumPriority(e);
    } else if (filter === 'Low Priority') {
      this.searchLowPriority(e);
    } else if (filter === 'None') {
      this.hardReset();
    }
  };

  onFilterByChange = async e => {
    await this.setState({
      filterBy: e,
    });
    this.filter(e);
  };

  // controlled input for search input
  onSelectChange = e => {
    this.setState({
      selectedInput: e,
    });
  };

  // clear search and reset task list
  onReset = e => {
    e.preventDefault();
    let groupTasks = this.context.currentGroupTasks;
    this.setState({
      selectedInput: '',
    });

    if (this.props.match.path === '/dashboard') {
      this.getAllTasks(this.context.userTasks);
    } else {
      this.getAllTasks(groupTasks);
    }
  };
  hardReset = e => {
    let groupTasks = this.context.currentGroupTasks;
    this.setState({
      selectedInput: '',
    });

    if (this.props.match.path === '/dashboard') {
      this.getAllTasks(this.context.userTasks);
    } else {
      this.getAllTasks(groupTasks);
    }
  };

  groupFilter() {
    const groups = this.context.groups || [];
    return (
      <label htmlFor="group-filter-select">
        Group:
        <select
          name="Groups"
          id="group-filter-select"
          onChange={e => this.onGroupFilterChange(Number(e.target.value))}
        >
          <option key={`group_all`} id={0} name="all_groups" value={0}>
            My Tasks (No Group Selected)
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
      this.getAllTasks(updatedTasks);
      this.context.setUserTasks(updatedTasks);
    } else if (this.state.group !== 0) {
      let updatedTasks = await GroopService.getGroupTasks(this.state.group);
      await GroopService.getCategories(this.state.group).then(data =>
        this.setState({ categories: data }),
      );
      await GroopService.getGroupMembers(this.state.group).then(data =>
        this.setState({ groupmembers: data }),
      );
      this.getAllTasks(updatedTasks);
      this.context.setUserTasks(updatedTasks);
    }
  };

  onCategoryFilterSubmit = () => {
    if (this.state.category === 0) {
      let filterTasks = this.context.userTasks;
      this.getAllTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    } else if (this.state.category !== 0) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.category_id === this.state.category;
      });
      this.getAllTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    }
  };

  onMemberFilterSubmit = () => {
    if (this.state.groupmember === 0) {
      let filterTasks = this.context.userTasks;
      this.getAllTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    } else if (this.state.groupmember !== 0) {
      let filterTasks = this.context.userTasks.filter(tasks => {
        return tasks.user_assigned_id === this.state.groupmember;
      });
      this.getAllTasks(filterTasks);
      this.context.setUserTasks(filterTasks);
    }
  };

  onCategoryChange = async e => {
    let updatedTasks = await GroopService.getGroupTasks(this.state.group);
    await this.getAllTasks(updatedTasks);
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
    await this.getAllTasks(updatedTasks);
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
    const { showFilter } = this.state;
    if (path === dashboard) {
      return (
        <div className="filter">
          <span>Filters:</span>{' '}
          <button
            className="FilterToggle"
            onClick={() => this.setState({ showFilter: !showFilter })}
          >
            {showFilter ? (
              <>
                <FontAwesomeIcon icon={faMinus} id="closeIcon" />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} id="closeIcon" />
              </>
            )}
          </button>
          {showFilter && (
            <>
              {this.groupFilter()}
              {this.categorySelection()}
              {this.memberSelection()}
              <label htmlFor="filter">
                {' '}
                Priority:
                <select
                  name="filter-dropdown"
                  onChange={e => this.onFilterByChange(e.target.value)}
                >
                  <option value="None">No Filter (No Filter Selected)</option>
                  <option value="High Priority">High Priority</option>
                  <option value="Medium Priority">Medium Priority</option>
                  <option value="Low Priority">Low Priority</option>
                </select>
              </label>
            </>
          )}
          <div className="break"></div>
          <form className="filter-search-form">
            <input
              type="text"
              id="filter-search-from__input"
              name="filter-search-form-input"
              placeholder="search task name or description here"
              value={this.state.selectedInput}
              onChange={e => this.onSelectChange(e.target.value)}
            />
            <button className="FilterButton" onClick={e => this.search(e)}>
              <FontAwesomeIcon icon={faSearch} id="closeIcon" />
            </button>
            <button
              className="FilterButtonCancel"
              onClick={e => this.onReset(e)}
            >
              <FontAwesomeIcon icon={faTimes} id="closeIcon" />
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="filter">
          <span>Filters:</span>{' '}
          <button
            className="FilterToggle"
            onClick={() => this.setState({ showFilter: !showFilter })}
          >
            {showFilter ? (
              <>
                {' '}
                <FontAwesomeIcon icon={faMinus} id="closeIcon" />
              </>
            ) : (
              <>
                {' '}
                <FontAwesomeIcon icon={faPlus} id="closeIcon" />
              </>
            )}
          </button>
          {showFilter && (
            <>
              {this.categorySelection()}
              {this.memberSelection()}
              <label htmlFor="filter">
                {' '}
                Priority:
                <select
                  name="filter-dropdown"
                  onChange={e => this.onFilterByChange(e.target.value)}
                >
                  <option value="None">No Filter (No Filter Selected)</option>
                  <option value="High Priority">High Priority</option>
                  <option value="Medium Priority">Medium Priority</option>
                  <option value="Low Priority">Low Priority</option>
                </select>
              </label>
            </>
          )}
          <form className="filter-search-form">
            <input
              type="text"
              id="filter-search-form__input"
              name="filter-search-form-input"
              placeholder="search here"
              value={this.state.selectedInput}
              onChange={e => this.onSelectChange(e.target.value)}
            />
            <button className="FilterButton" onClick={e => this.search(e)}>
              <FontAwesomeIcon icon={faSearch} id="closeIcon" />
            </button>
            <button
              className="FilterButtonCancel"
              onClick={e => this.onReset(e)}
            >
              <FontAwesomeIcon icon={faTimes} id="closeIcon" />
            </button>
          </form>
        </div>
      );
    }
  }
}

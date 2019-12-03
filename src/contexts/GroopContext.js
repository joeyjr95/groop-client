import React, { Component } from "react";


const GroopContext = React.createContext({
  currentGroup: null,
  groups: [],
  currentGroupTasks: [],
  currentGroupMembers: [],
  filteredTasks: [],
  userTasks: [],
  error: null,
  setError: () => {},
  setGroups: () => {},
  setCurrentGroup: () => {},
  setCurrentGroupTasks: () => {},
  setCurrentGroupMembers: () => {},
  setUserTasks: () => {},
  setFilteredTasks: () => {}
});

export default GroopContext;

export class GroopProvider extends Component {
  state = {
    currentGroup: null,
    groups: [],
    currentGroupTasks: [],
    currentGroupMembers: [],
    userTasks: [],
    filteredTasks:[],
    error: null
  };
  
  setFilteredTasks = filteredTasks =>{
    this.setState({filteredTasks})
  }
  setError = error => {
    console.error(error);
    this.setState({ error });
  };
  setGroups = groups => {
    this.setState({ groups });
  };
  setCurrentGroup = currentGroup => {
    this.setState({ currentGroup });
  };
  setCurrentGroupTasks = currentGroupTasks => {
    this.setState({ currentGroupTasks });
  };
  setCurrentGroupMembers = currentGroupMembers => {
    this.setState({ currentGroupMembers });
  };
  setUserTasks = userTasks => {
    this.setState({ userTasks });
  };
  render() {
    const value = {
      currentGroup: this.state.currentGroup,
      groups: this.state.groups,
      currentGroupMembers: this.state.currentGroupMembers,
      currentGroupTasks: this.state.currentGroupTasks,
      userTasks: this.state.userTasks,
      filteredTasks: this.state.filteredTasks,
      error: this.state.error,
      setError: this.setError,
      setGroups: this.setGroups,
      setFilteredTasks: this.setFilteredTasks,
      setCurrentGroup: this.setCurrentGroup,
      setCurrentGroupTasks: this.setCurrentGroupTasks,
      setCurrentGroupMembers: this.setCurrentGroupMembers,
      setUserTasks: this.setUserTasks 
    };
    return (
        <GroopContext.Provider value={value}>
            {this.props.children}
        </GroopContext.Provider>
    )
  }
}

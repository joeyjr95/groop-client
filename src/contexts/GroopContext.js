import React, { Component } from "react";

const GroopContext = React.createContext({
  currentGroup: {},
  groups: [],
  currentGroupTasks: [],
  userTasks: [],
  error: null,
  setError: () => {},
  setGroups: () => {},
  setCurrentGroup: () => {},
  setCurrentGroupTasks: () => {},
  setUserTasks: () => {}
});

export default GroopContext;

export class GroopProvider extends Component {
  state = {
    currentGroup: {},
    groups: [],
    currentGroupTasks: [],
    userTasks: [],
    error: null
  };
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
  setUserTasks = userTasks => {
    this.setState({ userTasks });
  };
  render() {
    const value = {
      currentGroup: this.state.currentGroup,
      groups: this.state.groups,
      currentGroupTasks: this.state.currentGroupTasks,
      userTasks: this.state.userTasks,
      error: this.state.error,
      setError: this.setError,
      setGroups: this.setGroups,
      setCurrentGroup: this.setCurrentGroup,
      setCurrentGroupTasks: this.setCurrentGroupTasks,
      setUserTasks: this.setUserTasks 
    };
    return (
        <GroopContext.Provider value={value}>
            {this.props.children}
        </GroopContext.Provider>
    )
  }
}

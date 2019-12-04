import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default class Sidebar extends Component {
  
  renderSidebar = () =>{
    const path = this.props.match.path
    const dashboard = "/dashboard"
    
     if( path === dashboard){
       return (
        <div className="dashboard-sidenav">
        <div className='flexbox-container'>
        <Link to="/add-group">Add Groop</Link>
        <Link to="/calender">Calender</Link>
        <Link to="/settings">Settings</Link>
        </div>
        </div>
       )
     } else {
       return (
        <div className="sidenav">
        <div className='flexbox-container'>
        <Link to="/dashboard">Dashboard</Link>
        <Link to={`/groupsettings/${this.props.match.params.group_id}`}>
          Group Settings
        </Link>
        <Link to={`/add-task/${this.props.match.params.group_id}`}>Add Task</Link>
        <Link to="/settings">Settings</Link>
        </div>
        </div>
       )
     }
  }
  render() {
    console.log(this.props.match.path)
    return this.renderSidebar()
  }
}

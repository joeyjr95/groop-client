import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GroupPageRoute.scss';
import GroopPage from '../../components/GroopPage/GroopPage';
import Sidebar from '../../components/Sidebar/Sidebar';


export default class GroupPageRoute extends Component {
  date = (separator=" / ") =>{
    const date = new Date()
    const today = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${month}${separator}${today}${separator}${year}`
  }
render(){
  
    return (
      <div className="groop-page">
        <h2>groop title</h2>
        <p id="date">{this.date()}</p>
        <GroopPage
          {...this.props}
          group_id={this.props.match.params.group_id}
        />

        <Link to="/add-task" id="task-link">
          Add to list
        </Link>
        <Sidebar {...this.props} />
        <Link to={`/groupsettings/${this.props.match.params.group_id}`}>Group Settings</Link>
      </div>
    );
  }
}

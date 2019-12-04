import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GroupPageRoute.scss';
import GroopPage from '../../components/GroopPage/GroopPage';
import GroopService from '../../services/groop-service';
import Sidebar from '../../components/Sidebar/Sidebar';

export default class GroupPageRoute extends Component {
  state = {
    group_name: '',
  };

  componentDidMount = async () => {
    let group = await GroopService.getGroup(this.props.match.params.group_id);
    if (group) this.setState({ group_name: group.name });
  };

  date = (separator = ' / ') => {
    const date = new Date();
    const today = date.getDate();
    const month = (date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}${separator}${today}${separator}${year}`;
  };

  render() {
    return (
      <div className="groop-page">
        <h2>{this.state.group_name}</h2>
        <p id="date">{this.date()}</p>
        <GroopPage
          {...this.props}
          group_id={this.props.match.params.group_id}
        />

        <Link to="/add-task" id="task-link">
          Add to list
        </Link>
        <Sidebar {...this.props} />
        
      </div>
    );
  }
}

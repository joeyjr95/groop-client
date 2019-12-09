import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GroupPageRoute.scss';
import GroopPage from '../../components/GroopPage/GroopPage';
import GroopService from '../../services/groop-service';
import GroopContext from '../../contexts/GroopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar/Sidebar';

export default class GroupPageRoute extends Component {
  static contextType = GroopContext;
  state = {
    showMenu: false,
  };

  hideMenu = () => {
    this.setState({ showMenu: false });
  };

  componentDidMount = async () => {
    let group = await GroopService.getGroup(this.props.match.params.group_id);
    this.context.setCurrentGroup(group);
  };

  date = (separator = ' / ') => {
    const date = new Date();
    const today = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}${separator}${today}${separator}${year}`;
  };

  render() {
    let currentgroup = this.context.currentGroup || '';
    return (
      <div className="groop-dashboard">
        <button
          className="ham-button"
          type="button"
          onClick={() => this.setState({ showMenu: true })}
        >
          <FontAwesomeIcon icon={faAngleRight} id="openIcon" />
        </button>
        <div className="groop-page">
          <h2>{currentgroup.name}</h2>
          <p id="date">{this.date()}</p>
          <GroopPage
            {...this.props}
            group_id={this.props.match.params.group_id}
          />

          <Link to="/add-task" id="task-link">
            Add to list
          </Link>
        </div>
        <Sidebar
          {...this.props}
          visibility={this.state.showMenu}
          hideMenu={() => this.hideMenu()}
        />
      </div>
    );
  }
}

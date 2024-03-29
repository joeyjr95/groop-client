import React, { Component } from 'react';
// import config from "../../config";
// import TokenService from "../../services/token-service";
import GroopService from '../../services/groop-service';
import UserContext from '../../contexts/UserContext';
import './GroupForm.scss';
import Button from '../Button/Button';

export default class GroupForm extends Component {
  static contextType = UserContext;
  state = {
    error: null,
    name: {
      value: '',
      touched: false,
    },
  };

  handleSubmit = async e => {
    e.preventDefault();
    const newGroup = {
      name: this.state.name.value,
      owner_id: this.context.user.id,
    };
    const group = await GroopService.postGroup(newGroup);
    this.props.history.push(`../group/${group.id}`);
  };

  handleChangeGroupname = e => {
    this.setState({ name: { value: e.target.value, touched: true } });
  };

  render() {
    return (
      <section>
        <form className="AddGroupForm">
          <h2>Add Group</h2>
          <label htmlFor="addGroupname" className="AddGroupLabel">
            Group Name
          </label>
          <input
            type="text"
            id="addGroupname"
            name="addGroupname"
            onChange={this.handleChangeGroupname}
          />
          <Button
            type="submit"
            className="CreateGroupButton"
            onClick={this.handleSubmit}
            disabled={this.state.name.value.length > 0 ? 0 : 1}
          >
            Create New Group
          </Button>
          <Button type="button" className="ButtonCancel" onClick={() => this.props.history.goBack()}>
            Go Back
          </Button>
        </form>
      </section>
    );
  }
}

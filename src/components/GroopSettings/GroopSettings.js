import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import React, { Component } from 'react';
import './GroopSetting.scss';

export default class GroopSettings extends Component {
  static contextType = GroopContext;
  state = {
    group_id: this.context.currentGroup,
    groupmembers: [],
    newMember: '',
    deletedMember: '',
  };

  componentDidMount = async () => {
    this.getGroupMembers();
    // this.setState({
    //   groupmembers: this.context.currentGroupMembers,
    // });
  };

  handleDeleteGroup = async e => {
    e.preventDefault();
    GroopService.deleteGroup(this.state.group_id);
    this.props.history.go(-2);
  };

  getGroupMembers = () => {
    GroopService.getGroupMembers(this.props.group_id).then(data => {
      this.context.setCurrentGroupMembers(data);
    });
  };

  handleDeleteMember = async e => {
    e.preventDefault();
    let body = {
      group_id: this.context.currentGroup,
      member_id: parseInt(this.state.deletedMember),
    };
    const deleted = await GroopService.deleteGroupMember(body);
  };

  handleAddMember = e => {
    e.preventDefault();
    let body = {
      group_id: parseInt(this.state.group_id),
      member_id: parseInt(this.state.newMember),
    };
    GroopService.addNewGroupMember(body);
  };

  handleChangeAddMember = e => {
    this.setState({ newMember: e.target.value });
  };

  handleChangeDeleteMember = e => {
    this.setState({ deletedMember: e.target.value });
  };

  render() {
    const memberdropdown = this.context.currentGroupMembers.map(member => (
      <option value={member.member_id}>{member.username} </option>
    ));
    return (
      <section className="GroupSettingsSection">
        <h2>Group Settings</h2>
        <form className="addGroupMember">
          <label htmlFor="addGroupMember" className="AddGroupMemberLabel">
            Add Member to Group
          </label>
          <input
            type="text"
            id="addGroupMember"
            name="addGroupMember"
            onChange={this.handleChangeAddMember}
          />
          <button
            type="submit"
            onClick={this.handleAddMember}
            className="AddGroopMemberButton"
          >
            Add New Member
          </button>
        </form>
        <form className="deleteGroupMember">
          <label htmlFor="deleteGroupMember" className="deleteGroupMemberLabel">
            Remove Member from Group
          </label>
          <input
            type="text"
            id="addGroupMember"
            name="addGroupMember"
            onChange={this.handleChangeDeleteMember}
          />
          <select>{memberdropdown}</select>
          <button
            type="submit"
            onClick={this.handleDeleteMember}
            className="AddGroupMemberButton"
          >
            Remove Member
          </button>
        </form>
        <button
          type="submit"
          onClick={this.handleDeleteGroup}
          className="DeleteGroupButton"
        >
          Delete Group
        </button>
      </section>
    );
  }
}

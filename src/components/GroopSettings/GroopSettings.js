import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import React, { Component } from 'react';
import './GroopSetting.scss';

export default class GroopSettings extends Component {
  static contextType = GroopContext;
  state = {
    groupmembers: [],
    newMember: '',
    deletedMember: '',
    addConfirmation: null,
    addError: null,
    deleteConfirmation: null,
    deleteError: null,
  };

  componentDidMount = async () => {
    const group = await GroopService.getGroup(this.props.match.params.group_id);
    this.context.setCurrentGroup(group);
    this.getGroupMembers(group.id);
  };

  handleDeleteGroup = async e => {
    e.preventDefault();
    const deleted = await GroopService.deleteGroup(this.state.group_id);
    this.props.history.go(-2);
  };

  getGroupMembers = async group_id => {
    const groupmembers = await GroopService.getGroupMembers(group_id);
    this.context.setCurrentGroupMembers(groupmembers);
  };

  handleDeleteMember = async e => {
    e.preventDefault();
    const member = this.state.groupmembers.filter(
      member => member.id == parseInt(this.state.deletedMember),
    );
    try {
      const deleted = await GroopService.deleteGroupMember({
        group_id: this.context.currentGroup.id,
        member_id: parseInt(this.state.deletedMember),
      });
      if (deleted == null) {
        this.setState({
          deleteConfirmation: `${member.username} removed from the group`,
          deleteError: null,
        });
      }
    } catch (error) {
      this.setState({ deleteError: error.error, deleteConfirmation: null });
    }
  };

  handleAddMember = async e => {
    e.preventDefault();
    try {
      const newMember = await GroopService.addNewGroupMember({
        group_id: this.context.currentGroup.id,
        username: this.state.newMember,
      });

      if (newMember) {
        this.setState({
          addConfirmation: `${newMember.username} has been added to the group`,
          addError: null,
        });
      }
    } catch (error) {
      this.setState({ addError: error.error, addConfirmation: null });
    }
  };

  handleChangeAddMember = e => {
    this.setState({ newMember: e.target.value });
  };

  render() {
    const {
      addError,
      addConfirmation,
      deleteConfirmation,
      deleteError,
    } = this.state;
    const memberdropdown = this.context.currentGroupMembers.map(member => (
      <option value={member.member_id}>{member.username} </option>
    ));
    return (
      <section className="GroupSettingsSection">
        <h2>Group Settings</h2>
        <form
          className="addGroupMember"
          onSubmit={e => this.handleAddMember(e)}
        >
          <label htmlFor="addGroupMember" className="AddGroupMemberLabel">
            Add Member to Group
          </label>
          <div role="alert" className="alert">
            {addError && <p>{addError}</p>}
          </div>
          <div role="alert" className="alert--success">
            {addConfirmation && <p>{addConfirmation}</p>}
          </div>
          <input
            type="text"
            id="addGroupMember"
            name="addGroupMember"
            onChange={this.handleChangeAddMember}
          />
          <button type="submit" className="AddGroopMemberButton">
            Add
          </button>
        </form>
        <form
          className="deleteGroupMember"
          onSubmit={e => this.handleDeleteMember(e)}
        >
          <label htmlFor="deleteGroupMember" className="deleteGroupMemberLabel">
            Remove a member
          </label>
          <div role="alert" className="alert">
            {deleteError && <p>{deleteError}</p>}
          </div>
          <div role="alert" className="alert--success">
            {deleteConfirmation && <p>{deleteConfirmation}</p>}
          </div>
          <select
            onChange={e => this.setState({ deletedMember: e.target.value })}
          >
            {memberdropdown}
          </select>
          <button type="submit" className="AddGroupMemberButton">
            Remove
          </button>
        </form>
        <button
          type="button"
          onClick={this.handleDeleteGroup}
          className="DeleteGroupButton"
        >
          Delete Group
        </button>
      </section>
    );
  }
}

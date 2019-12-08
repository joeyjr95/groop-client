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
    addConfirmation: null,
    addError: null,
    deleteConfirmation: null,
    deleteError: null,
  };

  componentDidMount = async () => {
    this.getGroupMembers();
    this.setState({
      groupmembers: this.context.currentGroupMembers,
    });
  };

  handleDeleteGroup = async e => {
    e.preventDefault();
    const deleted = await GroopService.deleteGroup(this.state.group_id);
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

  handleAddMember = async e => {
    e.preventDefault();
    try {
      const newMember = await GroopService.addNewGroupMember({
        group_id: parseInt(this.state.group_id),
        username: this.state.newMember,
      });

      if (newMember) {
        this.setState({
          addConfirmation: `${newMember.username} has been added to the group`,
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
          <select>{memberdropdown}</select>
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

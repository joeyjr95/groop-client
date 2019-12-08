import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import React, { Component } from 'react';
import Button from '../Button/Button';
import './GroopSetting.scss';

export default class GroopSettings extends Component {
  static contextType = GroopContext;
  state = {
    newMember: '',
    deletedMember: 'select',
    addConfirmation: null,
    addError: null,
    deleteConfirmation: null,
    deleteError: null,
    confirmGroupDelete: false,
  };

  componentDidMount = async () => {
    const group = await GroopService.getGroup(this.props.match.params.group_id);
    this.context.setCurrentGroup(group);
    this.getGroupMembers(group.id);
  };

  handleDeleteGroup = async e => {
    e.preventDefault();
    const deleted = await GroopService.deleteGroup(
      this.context.currentGroup.id,
    );
    this.props.history.go(-2);
  };

  getGroupMembers = async group_id => {
    const groupmembers = await GroopService.getGroupMembers(group_id);
    this.context.setCurrentGroupMembers(groupmembers);
  };

  handleDeleteMember = async e => {
    e.preventDefault();
    const member = this.context.currentGroupMembers.filter(
      member => member.id === this.state.deletedMember,
    );
    try {
      const deleted = await GroopService.deleteGroupMember({
        group_id: this.context.currentGroup.id,
        member_id: this.state.deletedMember,
      });

      if (deleted == null) {
        this.setState({
          deleteConfirmation: `${member[0].username} removed from the group`,
          deleteError: null,
        });
        this.getGroupMembers(this.context.currentGroup.id);
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
          newMember: '',
          addConfirmation: `${newMember.username} has been added to the group`,
          addError: null,
        });
        this.getGroupMembers(this.context.currentGroup.id);
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
    const memberoptions = this.context.currentGroupMembers.map(member => (
      <option key={`member${member.member_id}`} value={member.member_id}>
        {member.username}
      </option>
    ));
    let memberdropdown = [];
    memberdropdown[0] = (
      <option key={`membernill`} value={null}>
        select a member
      </option>
    );
    memberdropdown.push(memberoptions);

    const groupDelete = !this.state.confirmGroupDelete ? (
      <Button
        type="button"
        onClick={() => this.setState({ confirmGroupDelete: true })}
        className="DeleteGroupButton"
      >
        Delete Group
      </Button>
    ) : (
      <>
        {' '}
        <Button
          type="button"
          onClick={() => this.setState({ confirmGroupDelete: false })}
          className="CancelDeleteGroupButton"
        >
          Cancel
        </Button>{' '}
        <Button
          type="button"
          onClick={this.handleDeleteGroup}
          className="ConfirmDeleteGroupButton"
        >
          Confirm
        </Button>
      </>
    );

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
            value={this.state.newMember}
          />
          <Button
            type="submit"
            className="AddGroopMemberButton"
            disabled={this.state.newMember.length > 0 ? 0 : 1}
          >
            Add
          </Button>
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
            onChange={e =>
              this.setState({ deletedMember: parseInt(e.target.value) })
            }
            value={this.state.deletedMember}
          >
            {memberdropdown}
          </select>
          <Button
            type="submit"
            className="AddGroupMemberButton"
            disabled={isNaN(this.state.deletedMember) ? 1 : 0}
          >
            Remove
          </Button>
        </form>
        {groupDelete}
      </section>
    );
  }
}

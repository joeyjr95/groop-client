import GroopContext from '../../contexts/GroopContext';
import GroopService from '../../services/groop-service';
import React, { Component } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
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
    categoryDeleteConfirmation: null,
    categoryDeleteError: null,
    confirmGroupDelete: false,
    categoryConfirmation: null,
    categoryError: null,
    newCategory: '',
    categories: [],
    deletedCategory: 0,
  };

  componentDidMount = async () => {
    const group = await GroopService.getGroup(this.props.match.params.group_id);
    this.context.setCurrentGroup(group);
    this.getGroupCategories(group.id);
    this.getGroupMembers(group.id);
  };
  handleAddCategory = async e => {
    e.preventDefault();
    try {
      let body = {
        category_name: this.state.newCategory,
        group_id: this.props.match.params.group_id,
      };
      const newCategory = await GroopService.addNewCategory(body);
      if (newCategory) {
        this.setState({
          newMember: '',
          categoryConfirmation: `${newCategory.category_name} has been added to the group`,
          categoryError: null,
        });
        this.getGroupCategories(this.context.currentGroup.id);
      }
    } catch (error) {
      this.setState({ categoryError: error.error, categoryConfirmation: null });
    }
  };

  handleDeleteGroup = async e => {
    e.preventDefault();
    await GroopService.deleteGroup(this.context.currentGroup.id);
    this.props.history.go(-2);
  };

  getGroupMembers = async group_id => {
    const groupmembers = await GroopService.getGroupMembers(group_id);
    this.context.setCurrentGroupMembers(groupmembers);
  };
  getGroupCategories = async group_id => {
    let categories = await GroopService.getCategories(group_id);
    this.setState({ categories });
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
  handleDeleteCategory = async e => {
    e.preventDefault();
    try {
      const deleted = await GroopService.deleteCategory(
        this.state.deletedCategory,
      );

      if (deleted == null) {
        this.setState({
          categoryDeleteConfirmation: `category removed from the group`,
          categoryDeleteError: null,
          deletedCategory: 0,
        });
        this.getGroupCategories(this.context.currentGroup.id);
      }
    } catch (error) {
      this.setState({
        categoryDeleteError: error.error,
        categoryDeleteConfirmation: null,
      });
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
  handleChangeAddCategory = e => {
    this.setState({ newCategory: e.target.value });
  };

  render() {
    const {
      addError,
      addConfirmation,
      deleteConfirmation,
      deleteError,
      categoryConfirmation,
      categoryDeleteConfirmation,
      categoryDeleteError,
      categoryError,
    } = this.state;

    // remove signed-in user from list of members to delete
    const members = this.context.currentGroupMembers.filter(
      member => member.id !== this.props.user.id,
    );
    // remove default category from list of categories to delete
    const categories = this.state.categories.filter(
      category => category.category_name !== 'General',
    );
    console.log(this.state.deletedCategory);
    const memberoptions = members.map(member => (
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

    const categoryoptions = categories.map(category => (
      <option key={`category${category.id}`} value={category.id}>
        {category.category_name}
      </option>
    ));
    let categorydropdown = [];
    categorydropdown[0] = (
      <option key={`categorynill`} value={0}>
        select a category
      </option>
    );
    categorydropdown.push(categoryoptions);
    console.log(categorydropdown);

    const group = this.context.currentGroup || '';

    const groupDelete = !this.state.confirmGroupDelete ? (
      <Button
        type="button"
        onClick={() => this.setState({ confirmGroupDelete: true })}
        className="ButtonCancel"
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
      console.log(this.state.newCategory)
    return (
      <section className="GroupSettingsSection">
        <button
          className="back-button"
          type="button"
          onClick={() => this.props.history.goBack()}
        >
          <FontAwesomeIcon icon={faAngleLeft} id="openIcon" />
        </button>
        <h2>{group.name} Settings</h2>
        <form
          className="addGroupCategory"
          onSubmit={e => this.handleAddCategory(e)}
        >
          <label htmlFor="addGroupCategory" className="addGroupCategoryLabel">
            Add a Category to Group
          </label>
          <div role="alert" className="alert">
            {categoryError && <p>{categoryError}</p>}
          </div>
          <div role="alert" className="alert--success">
            {categoryConfirmation && <p>{categoryConfirmation}</p>}
          </div>
          <input
            type="text"
            id="addGroupCategory"
            name="addGroupCategory"
            onChange={this.handleChangeAddCategory}
            value={this.state.newCategory}
          />
          <Button
            type="submit"
            className="addGroupCategoryButton"
            disabled={this.state.newCategory.length > 0 ? 0 : 1}
          >
            Add Category
          </Button>
        </form>
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
            Remove a Member
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
            id="deleteGroupMember"
            value={this.state.deletedMember}
          >
            {memberdropdown}
          </select>
          <Button
            type="submit"
            className="ButtonCancel"
            disabled={isNaN(this.state.deletedMember) ? 1 : 0}
          >
            Remove
          </Button>
        </form>
        <form
          className="deleteGroupCategory"
          onSubmit={e => this.handleDeleteCategory(e)}
        >
          <label
            htmlFor="deleteGroupCategory"
            className="deleteGroupCategoryLabel"
          >
            Remove a Category
          </label>
          <div role="alert" className="category-alert">
            {categoryDeleteError && <p>{categoryDeleteError}</p>}
          </div>
          <div role="alert" className="category-alert--success">
            {categoryDeleteConfirmation && <p>{categoryDeleteConfirmation}</p>}
          </div>
          <select
            onChange={e => this.setState({ deletedCategory: e.target.value })}
            id="deleteGroupCategory"
            value={this.state.deletedCategory}
          >
            {categorydropdown}
          </select>
          <Button
            type="submit"
            className="ButtonCancel"
            disabled={Number(this.state.deletedCategory) === 0}
          >
            Remove
          </Button>
        </form>

        {groupDelete}
      </section>
    );
  }
}

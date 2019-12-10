import React from 'react';
//import { Label, Input } from "../../components/Form/Form";
import Button from '../../components/Button/Button';
import './SettingsRoute.scss';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default class SettingsRoute extends React.Component {
  static contextType = UserContext;

  state = {
    error: null,
    success: null,
    passerror: null,
    passsuccess: null,
    noterror: null,
    notesuccess: null,
    editEmail: false,
    editPassword: false,
    email: '',
    verifyPassword: '',
    newpass: '',
    newpassRepeat: '',
    notifications: '',
  };

  componentDidMount = () => {
    AuthApiService.getUser().then(user => {
      this.setState({
        email: user.email,
        notifications: user.notifications,
      });
    });
  };

  handleEditEmail = () => {
    if (this.state.editEmail) {
      AuthApiService.getUser().then(user => {
        this.setState({
          email: user.email,
          error: null,
        });
      });
    }
    this.setState({ editEmail: !this.state.editEmail });
  };

  changeEmail = email => {
    this.setState({ email });
  };

  handleEmail = async e => {
    e.preventDefault();
    this.setState({ error: null });
    try {
      const updatedUser = await AuthApiService.updateUser({
        email: this.state.email,
      });
      if (updatedUser) {
        this.setState({
          email: updatedUser.email,
          editEmail: false,
          success: 'Email successfully changed',
        });
      }
    } catch (error) {
      this.setState({ error: error.error, success: null });
    }
  };

  handlePassword = async e => {
    e.preventDefault();
    try {
      const verifyPass = await AuthApiService.verifyPass({
        password: this.state.verifyPassword,
      });
      if (verifyPass) {
        const updatedUser = await AuthApiService.updateUser({
          password: this.state.newpass,
        });
        if (updatedUser) {
          this.setState({
            passsuccess: 'Password successfully changed',
            passerror: null,
            verifyPassword: '',
            newpass: '',
            newpassRepeat: '',
          });
        }
      }
    } catch (error) {
      this.setState({ passerror: error.error, passsuccess: null });
    }
  };

  notificationOn = () => {
    this.setState({ notifications: true });
  };
  notificationOff = () => {
    this.setState({ notifications: false });
  };

  handleNotification = async e => {
    e.preventDefault();
    this.setState({ error: null });
    try {
      const updatedUser = await AuthApiService.updateUser({
        notifications: this.state.notifications,
      });
      if (updatedUser) {
        this.setState({
          notifications: updatedUser.notifications,
          notsuccess: updatedUser.notifications
            ? 'now receiving notifications'
            : 'not receiving email notifications',
        });
      }
    } catch (error) {
      this.setState({ noterror: error.error, notsuccess: null });
    }
  };

  render() {
    const {
      error,
      success,
      passerror,
      passsuccess,
      noterror,
      notsuccess,
    } = this.state;
    const editEmailButton = this.state.editEmail ? (
      <Button
        type="button"
        className='ButtonCancel'
        onClick={this.handleEditEmail}
      >
        Cancel
      </Button>
    ) : (
      <Button
        type="button"
        className={this.state.editEmail}
        onClick={this.handleEditEmail}
      >
        Edit
      </Button>
    );
    return (
      <section className="settings-page">
        <button
          className="back-button"
          type="button"
          onClick={() => this.props.history.goBack()}
        >
          <FontAwesomeIcon icon={faAngleLeft} id="openIcon" />
        </button>
        <h2>Account Settings</h2>
        <div role="alert" className="alert">
          {error && <p>{error}</p>}
        </div>
        <div role="alert" className="alert--success">
          {success && <p>{success}</p>}
        </div>
        <form className="account-item" onSubmit={e => this.handleEmail(e)}>
          <h3>Email</h3>
          <input
            type="email"
            className="input-disabled"
            placeholder="user's email"
            value={this.state.email}
            onChange={e => this.changeEmail(e.target.value)}
            required
            disabled={!this.state.editEmail}
          />
          <div>
            {editEmailButton}
            <Button
              type="submit"
              className="Button"
              disabled={this.state.editEmail ? 0 : 1}
            >
              Save
            </Button>
          </div>
        </form>
        <h3>Change Your Password</h3>

        <form className="form-pass" onSubmit={e => this.handlePassword(e)}>
          <fieldset>
            <div role="alert" className="alert">
              {passerror && <p>{passerror}</p>}
            </div>
            <div role="alert" className="alert--success">
              {passsuccess && <p>{passsuccess}</p>}
            </div>
            <label htmlFor="curr-pass-input">Current Password</label>
            <input
              type="password"
              id="curr-pass-input"
              placeholder="current password"
              onChange={e => this.setState({ verifyPassword: e.target.value })}
              value={this.state.verifyPassword}
              required
            />

            <label htmlFor="new-pass-input">New Password</label>
            <input
              type="password"
              id="new-pass-input"
              placeholder="new password"
              onChange={e => this.setState({ newpass: e.target.value })}
              value={this.state.newpass}
              required
            />

            <label htmlFor="retype-new-pass-input">Retype New Password</label>
            <input
              type="password"
              id="retype-new-pass-input"
              placeholder="retype new password"
              onChange={e => this.setState({ newpassRepeat: e.target.value })}
              value={this.state.newpassRepeat}
              required
            />

            <Button
              className="SettingSubmit"
              type="submit"
              disabled={
                this.state.newpassRepeat === this.state.newpass &&
                this.state.newpass.length > 7 &&
                this.state.verifyPassword.length > 1
                  ? 0
                  : 1
              }
            >
              Submit
            </Button>
          </fieldset>
        </form>

        <h2>Manage Notifications</h2>
        <p>Do you want to receive email notifications?</p>
        <form
          className="NotificationContainer"
          onSubmit={e => this.handleNotification(e)}
        >
          <div role="alert" className="alert">
            {noterror && <p>{noterror}</p>}
          </div>
          <div role="alert" className="alert--success">
            {notsuccess && <p>{notsuccess}</p>}
          </div>
          <div className="notify-radio-group">
            <label htmlFor="notify-button--yes">
              Yes
              <input
                type="radio"
                id="notify-button--yes"
                name="email-updates"
                value={true}
                onChange={() => this.notificationOn()}
                checked={this.state.notifications ? 1 : 0}
              />
            </label>

            <label htmlFor="notify-button--no">
              No
              <input
                type="radio"
                id="notify-button--no"
                name="email-updates"
                value={false}
                onChange={() => this.notificationOff()}
                checked={this.state.notifications ? 0 : 1}
              />
            </label>
          </div>
          <Button className="SettingSubmit" type="submit">
            Save
          </Button>
        </form>
      </section>
    );
  }
}

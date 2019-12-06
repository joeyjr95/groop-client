import React from "react";
//import { Label, Input } from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import "./SettingsRoute.scss";

export default class SettingsRoute extends React.Component {
  state = {
    editEmail: false,
    editPassword: false
  };

  render() {
    return (
      <section className="settings-page">
        <h1>Account Settings</h1>
        <div className="account-item">
          <h3>Email</h3>
          <input
            type="email"
            className="input-disabled"
            placeholder="user's email"
            require
            disabled
          />
          <Button className={this.state.editEmail}>
            Edit
          </Button>
          <Button
            className="Button"
            disabled={this.state.editEmail ? 0 : 1}
          >
            Save
          </Button>
        </div>
        <h2>Change Your Password</h2>

        <form className="form-pass">
          <fieldset>
            <label htmlFor="curr-pass-input">Current Password</label>
            <input
              type="password"
              id="curr-pass-input"
              placeholder="current password"
              required
            />

            <label htmlFor="new-pass-input">New Password</label>
            <input
              type="password"
              id="new-pass-input"
              placeholder="new password"
              required
            />

            <label htmlFor="retype-new-pass-input">Retype New Password</label>
            <input
              type="password"
              id="retype-new-pass-input"
              placeholder="retype new password"
              required
            />

            <Button className="SettingSubmit" type="submit" value="submit">Submit</Button>
          </fieldset>
        </form>

        <h2>Manage Notifications</h2>
        <p>Do you want to receive email notifications?</p>
        <div className="EmailContainer">
          <label htmlFor="notify-button--yes">Yes</label>
          <input
            type="radio"
            id="notify-button--yes"
            name="email-updates"
            value={true}
          />

          <label htmlFor="notify-button--no">No</label>
          <input
            type="radio"
            id="notify-button--no"
            name="email-updates"
            value={false}
          />
        </div>
      </section>
    );
  }
}

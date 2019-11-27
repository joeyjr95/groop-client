import React from 'react';
import { Label, Input } from '../../components/Form/Form';

export default class SettingsRoute extends React.Component {
  state = {
    editEmail: false,
    editPassword: false
  };

  render() {
    return (
      <section>
        <h1>Account Settings</h1>
        <h3>Email</h3>
        <input type='email' placeholder='email' require disabled />
        <h2>Change Your Password</h2>

        <form className='form-pass'>
          <fieldset>
            <label htmlFor='curr-pass-input'>Current Password</label>
            <input
              type='password'
              id='curr-pass-input'
              placeholder='current password'
              required
            />

            <label htmlFor='new-pass-input'>New Password</label>
            <input
              type='password'
              id='new-pass-input'
              placeholder='new password'
              required
            />

            <label htmlFor='retype-new-pass-input'>Retype New Password</label>
            <input
              type='password'
              id='retype-new-pass-input'
              placeholder='retype new password'
              required
            />

            <input type='submit' value='submit' />
          </fieldset>
        </form>

        <h2>Manage Notifications</h2>
        <p>Do you want to receive email notifications?</p>
        <label htmlFor='notify-button--yes'>Yes</label>
        <input
          type='radio'
          id='notify-button--yes'
          name='email-updates'
          value={true}
        />

        <label htmlFor='notify-button--no'>No</label>
        <input
          type='radio'
          id='notify-button--no'
          name='email-updates'
          value={false}
        />
      </section>
    );
  }
}

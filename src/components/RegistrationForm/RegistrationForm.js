import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import Button from "../Button/Button";
import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { 
    error: null,
   };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, username, email, password, confirmPassword } = ev.target;
    if(password.value !== confirmPassword.value){
      alert('passwords do not match');
    }else{
    AuthApiService.postUser({
      fullname: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    })
      .then(user => {
        name.value = "";
        username.value = "";
        email.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
    }
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div role="alert" className="alert">
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor="registration-name-input" className="register-label" aria-required="true" required>
            Enter your name
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="registration-username-input"
            className="register-label"
          >
            Choose a username
            <Required />
          </Label>
          <Input id="registration-username-input" name="username" aria-required="true" required />
        </div>
        <div>
          <Label
            htmlFor="registration-email-input"
            className="register-label"
          >
            Enter your email
            <Required />
          </Label>
          <Input id="registration-email-input" name="email" aria-required="true" required />
        </div>
        <div></div>
        <div>
          <Label
            htmlFor="registration-password-input"
            className="register-label"
          >
            Choose a password
            <Required />
          </Label>
          <Input
            id="registration-password-input"
            name="password"
            type="password"
            autoComplete="off"
            aria-required="true"
            required
          />
        </div>
        <div>
          <Label
            htmlFor="registration-confirmPassword-input"
            className="register-label"
          >
            Confirm password
            <Required />
          </Label>
          <Input
            id="registration-confirmPassword-input"
            name="confirmPassword"
            type="confirmPassword"
            autoComplete="off"
            aria-required="true"
            required
          />
        </div>
        <footer>
          <Button type="submit">Sign up</Button>{" "}
          <Link to="/login" className="toLogin-link">
            Already have an account?
          </Link>
        </footer>
      </form>
    );
  }
}

export default RegistrationForm;

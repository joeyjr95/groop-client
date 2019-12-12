import React, { Component } from "react";
import { Link } from 'react-router-dom';
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "../LoginRoute/LoginRoute.scss";


class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  state = {
    registrationSuccess: false
  };

  handleRegistrationSuccess = () => {
    this.setState({ registrationSuccess: true });
    const { history } = this.props;
    setTimeout(() => history.push("/login"), 6500);
  };

  render() {
    const successMessage = 
      <div className='successMsg'>
        <p><em>SIGN-UP SUCCESSFUL!</em></p>
        <p>You will be taken to the <Link to="/login" className='toLogin'>login page</Link> in just a moment...</p>
        <p className='footnote'>A confirmation from sender "13 Minutes" was sent to your email. (If it's not in your inbox, check your spam, or double-check if your address is correct in your Groop account settings.)</p>
      </div>;

    const mainDisplay = this.state.registrationSuccess 
      ? successMessage 
      : <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />;

    return (
      <section className="signup">
        <h2 className="signup-h2">Sign up</h2>
        {mainDisplay}
      </section>
    );
  }
}

export default RegistrationRoute;

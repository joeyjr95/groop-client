import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <section className="signup">
        <p className="app-description">
          Keep your groop in the loop
        </p>
        <h2 className="signup-h2">Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;

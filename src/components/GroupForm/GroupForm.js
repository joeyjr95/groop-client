import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../services/token-service";
import GroopService from "../../services/groop-service";
import UserContext from "../../contexts/UserContext";
import "./GroupForm.scss";

export default class GroupForm extends Component {
  static contextType = UserContext;
  state = {
    error: null,
    name: {
      value: "",
      touched: false
    },
    
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      name: this.state.name.value,
    
      owner_id: this.context.user.id,
      
    };
    console.log(newGroup)
    GroopService.postGroup(newGroup)
    this.props.history.goBack()
  }

  handleChangeGroupname = e => {
    this.setState({ name: { value: e.target.value, touched: true } });
  };

  // validatename() {
  //   const name = this.state.name.value.trim();
  //   if (name.length === 0) {
  //     return "Name is required";
  //   }
  // }
  
  render() {
    return (
      <section>
        <form className="AddGroupForm">
          <h2>Add Group</h2>< br/>
          <label htmlFor="addGroupname" className="AddGroupLabel">
            Group Name
          </label>
          <br />
          <input
            type="text"
            id="addGroupname"
            name="addGroupname"
            onChange={this.handleChangeGroupname}
          />
          {/* {this.state.name.touched && (
            <div className="error">{this.validatename()}</div>
          )} */}
          <br />
          <button
            type="submit"
            onClick={this.handleSubmit}
            // disabled={
            //   // this.validatename()
            //}
            className="AddGroupButton"
          >
            Create New Group
          </button>
        </form>
      </section>
    );
  }
}

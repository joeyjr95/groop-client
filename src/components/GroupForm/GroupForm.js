import React, { Component } from 'react';
import config from '../../config';
import GroopService from '../../services/groop-service';
import UserContext from "../../contexts/UserContext";
import { Link } from 'react-router-dom'

export default class GroupForm extends Component {
   static contextType = UserContext;
    state = {
        groups: [],
        error: null,
        name: {
            value: "",
            touched: false
        },
        owner_id: {
            value: "",
            touched: false
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const newGroup = {
            name: this.state.name,
            owner_id: this.context.user.id
        }
        console.log(newGroup)
        GroopService.postGroup(newGroup)
    }

    handleChangeGroupName = e => {
        this.setState({name: e.target.value, touched: false });
    };

    render() {
        return (
            <section className="AddGroupForm">
                <form onSubmit={this.handleSubmit}
                >
                    <h2>Add Group</h2>< br/>
                    <label htmlFor="name" className="Add-Group-Label">
                        Group name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={this.handleChangeGroupName}
                    />
                    <br />
                    <div className="button container">
                    <button
                        type="submit"
                        className="addGroupButton"
                        >
                        Create New Group
                        </button>
                        <Link 
                        to="/dashboard"
                        >
                        <button>Go Back</button>
                        </Link>
                        </div>
                </form>
            </section>
        );
    }
}
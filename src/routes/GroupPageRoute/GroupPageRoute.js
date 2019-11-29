import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './GroupPageRoute.scss'
import GroopPage from "../../components/GroopPage/GroopPage";
import Sidebar from "../../components/Sidebar/Sidebar";

export default class GroupPageRoute extends Component {
render(){
    return (<div className="groop-page"> 
    <h2>groop title</h2>
    <p id="date">today's date</p>
    < GroopPage 
    group_id = {this.props.match.params.group_id}
    />
     
    <Link to="/add-task" id="task-link">Add to list</Link>
    <Sidebar />
    </div>
    )
}
}
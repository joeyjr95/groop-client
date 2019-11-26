import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './GroupPageRoute.css'
import GroopPage from "../../components/GroopPage/GroopPage";

export default class GroupPageRoute extends Component {
render(){
    return (<div className="groop-page"> 
    <h2>groop title</h2>
    <p id="date">today's date</p>
    < GroopPage />
    {/* add in the correct link below */}
    <Link to="/newtask" id="task-link">Add to list</Link>
    </div>
    )
}
}
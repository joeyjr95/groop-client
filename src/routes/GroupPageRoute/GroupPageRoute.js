import React, { Component } from 'react'
import './GroupPageRoute.css'
import GroopPage from "../../components/GroopPage/GroopPage";

export default class GroupPageRoute extends Component {
render(){
    return (<div className="groop-page"> 
    <h2>groop title</h2>
    <p id="date">today's date</p>
    < GroopPage />
    </div>
    )
}
}
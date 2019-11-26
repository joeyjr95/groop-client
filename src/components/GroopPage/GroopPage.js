import React, { Component } from 'react'

export default class GroopPage extends Component {
render(){
    return (
    <section className="groop-page-list">
        <div>
            <ul className="menu" role="menu">
            <li   id="name1">User</li>
            <li   id="name2">Allie</li>
            <li   id="name3">Derek</li>
            <li   id="name4">Brian</li>
            </ul>
        </div>
        <div className="task-list-container">
            <ul className="task-list">
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
                <li>task</li>
            </ul>


        </div>
    </section>
    )
}
}
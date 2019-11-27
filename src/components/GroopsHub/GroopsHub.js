import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class GroopsHub extends Component {
    render(){
        return(
            <section className="groops-hub-c">
                <h2>My Groops</h2>
            <div className="groops-hub">
            <ul className="groops-hub-menu" role="menu">
            <li   id="groop1"><Link to="/group">Group1</Link></li>
            <li   id="groop2"><Link to="/group">Group2</Link></li>
            <li   id="groop3"><Link to="/group">Group3</Link></li>
            <li   id="groop4"><Link to="/group">Group4</Link></li>
            <li   id="groop4"><Link to="/group"> Add Groop</Link></li>
            </ul>
            </div>
            </section>
        )
    }
}

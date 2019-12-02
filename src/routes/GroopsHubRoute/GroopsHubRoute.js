import React, { Component } from 'react';
import GroopsHub from "../../components/GroopsHub/GroopsHub";
import './GroopsHub.scss'


export default class GroopsHubRoute extends Component {
    render(){
        return(
            <section className="groops-hub-r">
                < GroopsHub />
            </section>
        )
    }
}
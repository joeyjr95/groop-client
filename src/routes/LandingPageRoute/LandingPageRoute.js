import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './LandingPageRoute.css'

export default class LandingPageRoute extends Component {


    render(){
     return ( 
     <>
     <div className="landing-page">
         <h2>groop</h2>
         <h3>Keep your groop in the loop.</h3>
         <Link
               to='/register'>
               Sign up
             </Link>
     </div>
     </> )
    }
}
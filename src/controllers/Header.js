import React from 'react';
import {NavLink} from 'react-router-dom';
export const Header = (props)=>{
    return(
        <div>
        <nav className="navbar navbar-dark bg-dark">    
        <div>
            <NavLink activeClassName='active' exact to={props.userid==='admin'?'/adminhome':props.role==='developer'?'/userhome':'/testerhome'}>Home</NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink activeClassName='active' to={props.userid==='admin'?'/list':'/projectlist'}>{props.userid==='admin'?'Users':'Projects'}</NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink activeClassName='active' to={props.userid==='admin'?'/bugtracker':'/buglist'}>{props.userid==='admin'?'Tracker':'Bugs'}</NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink activeClassName='active' hidden={props.userid==='admin'?false:true} to='/projectlist'>Projects</NavLink>
        </div>
        </nav>
        </div>
    )
}
import React from 'react';
export const Admin = (props)=>{
    return(
        <div className='bg'>
            <h1 className='q'>{props.msg}</h1>
            <br/>
            <div><img className='i' src='https://img.icons8.com/bubbles/2x/admin-settings-male.png' alt="Awesome"/></div>
            <button className="btn btn-info" name='adduser' onClick={props.viewChange}><span className="fa fa-plus-square" aria-hidden="true"></span>Add User</button>
            <br/><br/>
            <button className="btn btn-warning" name='changepassword' onClick={props.viewChange}><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Change Password</button>
            <br/><br/>
            <button className="btn btn-danger" name='home' onClick={props.viewChange}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
        </div>
    )
}
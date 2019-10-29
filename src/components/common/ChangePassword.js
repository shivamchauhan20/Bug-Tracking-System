import React from 'react';
export const ChangePassword = (props)=>{
    return(
        <div className='changepasswordbg'>
           <label>Old Password</label><input className="form-control" name='oldpassword' onChange={props.takeInput} type='password' placeholder="Enter the Old Password"/>
           <br/>
           <label>New Password</label><input className="form-control" name='newpassword' onChange={props.takeInput} type='password' placeholder="Enter the New Password"/>
           <br/>
           <button className="btn btn-primary" onClick={props.changePassword}><i className="fa fa-pencil-square" aria-hidden="true"></i>Update Password</button>
           &nbsp;&nbsp;
           <button className="btn btn-danger" name={props.userid==='admin'?'adminhome':props.role==='developer'?'userhome':'testerhome'} onClick={props.viewChange}><i className="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
        </div>
    )
}
import React from 'react';
export const AddUser = (props)=>{
    return(
        <div className='adduserbg'>
            <label>UserID</label><input className="form-control" name='userid' onChange={props.takeInput} type='text' placeholder="Enter the UserID"/>
            <label>Password</label><input className="form-control" name='password' onChange={props.takeInput} type='password' placeholder="Enter the Password"/>
            <label>Role</label>
            <select className='form-control' name='role' onChange={props.takeInput}>
                <option value='developer'>developer</option>
                <option value='tester'>tester</option>
            </select>
            <label>Email</label><input className="form-control" name='email' onChange={props.takeInput} type='text' placeholder="Enter the Email"/>
            <br/>
            <button className="btn btn-success" onClick={props.addUser}><span className="fa fa-plus-square" aria-hidden="true"></span>Add</button>
            &nbsp;&nbsp;
           <button className="btn btn-danger" name='adminhome' onClick={props.viewChange}><i className="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
        </div>
    )
}
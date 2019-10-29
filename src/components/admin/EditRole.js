import React from 'react';
export const EditRole = (props)=>{
    return(
        <div className='editrolebg'>
            <h2 className='r'>UserID:{props.userid}</h2>
            <br/>
           <label>Role</label>
                <select className='form-control' name='role' onChange={props.takeInput} defaultValue={props.role}>
                <option value='developer'>developer</option>
                <option value='tester'>tester</option>
            </select>
           <br/>
           <button className="btn btn-primary" onClick={props.editRole}><i className="fa fa-pencil-square" aria-hidden="true"></i>Update Role</button>
        </div>
    )
}
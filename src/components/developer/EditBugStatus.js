import React from 'react';
export const EditBugStatus = (props)=>{
    return(
        <div>
            <h2 className='r'>BugName:{props.bugname}</h2>
            <br/>
           <label>Status</label>
           <select className='form-control' name='status' onChange={props.takeInput} defaultValue={props.status}>
                <option value='Unsolved'>Unsolved</option>
                <option value='Solved'>Solved</option>
            </select>
           <br/>
           <button className="btn btn-primary" onClick={props.editBugStatus}><i className="fa fa-pencil-square" aria-hidden="true"></i>Update Status</button>
        </div>
    )
}
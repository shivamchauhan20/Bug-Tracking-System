import React from 'react';
export const AddProject = (props)=>{
    return(
        <div className='addprojectbg'>
        <h1 className='s'>Project Upload</h1>    
        <input className="btn btn-dark" type="file" name="file" onChange={props.onChangeHandler}/>
        &nbsp;&nbsp;
        <button className="btn btn-primary" onClick={props.upload}><i className="fa fa-upload" aria-hidden="true"></i>Upload</button>
        <br/><br/>
        <button className="btn btn-danger" name='userhome' onClick={props.viewChange}><i className="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
        </div>
    )
}
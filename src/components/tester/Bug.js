import React from 'react';
export const Bug = (props)=>{
return(
    <div className='addbugbg'>
        <h2 className='t'>Project Name:-{props.filename}</h2>
        <label>Bug Name:</label><input className="form-control" name='bugname' type='text' onChange={props.takeInput} placeholder="Enter the Bug Name"/>
        <label>Bug Type:</label>
        <select className='form-control' name='bugtype' onChange={props.takeInput}>
                <option value='simple'>Simple</option>
                <option value='difficult'>Difficult</option>
            </select>
        <label>Bug Description:</label><input className="form-control" name='bugdescription' type='textbox' onChange={props.takeInput} placeholder="Enter the Bug Description"/>
        <div>
        <label>Attach ScreenShot:</label>  
        <br/>  
        <input className="btn btn-dark" type="file" name="file" onChange={props.onChangeHandler}/>
        <div hidden={props.file===null?true:false}>
        <br/>
        <img className='image' src={props.file} alt="Awesome"/>
        </div></div>
        <br/>   
        <button className="btn btn-success" onClick={props.submitBug}><span className="fa fa-plus-square" aria-hidden="true"></span>Submit</button>
        &nbsp;&nbsp;
        <button className="btn btn-danger" name='testerhome' onClick={props.viewChange}><i className="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
    </div>
)
}
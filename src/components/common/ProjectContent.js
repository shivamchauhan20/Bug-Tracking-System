import React from 'react';
import {connect} from 'react-redux';
const ProjectContent = (props)=>{
    return(
        <div>
            <h2 className='t'>Project Name:{props.filename}</h2>
            <hr/>
            <p>{props.content}</p>
            <div hidden={props.result.length===0?true:false}>
            <h2>Issues</h2>
            <div>{props.result.map((singleBug,index)=>(
             <ul key={index}>
             <li>S.No:{index+1}</li>       
             <label>Bugname:{singleBug.bugname}</label>
             <br/> 
             <label>BugType:{singleBug.bugtype}</label> 
             <br/>
             <label>BugDescription:{singleBug.bugdescription}</label> 
             <br/>
             <label>Attached Scrrenshot:</label> 
             <br/>
             <img className='image' src={singleBug.url} alt="Awesome"/>
             </ul>
            ))}</div></div>
            <br/>
            <button className="btn btn-danger" name={props.role==='developer'?'projectlist':'testerhome'} onClick={props.viewChange}><i className="fa fa-arrow-left" aria-hidden="true"></i>Back</button>
        </div>
    )
}
const mapStateToProps = (state,props)=>{
    var bugs = [];
    for(var bug of state.bugReducer.bugList){
        if(props.filename===bug.filename){
            if(bug.status==='Unsolved'){
            bugs.push(bug);
            }
        } 
    }
    console.log('Bugs is ',bugs);
    return {
        result:bugs
    }
}
const fn = connect(mapStateToProps);
export default fn(ProjectContent);
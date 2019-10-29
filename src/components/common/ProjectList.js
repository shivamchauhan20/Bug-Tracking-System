import React from 'react';
import {connect} from 'react-redux';
const ProjectList = (props)=>{
    return(
        <>      
        <h1 className='p'>List of Projects</h1>
        <table className="table"> 
           <thead className="bg-success">
                    <tr>
                      <th scope="row">S.No</th>
                      <th scope="row">Project Name</th>
                      <th scope="row">{props.role==='admin'?'Developer Name':'Operation'}</th>
                    </tr>
                  </thead>
                  <tbody className="p-3 mb-2 bg-light text-dark">
                    {props.result.map((singleProject,index) => (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td><p><a className="text-info" onClick={()=>{props.openProject(singleProject.name)}} style={{cursor: 'pointer'}}>{singleProject.name}</a></p></td>
                        <td hidden={props.role==='admin'?false:true}>{singleProject.developername}</td>
                        <td><button className="btn btn-danger" hidden={props.role==='developer'?false:true} onClick={()=>{props.deleteProject(singleProject.name)}}><i className="fa fa-trash" aria-hidden="true"></i>Delete</button>
                        <button className="btn btn-danger" hidden={props.role==='tester'?false:true} onClick={()=>{props.addBug(singleProject.name)}}><span className="fa fa-plus-square" aria-hidden="true"></span>Add Bug</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-dark text-white" hidden={props.role==='tester'?false:true} onClick={()=>{props.download(singleProject.name)}}><span className="fa fa-download" aria-hidden="true"></span>Download</button></td>
                      </tr>
                    ))}
                  </tbody>       
          </table>
        </>
    )
}
const mapStateToProps = (state)=>{
    return {
        result:state.projectReducer.projectList
    }
}
const fn = connect(mapStateToProps);
export default fn(ProjectList);
